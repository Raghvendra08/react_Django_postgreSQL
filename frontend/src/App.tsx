// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login"
import Register from './components/Register';
// import './styles.css'; 
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" Component={Login} />
        {/* <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} /> */}
      </Routes>
    </Router>
  );
};

export default App;
