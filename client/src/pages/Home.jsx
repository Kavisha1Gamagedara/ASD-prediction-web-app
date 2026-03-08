import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Shield, BarChart, Heart, ChevronRight } from 'lucide-react';
import BrainLogo from '../components/BrainLogo';
import GuideModal from '../components/GuideModal';

const Home = () => {
    const [isGuideOpen, setIsGuideOpen] = React.useState(false);

    return (
        <div className="home-container">
            {/* Navbar */}
            <nav className="navbar" style={{ padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Brain className="text-primary" size={32} color="#4f46e5" />
                    <span>ASD <span style={{ color: '#4f46e5' }}>Sense</span></span>
                </div>
                <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
                    <Link to="/login" className="btn-primary" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                    <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <BrainLogo />
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                        Empowering Families Through <br />
                        <span style={{ background: 'linear-gradient(90deg, #4f46e5, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            AI-Driven ASD Detection
                        </span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto 3rem' }}>
                        A state-of-the-art diagnostic companion using advanced SVM models to provide early
                        insights into Autism Spectrum Disorder with clinical-grade accuracy.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                        <Link to="/register" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', textDecoration: 'none' }}>
                            Start Assessment <ChevronRight size={20} />
                        </Link>
                        <button
                            onClick={() => setIsGuideOpen(true)}
                            className="btn-secondary"
                            style={{ background: 'transparent', border: '1px solid #334155', color: 'white', padding: '16px 32px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>
                            Learn How It Works
                        </button>
                    </div>
                </motion.div>

                <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
            </header>

            {/* Features */}
            <section style={{ background: '#1e293b', padding: '100px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why Choose ASD Sense?</h2>
                        <p style={{ color: '#94a3b8' }}>Advanced technology meets compassionate care.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <FeatureCard
                            icon={<Shield size={24} color="#4f46e5" />}
                            title="Secure & Private"
                            desc="Your data is encrypted and handled with the highest medical standards."
                        />
                        <FeatureCard
                            icon={<BarChart size={24} color="#0ea5e9" />}
                            title="SVM Intelligence"
                            desc="Powered by a Kaggle-trained SVM model for reliable and consistent results."
                        />
                        <FeatureCard
                            icon={<Heart size={24} color="#f472b6" />}
                            title="Parent Focused"
                            desc="Designed specifically for simple, intuitive use by parents and caregivers."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid #1e293b' }}>
                <p style={{ color: '#64748b' }}>&copy; 2026 ASD Sense AI. All rights reserved.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-card"
        style={{ padding: '2.5rem', textAlign: 'left' }}
    >
        <div style={{ background: 'rgba(79, 70, 229, 0.1)', width: 'fit-content', padding: '12px', borderRadius: '12px', marginBottom: '1.5rem' }}>
            {icon}
        </div>
        <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>{desc}</p>
    </motion.div>
);

export default Home;
