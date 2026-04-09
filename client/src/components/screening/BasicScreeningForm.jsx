import React, { useState } from 'react';
import { Activity, CheckCircle2, Info, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const BasicScreeningForm = () => {
    const { t } = useTranslation();
    const [answers, setAnswers] = useState({
        A1: null, A2: null, A3: null, A4: null, A5: null,
        A6: null, A7: null, A8: null, A9: null, A10: null
    });

    const questions = [
        { id: 'A1', text: t('screening.questions.A1'), icon: "👂" },
        { id: 'A2', text: t('screening.questions.A2'), icon: "🔍" },
        { id: 'A3', text: t('screening.questions.A3'), icon: "👥" },
        { id: 'A4', text: t('screening.questions.A4'), icon: "🔄" },
        { id: 'A5', text: t('screening.questions.A5'), icon: "💬" },
        { id: 'A6', text: t('screening.questions.A6'), icon: "🗣️" },
        { id: 'A7', text: t('screening.questions.A7'), icon: "📖" },
        { id: 'A8', text: t('screening.questions.A8'), icon: "🎭" },
        { id: 'A9', text: t('screening.questions.A9'), icon: "😊" },
        { id: 'A10', text: t('screening.questions.A10'), icon: "🤝" }
    ];

    const styles = {
        container: { padding: '2rem 0', maxWidth: '800px', margin: '0 auto' },
        header: { textAlign: 'center', marginBottom: '3rem' },
        iconBox: { width: '80px', height: '80px', background: 'var(--gradient)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.4)' },
        title: { fontSize: '2.5rem', marginBottom: '0.75rem', color: 'var(--text-main)' },
        subtitle: { color: 'var(--text-muted)', fontSize: '1.1rem' },
        progressContainer: { 
            position: 'sticky', top: '20px', zIndex: 100,
            padding: '1.5rem', borderRadius: '20px', 
            background: 'var(--glass)', backdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)', marginBottom: '3rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
        },
        progressBar: { height: '8px', background: 'var(--glass-border)', borderRadius: '4px', overflow: 'hidden', marginTop: '12px' },
        progressFill: { height: '100%', background: 'var(--gradient)', transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' },
        card: { 
            padding: '2.5rem', borderRadius: '32px', 
            background: 'var(--glass)', border: '1px solid var(--glass-border)',
            marginBottom: '1.5rem', position: 'relative', overflow: 'hidden'
        },
        qNum: { width: '40px', height: '40px', background: 'var(--input-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1.5rem' },
        qText: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '2rem', color: 'var(--text-main)', lineHeight: '1.4' },
        btnGroup: { display: 'flex', gap: '1rem' },
        toggleBtn: (active) => ({
            flex: 1, padding: '1.25rem', borderRadius: '16px', border: active ? 'none' : '1px solid var(--glass-border)',
            background: active ? 'var(--gradient)' : 'var(--input-bg)',
            color: active ? 'white' : 'var(--text-muted)',
            fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: active ? '0 10px 20px -5px rgba(79, 70, 229, 0.4)' : 'none'
        }),
        submitBtn: (disabled) => ({
            width: '100%', padding: '1.5rem', borderRadius: '24px', border: 'none',
            background: disabled ? 'var(--glass)' : 'var(--gradient)',
            color: disabled ? 'var(--text-muted)' : 'white',
            fontWeight: 'bold', fontSize: '1.25rem', cursor: disabled ? 'not-allowed' : 'pointer',
            marginTop: '4rem', boxShadow: disabled ? 'none' : '0 20px 40px -10px rgba(79, 70, 229, 0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
        })
    };

    const handleToggle = (id, value) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const resultArray = questions.map(q => answers[q.id] ?? 0);
        console.log("Basic Screening Result (A1-A10):", resultArray);
        alert(t('screening.logged') || "Screening data logged to console.");
    };

    const completedCount = Object.values(answers).filter(v => v !== null).length;
    const progressPercent = (completedCount / questions.length) * 100;
    const isFormComplete = completedCount === questions.length;

    return (
        <div style={styles.container}>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={styles.header}>
                <div style={styles.iconBox}><Activity size={40} color="white" /></div>
                <h1 style={styles.title}>{t('screening.basic_title')}</h1>
                <p style={styles.subtitle}>{t('screening.basic_sub')}</p>
            </motion.div>

            <motion.div style={styles.progressContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-main)' }}>{t('screening.progress')}</span>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{completedCount}/{questions.length}</span>
                </div>
                <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${progressPercent}%` }} />
                </div>
            </motion.div>

            <form onSubmit={handleSubmit}>
                {questions.map((q, index) => (
                    <motion.div 
                        key={q.id} 
                        initial={{ opacity: 0, x: -10 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        viewport={{ once: true }}
                        style={styles.card}
                    >
                        <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.1, fontSize: '3rem' }}>{q.icon}</div>
                        <div style={styles.qNum}>{index + 1}</div>
                        <p style={styles.qText}>{q.text}</p>
                        <div style={styles.btnGroup}>
                            <motion.button 
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" 
                                style={styles.toggleBtn(answers[q.id] === 1)} onClick={() => handleToggle(q.id, 1)}
                            >{t('common.yes')}</motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" 
                                style={styles.toggleBtn(answers[q.id] === 0)} onClick={() => handleToggle(q.id, 0)}
                            >{t('common.no')}</motion.button>
                        </div>
                    </motion.div>
                ))}

                <motion.button 
                    whileHover={!isFormComplete ? {} : { scale: 1.02, translateY: -4 }} whileTap={!isFormComplete ? {} : { scale: 0.98 }}
                    type="submit" disabled={!isFormComplete} 
                    style={styles.submitBtn(!isFormComplete)}
                >
                    {isFormComplete ? <CheckCircle2 size={24} /> : <Info size={24} />}
                    {t('screening.generate')}
                </motion.button>
            </form>
        </div>
    );
};

export default BasicScreeningForm;
