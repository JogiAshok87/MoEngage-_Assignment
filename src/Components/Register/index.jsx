import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'; 

class Register extends Component {
  state = {
    username: '',
    password: '',
    error: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {
      localStorage.setItem('registeredUser', JSON.stringify({ username, password }));
      this.props.navigate('/login');
    } else {
      this.setState({ error: 'Please fill out all fields' });
    }
  };

  

  render() {
    return (
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit} className='RegisterForm'>
          <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
          <button type="submit">Register</button>
          {this.state.error && <p className="error">{this.state.error}</p>}
        </form>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    );
  }
}

export default function RegisterWithNavigation() {
  const navigate = useNavigate();
  return <Register navigate={navigate} />;
}