import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import BlogList from './components/BlogList';
import Navbar from './components/Navbar';
import EditPost from './components/EditPost';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
      <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts" element={<BlogList />} />
          <Route path="/edit-post/:id" element={<EditPost />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
