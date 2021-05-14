import React, { Component } from 'react';
import Ref from './Ref';

class Time extends Component {
  state = {
    time: Date.now()
  }
  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getSecondsToday() {
    let { time } = this.state;
	  let d = new Date(time);
	  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
	}

  render() {
    let { time } = this.state;
    let unixDeath = 21474836480;
    let dayLength = 3600*24;
    let overallTime = time/unixDeath;
    return (
      <div className="Time">
        <h2>
          A 'better' way to talk about the time of the day
        </h2>
        <div className="TimeDescription">
          <div>
            Instead of keeping track of hours, minutes and whether it's AM or PM,
            we can just keep track of how much of the day has passed as a percentage.
            For example, at 2:30 PM we are 60.4% through the day, so we can just say the time is 60%
          </div>
          <div className="TimeContainer">
            <span className="TimeLabel">
              Current Time: 
            </span>
            <span className="CurrentTime">
              {Math.floor(10000*this.getSecondsToday()/dayLength)/100}%
            </span>
          </div>
          <div>
            We can also keep track of the time and date all together in one number instead of using days, months and years.
            We can instead just say how far through <Ref link="https://en.wikipedia.org/wiki/Unix_time" text="Unix Time" /> we currently are.
            Unix time started Jan 1 1970, and ends Jan 19 2038,
            and so the current overall time is just how far through that interval we are.
          </div>
          <div className="TimeContainer">
            <span className="TimeLabel">
              Overall Time: 
            </span>
            <span className="CurrentTime">
              {(overallTime - overallTime % 10**-7).toFixed(7)}%
            </span>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Time;
