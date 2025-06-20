import React from 'react';
import './App.css';
import MainContainer from './MainContainer';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container" style={{ maxWidth: 920 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol" style={{ color: '#ff7d4c', fontWeight: 900 }}>◎</span> TwinTic
            </div>
            <div style={{
              fontSize: "1rem",
              color: "#faff00",
              alignSelf: "center",
              textShadow: "0 2px 5px #232"
            }}>
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
