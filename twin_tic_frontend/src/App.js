import React from 'react';
import './App.css';
import MainContainer from './MainContainer';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app" style={{ minHeight: '100vh', background: '#f9f9f9', color: '#222' }}>
      <nav className="navbar" style={{ background: '#4CAF50', color: '#fff', borderBottom: '2px solid #E0E0E0' }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{ fontWeight: 700, fontSize: '1.2rem', color: "#fff" }}>
              <span className="logo-symbol" style={{ color: '#2196F3', fontWeight: 900 }}>◎</span> TwinTic
            </div>
            <div style={{ fontSize: "1rem", color: "#FFC107", alignSelf: "center" }}>
              <span>Tic Tac Toe Game</span>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <MainContainer />
      </main>
    </div>
  );
}

export default App;