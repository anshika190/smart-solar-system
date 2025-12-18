import React, { useState, useEffect } from 'react';
/* eslint-disable react-hooks/purity */
import { Download, FileText, CheckCircle, Clock, Calendar, Search } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import api from '../services/api';

const SystemReports = () => {
    // ... (same content)

    // ... inside return ...
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
        <Download size={16} /> Get CSV
    </button>
                                </td >
                            </tr >
                        ))}
                    </tbody >
                </table >
            </div >

    <style>{`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4); }
                    70% { box-shadow: 0 0 0 6px rgba(234, 179, 8, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(234, 179, 8, 0); }
                }
            `}</style>
        </div >
    );
};

export default SystemReports;
