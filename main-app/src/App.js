import React, { useState, Suspense } from "react";
import "./App.css";

const MusicLibrary = React.lazy(() => import("music_library/MusicLibrary"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      setRole("admin");
      localStorage.setItem("jwt", generateJWT("admin"));
      setIsLoggedIn(true);
    } else if (username === "user" && password === "user123") {
      setRole("user");
      localStorage.setItem("jwt", generateJWT("user"));
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials! Use admin/admin123 or user/user123");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
    setUsername("");
    setPassword("");
    localStorage.removeItem("jwt");
  };

  const generateJWT = (role) => {
    const payload = {
      username,
      role,
      exp: Date.now() + 3600000,
    };
    return btoa(JSON.stringify(payload));
  };

  if (!isLoggedIn) {
    return (
      <div className="app">
        <div className="login-container">
          <h1>Music App Login</h1>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <div className="credentials">
            <h3>Test Credentials:</h3>
            <p>
              <strong>Admin:</strong> username: admin, password: admin123
            </p>
            <p>
              <strong>User:</strong> username: user, password: user123
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Music App</h1>
        <div className="user-info">
          <span>
            Welcome, {username} ({role})
          </span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="app-main">
        <Suspense
          fallback={<div className="loading">Loading Music Library...</div>}
        >
          <MusicLibrary role={role} />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
