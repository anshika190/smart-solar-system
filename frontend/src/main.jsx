import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ background: 'black', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: 'red', fontSize: '50px', border: '5px solid red', padding: '20px' }}>
        V18.0 CONTROL VERIFICATION
      </h1>
      <a href="/final-demo" style={{ color: 'white', fontSize: '24px', display: 'block', marginTop: '20px' }}>GO TO DEMO</a>
      <App />
    </div>
  </React.StrictMode>,
)
