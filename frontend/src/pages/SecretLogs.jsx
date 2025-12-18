import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { Shield, Download, AlertTriangle } from 'lucide-react';
import api from '../services/api';

const SecretLogs = () => {
    const { user } = useContext(AuthContext);

    const handleDownload = async () => {
        try {
            const response = await api.get('/activity/export', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'SolarGov_Audit_Logs_SECURE.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Export Failed", err);
            alert("Export failed. Ensure you are an Admin.");
        }
    };

    if (!user || user.role !== 'admin') {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                <div style={{ textAlign: 'center' }}>
                    <AlertTriangle size={48} style={{ marginBottom: '1rem' }} />
                    <h1>403 Frobidden</h1>
                    <p>Access Restricted to System Administrators.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', padding: '4rem', paddingTop: '8rem', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="glass-card" style={{ padding: '3rem', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.05)' }}>
                <Shield size={64} color="#ef4444" style={{ marginBottom: '1.5rem' }} />
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff' }}>Restricted Access: Audit Logs</h1>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem' }}>
                    This interface is hidden from public view. Use the button below to generate the secure audit trail directly from the encrypted database.
                </p>

                <button onClick={handleDownload} style={{
                    background: '#ef4444', color: '#fff', border: 'none', padding: '1rem 2rem', fontSize: '1.2rem',
                    borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: 'bold'
                }}>
                    <Download size={24} /> Generate Master Log File
                </button>
            </div>
        </div>
    );
};

export default SecretLogs;
