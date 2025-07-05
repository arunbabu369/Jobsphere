import React, { useContext, useState, useEffect, useCallback } from 'react';
import Authcontext from '../components/Authcontext';
import ChatPage from '../components/ChatPage';

const getConversationKey = (id1, id2) => {
    const ids = [String(id1), String(id2)].sort();
    return `chat_conv_${ids[0]}_${ids[1]}`;
};

// Assuming you also have safe localStorage utilities, let's incorporate them
// If not, you should create src/utils/localStorageUtils.js as discussed previously.
const getParsedItem = (key, defaultValue) => {
    try {
        const item = localStorage.getItem(key);
        if (item === null || item.trim() === '') {
            return defaultValue;
        }
        return JSON.parse(item);
    } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        return defaultValue;
    }
};


function EmployerChatDashboard() {
    const { currentuser } = useContext(Authcontext);
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    const employerId = currentuser?.id ? String(currentuser.id) : (currentuser?._id ? String(currentuser._id) : null);

    const discoverAndLoadConversations = useCallback(() => {
        if (!currentuser || currentuser.role !== 'employer' || !employerId) {
            console.warn("User is not a logged-in employer or employer ID missing. Cannot load chats.");
            setConversations([]);
            return;
        }

        const foundConversations = [];
        const allUsers = getParsedItem('users', []);

  
        // when localStorage changes. Let's re-read the latest currentuser data from localStorage
        // to ensure we have the most up-to-date lastReadTimestamps.
        const latestCurrentUser = getParsedItem('currentuser', currentuser); 
        const employerLastReadTimestamps = latestCurrentUser?.lastReadTimestamps || {};


        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key && key.startsWith('chat_conv_')) {
                try {
                    const parts = key.split('_');
                    if (parts.length === 4) {
                        const id1 = parts[2];
                        const id2 = parts[3];

                        if (id1 === employerId || id2 === employerId) {
                            const jobseekerId = (id1 === employerId) ? id2 : id1;

                            // --- Use robust parsing for messages ---
                            const messages = getParsedItem(key, []);

                            if (messages && messages.length > 0) {
                                const lastMessage = messages[messages.length - 1];

                                const jobseekerUser = allUsers.find(user => String(user.id || user._id) === String(jobseekerId) && user.role === 'jobseeker');

                                const jobseekerName = jobseekerUser?.username || `Jobseeker ${jobseekerId}`;
                                const displayedCompanyName = currentuser?.companyname || 'You'; // Use context currentuser's company name

                                let unreadCount = 0;
                                const lastReadTimestampForThisConv = employerLastReadTimestamps[key];

                                messages.forEach(msg => {
                                    
                                    if (String(msg.senderId) === String(jobseekerId)) {
                                        if (!lastReadTimestampForThisConv || new Date(msg.timestamp) > new Date(lastReadTimestampForThisConv)) {
                                            unreadCount++;
                                        }
                                    }
                                });

                                foundConversations.push({
                                    key: key,
                                    jobseekerId: jobseekerId,
                                    jobseekerName: jobseekerName,
                                    companyName: displayedCompanyName,
                                    lastMessageText: lastMessage.text,
                                    lastMessageTimestamp: lastMessage.timestamp,
                                    unreadCount: unreadCount
                                });
                            }
                        }
                    }
                } catch (e) {
                    console.error(`Error processing chat key "${key}" from local storage in dashboard:`, e);
                }
            }
        }
        foundConversations.sort((a, b) => new Date(b.lastMessageTimestamp) - new Date(a.lastMessageTimestamp));
        setConversations(foundConversations);
    }, [currentuser, employerId]); 
    useEffect(() => {
        discoverAndLoadConversations();
        const pollingInterval = setInterval(discoverAndLoadConversations, 3000);

        
        const handleStorageChange = (event) => {
            // Re-evaluate all conversations if any relevant key changes
            if (event.key && (event.key.startsWith('chat_conv_') || event.key === 'users' || event.key === 'currentuser')) {
                discoverAndLoadConversations();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            clearInterval(pollingInterval);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [discoverAndLoadConversations]); // Dependency on the memoized function

    const handleOpenChat = (jobseekerId, companyName) => {
        setSelectedChat({ jobseekerId, companyName });
        // After opening, you might want to immediately update the dashboard's unread count for this conversation
        // This is handled by ChatPage's updateLastReadTimestamp, and the storage listener should catch it.
        // But if there's a delay, you could force a refresh here:
        // discoverAndLoadConversations(); // This might be redundant if storage event listener works fast.
    };

    const handleCloseChat = () => {
        setSelectedChat(null);
        // --- CRITICAL FIX: Re-discover conversations immediately after closing chat ---
        // This ensures the dashboard reflects the updated lastReadTimestamps from ChatPage
        // and clears the badge.
        discoverAndLoadConversations();
    };

    if (!employerId) {
        return <div className="text-center p-4 text-red-600">Please log in as an employer to view messages.</div>;
    }
    if (currentuser?.role !== 'employer') { // Added optional chaining for currentuser
        return <div className="text-center p-4 text-red-600">Access Denied: You must be an employer to view this page.</div>;
    }

    return (
        <div className="flex-1 mx-auto px-8 py-4 mt-10 sm:mt-2">
            <h1 className="text-center text-2xl sm:text-4xl font-semibold text-black my-10">
                Messages 
            </h1>

            {selectedChat ? (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg h-3/4 flex flex-col">
                        <ChatPage
                            employerId={employerId}
                            jobseekerId={selectedChat.jobseekerId}
                            companyName={selectedChat.companyName}
                            onClose={handleCloseChat} 
                            isEmployerChat={true}
                        />
                    </div>
                </div>
            ) : (
                <div>
                    {conversations.length === 0 ? (
                        <p className="text-center text-gray-500">You have no active conversations yet.</p>
                    ) : (
                        <div className="grid grid-cols-1  md:grid-cols-3  gap-4">
                            {conversations.map((conv) => (
                                <div
                                    key={conv.key}
                                    className="bg-white rounded-lg p-4 shadow-md  cursor-pointer hover:bg-gray-50 transition duration-200"
                                    onClick={() => handleOpenChat(conv.jobseekerId, conv.companyName)}
                                >
                                    <h3 className="text-lg font-semibold text-indigo-700">
                                        Chat with {conv.jobseekerName}
                                    </h3>
                                    <p className="text-gray-600 text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                                        Your Company: {conv.companyName}
                                    </p>
                                    <p className="text-gray-600 text-sm overflow-hidden whitespace-nowrap text-ellipsis">
                                        Last message: {conv.lastMessageText}
                                    </p>
                                    {conv.unreadCount > 0 && (
                                        <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                                            {conv.unreadCount} New
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default EmployerChatDashboard;