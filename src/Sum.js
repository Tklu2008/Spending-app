import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import {Button} from 'react-native';
import randomColor from "randomcolor";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

//<input  value={category} onChange={(e) => boxb(e)} />

class Sum extends React.Component{
  constructor(props){
    super(props);
    this.totalcost(this.props.items)
    console.log()

  }

  

  totalcost(items){
    const filtered1 = items.filter((item) => item.category == "one");
    const mapfiltered1 = filtered1.map((item) => item.cost)
    const newSum1 = mapfiltered1.reduce((total, value) => total + parseInt(value, 10), 0)
    const average1 = Math.floor(newSum1/mapfiltered1.length)
    const filtered2 = items.filter((item) => item.category == "two");
    const mapfiltered2 = filtered2.map((item) => item.cost)
    const newSum2 = mapfiltered2.reduce((total, value) => total + parseInt(value, 10), 0)
    const average2 = Math.floor(newSum2/mapfiltered2.length)
    const filtered3 = items.filter((item) => item.category == "three");
    const mapfiltered3 = filtered3.map((item) => item.cost)
    const newSum3 = mapfiltered3.reduce((total, value) => total + parseInt(value, 10), 0)
    const average3 = Math.floor(newSum3/mapfiltered3.length)
    this.state = {
      items: this.props.items,
      UIChangeHandler: this.props.UIChangeHandler,
      newSum1: newSum1,
      newSum2: newSum2,
      newSum3: newSum3,
      average1: average1,
      average2: average2,
      average3: average3
    }
    console.log(filtered1)
    console.log(filtered2)
    console.log(filtered3)
  }

  render(){
    return (
      <div> 
        <h1> {this.state.newSum1} {this.state.average1 == NaN ? 0 : this.state.average1} </h1>
        <h1> {this.state.newSum2} {this.state.average2 == NaN ? 0 : this.state.average2} </h1>
        <h1> {this.state.newSum3} {this.state.average3 == NaN ? 0 : this.state.average3} </h1>
        <Button onPress={this.state.UIChangeHandler} title={"Change UI"}/>
      </div>)
    
    
    
    
  }

}



export default Sum;
