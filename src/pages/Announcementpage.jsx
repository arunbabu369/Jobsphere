
import React, { useContext, useState } from 'react';
import Announcementcontext from '../components/Announcementcontext';
import Authcontext from '../components/Authcontext'; //
import { FaToggleOn, FaToggleOff, FaTrash } from 'react-icons/fa'; // For icons

function AnnouncementsPage() {
    const { currentuser } = useContext(Authcontext);
    const {announcements,loadingAnnouncements,addAnnouncement, } = useContext(Announcementcontext);

    const [newAnnouncementText, setNewAnnouncementText] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');


    if (!currentuser || currentuser.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-3xl font-semibold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-700">You must be logged in as an administrator to manage announcements.</p>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        if (newAnnouncementText.trim() === '') {
            setError('Announcement text cannot be empty.');
            return;
        }

        try {
            addAnnouncement(newAnnouncementText, String(currentuser.id));
            setNewAnnouncementText('');
            setSuccessMsg('Announcement posted successfully!');
            setTimeout(() => setSuccessMsg(''), 3000); 
        } catch (err) {
            console.error("Error posting announcement:", err);
            setError('Failed to post announcement. Please try again.');
        }
    };

    return (
        <div className="flex-1 mx-auto px-8 py-4 bg-gray-50 min-h-screen mt-20"> 
            <h1 className="text-center text-3xl sm:text-4xl font-semibold text-indigo-700 my-10">
                Manage Platform Announcements
            </h1>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Post a New Announcement</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="announcementText" className="block text-gray-700 font-semibold mb-1">
                            Announcement Text:
                        </label>
                        <textarea
                            id="announcementText"
                            value={newAnnouncementText}
                            onChange={(e) => setNewAnnouncementText(e.target.value)}
                            rows="4"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Type your platform-wide announcement here..."
                        ></textarea>
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        {successMsg && <p className="text-green-600 text-sm mt-1">{successMsg}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Publish Announcement
                    </button>
                </form>
            </div>

            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Existing Announcements</h2>
                {loadingAnnouncements ? (
                    <p className="text-gray-600 text-center">Loading announcements...</p>
                ) : announcements.length === 0 ? (
                    <p className="text-gray-600 text-center">No announcements published yet.</p>
                ) : (
                    <div className="space-y-4">
                        {[...announcements].reverse().map((announcement) => ( 
                            <div key={announcement.id} className="border border-gray-200 p-4 rounded-md flex items-center justify-between shadow-sm">
                                <div className="flex-1 pr-4">
                                    <p className={`text-lg ${!announcement.isActive ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                        {announcement.text}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Posted on: {announcement.postedDate} by Admin ({announcement.postedBy})
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnnouncementsPage;