import React, { useContext, useMemo } from 'react'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Authcontext from '../components/Authcontext';
import Jobcontext from '../components/Jobcontext';
import ApplicationContext from '../components/Applicationcontext'; 
function EmployerAnalyticsPage() {
    const { currentuser } = useContext(Authcontext);
    const { getJobsByEmployerId } = useContext(Jobcontext);
    const { getApplicationsForJob } = useContext(ApplicationContext); 

    
    if (!currentuser || currentuser.role !== 'employer' || !currentuser.id ) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-3xl font-semibold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-700">Please log in as an employer to view analytics.</p>
            </div>
        );
    }

    const employerId = String(currentuser.id);
    const employerJobs = getJobsByEmployerId(employerId);


    const jobsWithAnalytics = useMemo(() => {
        return employerJobs.map(job => {
            const applicationsForThisJob = getApplicationsForJob(job.id);
            return {
                ...job,
                applicationsCount: applicationsForThisJob.length, // Actual count based on applications
                views: job.views || 0, 
            };
        });
    }, [employerJobs, getApplicationsForJob]);

    const applicationsData = jobsWithAnalytics.map(job => ({
        name: job.title, 
        applications: job.applicationsCount,
    }));

   
    const viewsData = [...jobsWithAnalytics]
        .sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate))
        .map(job => ({
            name: job.title.length > 15 ? job.title.substring(0, 12) + '...' : job.title,
            views: job.views,
        }));

   
    const totalViews = jobsWithAnalytics.reduce((sum, job) => sum + job.views, 0);
    const totalApplications = jobsWithAnalytics.reduce((sum, job) => sum + job.applicationsCount, 0);
    const averageApplicationsPerPost = jobsWithAnalytics.length > 0 ? (totalApplications / jobsWithAnalytics.length).toFixed(2) : 0;

    return (
        <div className="flex-1 mx-auto px-8 py-4 bg-gray-50 min-h-screen mt-8 sm:mt-2 ">
            <h1 className="text-center text-2xl sm:text-3xl sm:text-4xl font-semibold text-indigo-700 my-10">
                Your Job Post Analytics
            </h1>

            {jobsWithAnalytics.length === 0 ? (
                <div className="text-center text-gray-600 text-lg">
                    <p>You haven't posted any jobs yet. Post a job to see your analytics!</p>
                </div>
            ) : (
                <div className="space-y-12">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-700 mb-2">Total Job Views</h2>
                            <p className="text-4xl font-extrabold text-indigo-600">{totalViews}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-700 mb-2">Total Applications</h2>
                            <p className="text-4xl font-extrabold text-green-600">{totalApplications}</p>
                        </div>
                    </div>

                    {/* Applications per Job Post - Bar Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Applications per Job Post</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={applicationsData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
                                <YAxis tick={{ fill: '#4B5563' }} />
                                <Tooltip
                                    formatter={(value, name) => [`${value} applications`, 'Total Applications']}
                                    labelFormatter={(label) => `Job: ${label}`}
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '10px' }}
                                    labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                                />
                                <Legend />
                                <Bar dataKey="applications" fill="#8884d8" name="Applications" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Views per Job Post (by Post Date)</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                data={viewsData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
                                <YAxis tick={{ fill: '#4B5563' }} />
                                <Tooltip
                                    formatter={(value, name) => [`${value} views`, 'Total Views']}
                                    labelFormatter={(label) => `Job: ${label}`}
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '10px' }}
                                    labelStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="views" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} name="Views" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmployerAnalyticsPage;