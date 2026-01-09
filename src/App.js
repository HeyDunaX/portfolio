import React from 'react';
import './App.css';
import Header from './components/header.js';
import Home from './components/Home.js';
import Awards from './components/Awards.js';
import Service from './components/Service.js';
import Publications from './components/Work.js';
import Skill from './components/Skill.js';
import Blog from './components/Blog.js';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
        <Service />
        <Publications />
        <Skill />
        <Awards />
        <Blog />
      </main>
    </div>
  );
}

export default App;

