// BreweryListComponent.js
import React from 'react';
import { Link } from 'react-router-dom';

const BreweryList = ({ breweries }) => {
  if (breweries.length === 0) {
    return <p>No breweries found. Try a different search.</p>;
  }

  return (
    <div className="brewery-list">
      {breweries.map((brewery) => (
        <div key={brewery.id} className="brewery-item">
          <h2>{brewery.name}</h2>
          <p>Address: {brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}</p>
          <p>Phone: {brewery.phone || 'N/A'}</p>
          <p>Website: {brewery.website_url ? <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a> : 'N/A'}</p>
          <p>Type: {brewery.brewery_type}</p>
          <Link to={`/brewery/${brewery.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default BreweryList;