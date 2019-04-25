import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ScatterGraph from './ScatterGraph';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

class App extends Component {
  state = {
    val : 0
  }

  handleChange = (ev) => {
    this.setState({
      val : ev.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className = "App-body">
      <div style = {{display : 'inline-block', margin : "0 auto"}}>     
        <ScatterGraph value = {this.state.val}/>
        <div style = {{paddingBottom : '2em'}}>
        <p>
      Equation : x<sup>2</sup> - 2xyz<sup>2</sup> + 2y<sup>2</sup>z - 5.7xyz + z<sup>2</sup>
         </p>
          <br/><br/>
          Like it ? star my repo on <a href = "https://github.com/maaz28">Github</a>
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
