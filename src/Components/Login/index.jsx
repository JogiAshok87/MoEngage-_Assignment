import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'; 

class Login extends Component {
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
    const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (storedUser && username === storedUser.username && password === storedUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      this.props.navigate('/landing');
    } else {
      this.setState({ error: 'Invalid credentials' });
    }
  };

  

  render() {
    return (
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit} className='loginForm'>
          <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
          <button type="submit">Login</button>
          {this.state.error && <p className="error">{this.state.error}</p>}
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    );
  }
}

export default function LoginWithNavigation() {
  const navigate = useNavigate();
  return <Login navigate={navigate} />;
}