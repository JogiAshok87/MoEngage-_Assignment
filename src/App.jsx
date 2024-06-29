import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginWithNavigation from './Components/Login';
import RegisterWithNavigation from './Components/Register';
import SearchComponent from './SearchComponent';
import BreweryList from './BreweryListComponent';
import BreweryDetailComponent from './BreweryDetailComponent';
import PrivateRoute from './Components/PrivateRoute';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginWithNavigation />} />
        <Route path="/register" element={<RegisterWithNavigation />} />
        <Route exact path="/">
            <SearchComponent onSearchResults={setSearchResults} />
            <BreweryList breweries={searchResults} />
          </Route>
          <Route path="/brewery/:id">
            <BreweryDetailComponent />
          </Route>
        <Route
          path="/landing"
          element={
            <PrivateRoute>
              <LandingPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<LoginWithNavigation />} /> 
      </Routes>
    </Router>
  );
};

export default App;