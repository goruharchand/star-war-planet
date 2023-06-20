import { useState } from 'react';

function SearchForm({ onSearch }) {
  const [planetName, setPlanetName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(planetName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={planetName}
        onChange={(e) => setPlanetName(e.target.value)}
        placeholder="Enter a planet name"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
