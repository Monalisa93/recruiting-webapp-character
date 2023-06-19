import React, { useState, useEffect } from "react";
import './App.css';
import AttributeList from './components/AttributeList/AttributeList';
import SkillCheck from './components/SkillCheck/SkillCheck';

const API_BASE_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/';
const GITHUB_USERNAME = 'YOUR_GITHUB_USERNAME';


function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const fetchCharacterData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${GITHUB_USERNAME}/character`);
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching character data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacterData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <SkillCheck />
        <AttributeList/>
      </section>
    </div>
  );
}

export default App;
