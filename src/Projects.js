import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Projects extends Component {
  render() {
    return (
      <div className="Projects PageContent">

<div className="p-5">
          <div className="container-fluid-md">
            <div className="row justify-content-md-center">
              <div className="col-md-6 pb-3">
                <a target="_blank" href="https://www.myeasyestimator.com">
                  <img src="/EasyEstimator.png" width={360} alt="Easy Estimator" />
                </a>
              </div>
              <div className="col-md-1" />
              <div className="col-md-5">
                <p>
                  <span className="ProjectName">Easy Estimator</span>
                  <br />
                  An online construction estimation and takeoff software.
                  <br/>
                  This online SaaS application is used by estimators to price mechanical 
                  costruction projects from PDFs.
                </p>
                <a className="btn btn-dark btn-lg" target="_blank" href="https://www.myeasyestimator.com">Check it out</a>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="p-5">
          <div className="container-fluid-md">
            <div className="row justify-content-md-center">
              <div className="col-md-5 pb-3">
                <p>
                  <span className="ProjectName">Room Layout</span>
                  <br />
                  An online tool to help you layout a room.
                  <br/>
                  Set your room size, and then create all the objects you plan to put in the room.
                  Drag them around and see what layout works best for you.
                </p>
                <Link className="btn btn-dark btn-lg" to="/room-layout">Check it out</Link>
              </div>
              <div className="col-md-1" />
              <div className="col-md-6">
                <Link to="/room-layout">
                  <img src="/RoomLayout.png" width={300} alt="Room Layout" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="p-5">
          <div className="container-fluid-md">
            <div className="row justify-content-md-center">
              <div className="col-md-6 pb-3">
                <Link to="/snek">
                  <img src="/snek.png" width={300} alt="Snek" />
                </Link>
              </div>
              <div className="col-md-1" />
              <div className="col-md-5">
                <p>
                  <span className="ProjectName">Snek</span>
                  <br />
                  The classic game of snek.
                  <br/>
                  Created in javascript using setInterval.
                </p>
                <Link className="btn btn-dark btn-lg" to="/snek">Check it out</Link>
              </div>
            </div>
          </div>
        </div>

        <hr />
        
        <div className="p-5">
          <div className="container-fluid-md">
            <div className="row justify-content-md-center">
              <div className="col-md-5 pb-3">
                <p>
                  <span className="ProjectName">Snek AI</span>
                  <br />
                  The classic game of snek, but you let an AI play for you.
                  <br/>
                  Created in javascript using an custom made algorithm.
                  Avoids walls and itself, uses BFS to avoid trapping itself - to an extent.
                </p>
                <Link className="btn btn-dark btn-lg" to="/snek-ai">Check it out</Link>
              </div>
              <div className="col-md-1" />
              <div className="col-md-6">
                <Link to="/snek-ai">
                  <img src="/snek-ai.png" width={300} alt="Snek AI" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Projects;
