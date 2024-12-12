import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Password Manager</h1>
        <p>Welcome to your Password Manager!</p>
        <p>Manage your passwords securely and efficiently.</p>
        <div>
          <a
            className="App-link"
            href="/login"
            target="_self"
            rel="noopener noreferrer"
          >
            Login
          </a>
          <br />
          <a
            className="App-link"
            href="/signup"
            target="_self"
            rel="noopener noreferrer"
          >
            Sign Up
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
