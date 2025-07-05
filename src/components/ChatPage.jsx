import React, { useContext, useEffect, useState,useRef, useCallback } from 'react'
import Authcontext from './Authcontext'

const getConversationKey = (id1, id2) => {
    const ids = [String(id1), String(id2)].sort();
    return `chat_conv_${ids[0]}_${ids[1]}`;
};

function ChatPage({employerId,companyName,onClose,jobseekerId,isEmployerChat=false}) {
   const {currentuser,updateLastReadTimeStamp}= useContext(Authcontext)
   const[messages,setMessages]=useState([])
   const[newmessages,setNewmessages]=useState('')
   const messagesEndRef = useRef(null)
   

   const currentUserId = currentuser?.id || currentuser?._id

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    console.log("ChatPage Props: { employerId:", employerId, ", jobseekerId:", jobseekerId, ", companyName:", companyName, ", isEmployerChat:", isEmployerChat, "}");
    console.log("ChatPage Authcontext currentuser:", currentuser);
    console.log("ChatPage derived currentUserId:", currentuser?.id ? String(currentuser.id) : (currentuser?._id ? String(currentuser._id) : null));
     
  const loadMessages=useCallback(()=>{
     if (!currentuser|| !employerId || !jobseekerId) {
            console.error("User not logged in, chat cannot proceed.");
            onClose();
            return;
        }
        const conversationKey = getConversationKey(jobseekerId, employerId);
        

            try {
                const storedMessagesData = localStorage.getItem(conversationKey);
                let loadedMessages = storedMessagesData ? JSON.parse(storedMessagesData) : [];
                if (loadedMessages.length===0) {
                    
                    // Initialize with a welcome message if no history
                    const initialMessage = {
                        id: Date.now(),
                        sender: 'System',
                        text: `Welcome to the chat with ${companyName}!`,
                        timestamp: new Date().toLocaleTimeString(),
                        read:true
                    };
                    loadedMessages=[initialMessage];
                    localStorage.setItem(conversationKey, JSON.stringify(loadedMessages));
                }
                
                const updatedMessages = loadedMessages.map(msg => {
                if (msg.senderId !== 'System' && String(msg.senderId) !== String(currentUserId)) {
                    return { ...msg, read: true };
                }
                return msg;
            });

            setMessages(updatedMessages);
            localStorage.setItem(conversationKey, JSON.stringify(updatedMessages));

            const now = new Date().toISOString(); 
            if (updateLastReadTimeStamp) { // Make sure the function exists
                updateLastReadTimeStamp(currentUserId, conversationKey, now);
            }
            } catch (error) {
                console.error("Error loading messages from local storage:", error);
                setMessages([]); 
            }
    
    },[currentUserId, employerId, jobseekerId, companyName,updateLastReadTimeStamp]);

    useEffect(()=>{
        loadMessages();   

        const pollingInterval = setInterval(loadMessages, 2000);
        const handleStorageChange = (event) => {
            const conversationKey = getConversationKey(jobseekerId, employerId);
            // Only react if the change is related to *this* conversation's key
            if (event.key === conversationKey) {
                loadMessages(); 
                         }
        };
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            clearInterval(pollingInterval)
             window.removeEventListener('storage', handleStorageChange);
        }
        },[employerId, companyName, currentuser, onClose,jobseekerId])

  const handleSendMessage=(e)=>{
    e.preventDefault()
    if(newmessages.trim()){
        const msgToSend={
            id:Date.now(),
            senderId: currentUserId,
            sender: currentuser.username || 'You',
            text:newmessages.trim(),
            timestamp:new Date().toLocaleTimeString(),
            read:false
        }
        setMessages((prevMsg)=>{

        const updatedMsg=[...prevMsg,msgToSend]
        const conversationKey = getConversationKey(jobseekerId, employerId)
        localStorage.setItem(conversationKey, JSON.stringify(updatedMsg)) 
        return updatedMsg
    })
        setNewmessages('')
        console.log("message sent:(localstorage)", msgToSend);
    }
  }
   if (!currentuser) {
        return <div className="text-center p-4 text-red-600">Please log in to view chat.</div>;
    }
    if (!employerId || !jobseekerId) {
        return <div className="text-center p-4 text-red-600">Error: Missing chat participant IDs.</div>;
    }

    let chatHeaderName = "Chat";
    if (isEmployerChat) {
        // If employer is viewing, chat is with the jobseeker
        const jobseekerUser = JSON.parse(localStorage.getItem('users'))
                                .find(user => String(user.id) === String(jobseekerId) && user.role === 'jobseeker');
        chatHeaderName = `Chat with ${jobseekerUser?.username || `Jobseeker ${jobseekerId}`}`;
    } else {
        // If jobseeker is viewing, chat is with the employer's company
        chatHeaderName = `Chat with ${companyName || 'the Employer'}`;
    }


  return (
    <div className='flex flex-col h-full bg-white  rounded-lg'>
        <div className='bg-indigo-700 text-white p-4 flex items-center shadow-md'>
            <button onClick={onClose} className="mr-3 text-2xl">&times;</button> 
            <h1 className="text-xl font-semibold"> {chatHeaderName}</h1>

        </div>

        <div className='flex-grow p-4 overflow-y-auto space-y-4'>
            {messages.length===0?(
                 <p className="text-center text-gray-500">Start your conversation!</p>
            ):(
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${String(msg.senderId) === String(currentUserId)? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`p-3 rounded-lg shadow ${
                                    String(msg.senderId) === String(currentUserId)
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-300 text-gray-800'
                                }`}
                               
                            >
                                <div className="font-semibold text-sm mb-1">{msg.senderId==='System'?'System':(String(msg.senderId)===String(currentUserId)?'You':msg.sender)}</div>
                                <div>{msg.text}</div>
                                <div className="text-xs text-right mt-1 opacity-75">{msg.timestamp}</div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
    </div>
    <form onSubmit={handleSendMessage} className="bg-white p-4 border-t border-gray-200 flex items-center">
                <input
                    type="text"
                    value={newmessages} 
                    onChange={(e) => setNewmessages(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none mr-2"
                />
                <button
                    type="submit"
                    className="bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Send
                </button>
            </form>
    </div>
  )
}

export default ChatPage
