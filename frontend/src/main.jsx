import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './auth/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{ border: '10px solid red', padding: '10px', background: 'black' }}>
      <h1 style={{ color: 'red', textAlign: 'center' }}>V18.0 CONTROL CHECK</h1>
      <a href="/final-demo" style={{ color: 'yellow', fontSize: '24px', display: 'block', textAlign: 'center', marginBottom: '20px' }}>CLICK HERE FOR DEMO</a>
      <AuthProvider>
        <App />
      </AuthProvider>
    </div>
  </StrictMode>,
) minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: 'red', fontSize: '50px', border: '5px solid red', padding: '20px' }}>
        V18.0 CONTROL VERIFICATION
      </h1>
      <a href="/final-demo" style={{ color: 'white', fontSize: '24px', display: 'block', marginTop: '20px' }}>GO TO DEMO</a>
      <App />
  </React.StrictMode >,
)
