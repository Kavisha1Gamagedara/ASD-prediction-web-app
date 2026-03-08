import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Layout, Activity, User, Settings, Bell, Save, Key, UserCircle } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');
    const [profileData, setProfileData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || ''
    });
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);

    const API_URL = 'http://localhost:5000/api/auth';

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });
        try {
            const token = localStorage.getItem('token');
            const res = await axios.put(`${API_URL}/profile`, profileData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            updateUser(res.data.user);
            setStatus({ type: 'success', msg: 'Profile updated successfully!' });
        } catch (err) {
            setStatus({ type: 'error', msg: err.response?.data?.message || 'Update failed' });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            return setStatus({ type: 'error', msg: 'Passwords do not match' });
        }
        setLoading(true);
        setStatus({ type: '', msg: '' });
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${API_URL}/password`, {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStatus({ type: 'success', msg: 'Password changed successfully!' });
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setStatus({ type: 'error', msg: err.response?.data?.message || 'Password change failed' });
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Profile':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '2.5rem', maxWidth: '600px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ width: '64px', height: '64px', background: 'var(--gradient)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <UserCircle size={32} color="white" />
                            </div>
                            <div>
                                <h2 style={{ marginBottom: '4px' }}>Profile Information</h2>
                                <p style={{ color: '#94a3b8' }}>Update your personal details</p>
                            </div>
                        </div>

                        {status.msg && (
                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                marginBottom: '1.5rem',
                                background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: status.type === 'success' ? '#10b981' : '#ef4444'
                            }}>
                                {status.msg}
                            </div>
                        )}

                        <form onSubmit={handleProfileUpdate}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>First Name</label>
                                    <input
                                        type="text"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>Last Name</label>
                                    <input
                                        type="text"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>Email Address</label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary" disabled={loading} style={{ width: 'auto', padding: '12px 24px' }}>
                                {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                            </button>
                        </form>
                    </motion.div>
                );
            case 'Settings':
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '2.5rem', maxWidth: '600px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ width: '64px', height: '64px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Key size={32} color="#4f46e5" />
                            </div>
                            <div>
                                <h2 style={{ marginBottom: '4px' }}>Security</h2>
                                <p style={{ color: '#94a3b8' }}>Manage your account security</p>
                            </div>
                        </div>

                        {status.msg && (
                            <div style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                marginBottom: '1.5rem',
                                background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: status.type === 'success' ? '#10b981' : '#ef4444'
                            }}>
                                {status.msg}
                            </div>
                        )}

                        <form onSubmit={handlePasswordChange}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>Current Password</label>
                                <input
                                    type="password"
                                    value={passwords.currentPassword}
                                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>New Password</label>
                                <input
                                    type="password"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary" disabled={loading} style={{ width: 'auto', padding: '12px 24px' }}>
                                {loading ? 'Updating...' : <><Key size={18} /> Update Password</>}
                            </button>
                        </form>
                    </motion.div>
                );
            default:
                return (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                            <StatCard title="Total Assessments" value="0" change="+0%" color="#4f46e5" />
                            <StatCard title="Positive Traits" value="0" change="0" color="#ef4444" />
                            <StatCard title="Accuracy Rate" value="98.2%" change="+2.4%" color="#10b981" />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card"
                            style={{ marginTop: '3rem', padding: '4rem', textAlign: 'center' }}
                        >
                            <Activity size={48} color="#4f46e5" style={{ marginBottom: '1rem' }} />
                            <h3>Start Your First Assessment</h3>
                            <p style={{ color: '#94a3b8', maxWidth: '400px', margin: '1rem auto 2rem' }}>
                                Complete a quick 10-minute assessment to get insights into ASD traits using our AI model.
                            </p>
                            <button className="btn-primary" style={{ margin: '0 auto' }}>Begin Now</button>
                        </motion.div>
                    </>
                );
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <aside style={{ width: '280px', borderRight: '1px solid #1e293b', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity color="#4f46e5" /> ASD Dashboard
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <SidebarLink icon={<Layout size={20} />} label="Overview" active={activeTab === 'Overview'} onClick={() => { setActiveTab('Overview'); setStatus({ type: '', msg: '' }); }} />
                    <SidebarLink icon={<Activity size={20} />} label="New Assessment" active={activeTab === 'Assessment'} onClick={() => { setActiveTab('Overview'); setStatus({ type: '', msg: '' }); }} />
                    <SidebarLink icon={<User size={20} />} label="Profile" active={activeTab === 'Profile'} onClick={() => { setActiveTab('Profile'); setStatus({ type: '', msg: '' }); }} />
                    <SidebarLink icon={<Settings size={20} />} label="Settings" active={activeTab === 'Settings'} onClick={() => { setActiveTab('Settings'); setStatus({ type: '', msg: '' }); }} />
                </nav>

                <button
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#94a3b8', background: 'transparent', border: 'none', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}
                >
                    <LogOut size={20} /> Logout
                </button>
            </aside>

            <main style={{ flex: 1, padding: '3rem', backgroundColor: '#0f172a' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem' }}>{activeTab === 'Overview' ? `Welcome back, ${user?.firstName} 👋` : activeTab}</h1>
                        <p style={{ color: '#94a3b8' }}>
                            {activeTab === 'Overview' ? "Here's what's happening with your assessments today." : `Manage your ${activeTab.toLowerCase()} settings here.`}
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button className="glass-card" style={{ padding: '10px', borderRadius: '12px', border: '1px solid #334155', cursor: 'pointer' }}><Bell size={20} /></button>
                        <div style={{ width: '40px', height: '40px', background: 'var(--gradient)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                            {user?.firstName?.[0]}
                        </div>
                    </div>
                </header>

                {renderContent()}
            </main>
        </div>
    );
};

const SidebarLink = ({ icon, label, active = false, onClick }) => (
    <div
        onClick={onClick}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '12px',
            cursor: 'pointer',
            background: active ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
            color: active ? '#4f46e5' : '#94a3b8',
            fontWeight: active ? '600' : '400',
            transition: 'all 0.2s'
        }}
    >
        {icon} {label}
    </div>
);

const StatCard = ({ title, value, change, color }) => (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{title}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h2 style={{ fontSize: '2rem' }}>{value}</h2>
            <span style={{ color, fontSize: '0.8rem', fontWeight: 600 }}>{change}</span>
        </div>
    </div>
);

export default Dashboard;
