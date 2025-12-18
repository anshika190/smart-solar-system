import React, { useState, useEffect } from 'react';
/* eslint-disable react-hooks/purity */
import { Download, FileText, CheckCircle, Clock, Calendar, Search } from 'lucide-react';

// ... (imports remain)

const Reports = () => {
    // ... (state remains)

    // Unused "downloadActivityLogs" function REMOVED entirely.

    // ... (useEffect remains)

    // ... (handleDownload remains)

    // ... (StatusBadge remains)

    return (
        <div style={{ minHeight: '100vh', padding: '2rem', paddingTop: '6rem', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
                        System Reports <span style={{ fontSize: '1rem', background: '#3b82f6', WebkitTextFillColor: 'white', padding: '4px 8px', borderRadius: '8px', verticalAlign: 'middle' }}>v4.1 (Privacy Secured)</span>
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                        Automated daily performance archives and efficiency analysis.
                    </p>
                </div>

                {/* Search & Admin Actions */}
                <div style={{ display: 'flex', gap: '1rem' }}>

                    {/* Admin CSV Download Button Removed - Moved to Secret Page */}

                    <div className="glass-card" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderRadius: '12px' }}>
                        <Search color="#64748b" size={20} />
                        <input
                            type="text"
                            placeholder="Search Report ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1rem', outline: 'none', width: '200px' }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Table Card */}
            <div className="glass-card" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'rgba(2, 6, 23, 0.5)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ padding: '1.5rem', textAlign: 'left', color: '#94a3b8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <FileText size={16} /> Report ID
                            </th>
                            <th style={{ padding: '1.5rem', textAlign: 'left', color: '#94a3b8', fontWeight: '600' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} /> Date</div>
                            </th>
                            <th style={{ padding: '1.5rem', textAlign: 'left', color: '#94a3b8', fontWeight: '600' }}>System Status</th>
                            <th style={{ padding: '1.5rem', textAlign: 'left', color: '#94a3b8', fontWeight: '600' }}>Total Production</th>
                            <th style={{ padding: '1.5rem', textAlign: 'left', color: '#94a3b8', fontWeight: '600' }}>Efficiency Score</th>
                            <th style={{ padding: '1.5rem', textAlign: 'right', color: '#94a3b8', fontWeight: '600' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.filter(r => r.id.toLowerCase().includes(searchTerm.toLowerCase())).map((report, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <td style={{ padding: '1.25rem 1.5rem', color: '#e2e8f0', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                                    {report.id}
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem', color: '#cbd5e1' }}>
                                    {report.date}
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <StatusBadge status={report.status} />
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem', color: '#fff', fontWeight: '600' }}>
                                    {report.production}
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem', color: '#fff' }}>
                                    <span style={{ color: parseFloat(report.efficiency) > 90 ? '#34d399' : '#fbbf24' }}>
                                        {report.efficiency}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                    <button
                                        onClick={() => handleDownload(report)}
                                        style={{
                                            background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
                                            border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px',
                                            color: '#fff', fontWeight: '600', cursor: 'pointer',
                                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.5)',
                                            transition: 'transform 0.2s, box-shadow 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.6)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.5)';
                                        }}
                                    >
                                        <Download size={16} /> Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4); }
                    70% { box-shadow: 0 0 0 6px rgba(234, 179, 8, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); }
                }
            `}</style>
        </div>
    );
};

export default Reports;
