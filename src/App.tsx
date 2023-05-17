import { useState } from 'react';
import { NavBar } from './features/navBar/navBar';
import { Pokedex } from './features/pokedex/pokedex';
// import './App.css';

function App() {
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value.toLowerCase());
  return (
    <div className="App">
      <NavBar handleSearch={handleSearch}/>
      <Pokedex/>
    </div>
  );
}

export default App;
