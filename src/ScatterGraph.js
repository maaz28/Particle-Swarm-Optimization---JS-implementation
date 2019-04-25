import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { particle_swarm_optimization } from './PSO';
import { TextField, Button } from '@material-ui/core';


export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
    state = {
        particles : [],
        global_best : [],
        val : 29
    }

    handleChange = (ev) => {
      this.setState({
        val : ev.target.value
      })
    }

    handlerClick = () => {
      console.log(this.state.val)
        let data = particle_swarm_optimization(this.state.val);
        let fitnesses = data.fitnesses
        let structured_data = [];
        for(let i=0; i<fitnesses.length; i++){
            let obj = {};
            for(let j=0; j<10; j++){
                console.log(i, j, fitnesses[i][j])
                obj[j + 'th'] = fitnesses[i][j] ;
                console.log(obj)
            }
            structured_data.push(obj);
        }
        console.log(structured_data);
        this.setState({
            particles : structured_data,
            global_best : data.global_best
        })
    }
    
    
  render() {
    return (
      <React.Fragment>
      <LineChart
        width={1000}
        height={500}
        data={this.state.particles}
        margin={{
          top: 0, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {(this.state.val < 30) ? (
        <Legend />
        ) : (null)
        }
        {
            this.state.particles.map((item, i) => {
                return(
                    <Line type="monotone" dataKey={i+"th"} stroke={"#8884dd"} />
                )
            })
        }
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
      <div>Global Best : {this.state.global_best[3]}</div>
      <div style = {{display : 'block', margin : "0 auto", marginBottom : "2em", backgroundColor : '#dcd4d4', paddingBottom : '1em'}}>
      <TextField
          id="standard-name"
          label="Number Of Iterations"
          helperText = "Enter number of iterations here, You're solely responsible for this action."
          value={this.state.val}
          onChange={this.handleChange}
          margin="normal"
          style = {{color : "white", foreground : 'white'}}
        /> 
        <br></br>
        <Button variant="contained" color="primary" onClick = {this.handlerClick}>
        Number Of Iterations
      </Button> 
      <br></br>
      </div>
      </React.Fragment>
    );
  }
}
