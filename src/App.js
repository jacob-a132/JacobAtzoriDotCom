import React, { Component } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './Header';
import Home from './Home';
import Projects from './Projects';
import About from './About';
import Time from './Time';
import Snek from './Snek';
import RoomLayout from './RoomLayout/src/App';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="Body">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/projects" component={Projects} />
            <Route path="/about" component={About} />
            <Route path="/absolute-time" component={Time} />
            <Route path="/snek" component={() => <Snek isBasic />} />
            <Route path="/snek-ai" component={Snek} />
            <Route path="/room-layout" component={RoomLayout} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
