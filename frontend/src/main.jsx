import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './auth/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'black',
      color: 'lime',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '40px', border: '5px solid lime', padding: '20px', marginBottom: '20px' }}>
        V19.0: SYSTEM CONNECTED
      </h1>
      <a href="/final-demo" style={{
        color: 'black',
        background: 'lime',
        fontSize: '30px',
        padding: '20px',
        textDecoration: 'none',
        borderRadius: '10px',
        fontWeight: 'bold'
      }}>
        CLICK HERE FOR EV DEMO
      </a>
      <div style={{ marginTop: '50px', opacity: 0.5 }}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </div>
    </div>
  </React.StrictMode>,
)
