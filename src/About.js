import React, { Component } from 'react';
import Ref from './Ref';

class About extends Component {
  render() {
    return (
      <div className="About PageContent pb-5">
        <div className="row justify-content-md-center pt-5">
          <div className="col-md-6 pt-3">
            <h2>About Me</h2>
            <p>
              My name is Jacob Atzori and I am a software developer
            </p>
            <h2 className="pt-3 bt">Technical Skills</h2>
            <div className="row pt-2 justify-content-center">
              <div className="col-3">
                <p>C#</p>
              </div>
              <div className="col-3">
                <p>JavaScript</p>
              </div>
              <div className="col-3">
                <p>React</p>
              </div>
            </div>
            <div className="row pt-2 justify-content-center">
              <div className="col-3">
                <p>Git</p>
              </div>
              <div className="col-3">
                <p>Docker</p>
              </div>
              <div className="col-3">
                <p>Agile</p>
              </div>
            </div>
            <div className="row pt-2 justify-content-center">
              <div className="col-3">
                <p>Python</p>
              </div>
              <div className="col-3">
                <p>Java</p>
              </div>
              <div className="col-3">
                <p>NodeJS</p>
              </div>
            </div>
            <div className="row pt-2 justify-content-center">
              <div className="col-3">
                <p>Azure</p>
              </div>
              <div className="col-3">
                <p>Unix</p>
              </div>
              <div className="col-3">
                <p>C</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 pt-2 bl">
            <h2>Education</h2>
            <h5>University of Toronto</h5>
            <p>
              Honours BSc GPA: 3.92 <br/>
              Computer Science <br/>
              Mathematics <br/>
            </p>
          </div>
          <div className="col-md-3 pt-3">
            <img alt="Jacob Atzori" width="250" src="/Atzori.jpg" />
          </div>
        </div>
        <hr/>
        <div className="row justify-content-md-center pt-3">
          <div className="col-md-6 pt-3">
            <h2 className="">Experience</h2>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-6 pt-3 br">
            <h5>Ceridian HCM</h5>
            <p>
              Worked on an enterprise SaaS application, in the Work Force Management area. <br/>
              Worked with back end systems where efficiency, clean code, and testing are highly prioritized. <br/>
              Worked with a complex SQL database where optimizing queries makes a significant difference in performance. <br/>
              Experience with test driven development and domain driven design. 
            </p>
          </div>
          <div className="col-md-6 pt-3">
            <h5>Indigo Books and Music</h5>
            <p>
              Leading development on cloud micro-services to migrate product data into a new PIM system. <br/>
              Designing, creating and managing container and cloud based applications using Docker and Azure. <br/>
              Developing several web apps using NodeJS and React to allow business users to easily manipulate data. <br/>
              Integrating SonarQube code quality analyzer into several pipeline build flows. <br/>
              Adding Auth0 user authentication into a web application and integrating existing Active Directory.
            </p>
          </div>
        </div>
        <hr/>
        <div className="row justify-content-md-center">
          <div className="col-md-8 pt-3">
            <h2>Awards</h2>
            <h5>MCS Prize in Computer Science</h5>
            <p>
              Awarded to the top performing student in theoretical computer science courses at University of Toronto Mississauga.
            </p>
            <h5>MCSS Honor Roll (alpha)</h5>
            <p>
              Honour awarded to students who maintain a final grade of 90% or greater in five or more Math and Computer Science courses in one academic school year. (achieved 2017 & 2018)
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
