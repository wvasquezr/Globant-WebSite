import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PresidentList from './PresidentList';

class App extends Component {
  constructor(){
    super();
    this.state = { sortBy: '' };
    this.sortClick = this.sortClick.bind(this);
  };

  sortClick = (e) => {
    this.setState({ sortBy: e.target.id });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Globant - Presidents of US
          </p>
        </header>
        <div>
        <table>
            <thead>
              <tr>
                <th id="name" onClick={this.sortClick}>President Name</th>
                <th id="birthDay" onClick={this.sortClick}>Birth Day</th>
                <th id="birthPlace" onClick={this.sortClick}>Birth Place</th>
                <th id="deathDay" onClick={this.sortClick}>Death Day</th>
                <th id="deathPlace" onClick={this.sortClick}>Death Place</th>
              </tr>
            </thead>
            <PresidentList sortValue={this.state.sortBy} />
          </table>
        </div>
      </div>
    );
  }
}

export default App;
