import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="Home PageContent">

        <div className="p-5 pb-6 container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-md-4 pt-3">
              <div className="KeyWordContainer">
                <span className="KeyWord">WHO</span>
                <span className="KeyWordContinued"> am I?</span>
              </div>
            </div>
            <div className="col-md-2 col-lg-1" />
            <div className="col-md-6 align-middle pt-5">
              <p>
                My name is Jacob Atzori.
                <br />
                I am a recent graduate from the University of Toronto where I completed a degree in computer science and mathematics.
                <br />
                I am a professional software developer and I make coding projects for fun.
              </p>
            </div>
          </div>
        </div>

        <hr />

        <div className="p-5 pb-6 container-fluid">
          <div className="row justify-content-md-center">
          <div className="col-md-6 order-md-2">
              <div className="KeyWordContainer">
                <span className="KeyWord">WHAT</span>
                <span className="KeyWordContinued"> do I do?</span>
              </div>
            </div>
            <div className="col-md-5 align-middle order-md-1  pt-4">
              <p>
                I make web apps! 
                <br />
                When I get a cool idea and can't find it easily online, I'll try to make it!  I find that websites are the most accessible platform, and I love to code things in React.
              </p>
            </div>
          </div>
        </div>

        <hr />
        
        <div className="p-5 pb-6 container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-md-4 pt-4">
              <div className="KeyWordContainer">
                <span className="KeyWord">WHY</span>
                <span className="KeyWordContinued"> do I do it?</span>
              </div>
            </div>
            <div className="col-md-2 col-lg-1" />
            <div className="col-md-6 align-middle pt-3">
              <p>
                I do it mostly for fun!  
                <br />
                I love when technology makes life easier.  When I have a task that needs to be done over and over, and can be made much simpler with technology, I always love to find or develop an app to make it easier.  This feeling is even stronger when I see someone else doing a tedious task over and over.  I can invest just a few hours coding (which is fun in itself), and save someone else so many more hours over the next weeks or years of their life.
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Home;
