// SearchComponent.js
import React, { useState } from 'react';
import { searchBreweries } from './api';

const SearchComponent = ({ onSearchResults }) => {
  const [searchType, setSearchType] = useState('city');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchBreweries(searchType, searchTerm);
      onSearchResults(results);
    } catch (err) {
      setError('Failed to search breweries. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-component">
      <form onSubmit={handleSearch}>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="city">City</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search by ${searchType}`}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SearchComponent;