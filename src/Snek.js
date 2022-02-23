import React from 'react';
import UseScript from './UseScript';

const Snek = (props) =>  {
  return (
    <div id="Snek" tabIndex="0" className="Snek">
      <h1>Snek</h1>
      <div className="SnekInfoSection">
        <span className="SnekInfo">
          Speed: <input type="text" id="speed" defaultValue="10" size="6"/>
        </span>
        <span className="SnekInfo" id='score'>
          Score: 0
        </span>
        <button className="SnekInfo" id='resetButton'>
          reset
        </button>
        <span className="SnekMsg" id='msg'></span>
      </div>

      <table className="center" id={'table'} style={{ 'backgroundColor':' blue' }}></table>

      { props.isBasic ? UseScript('/snek-basic.js') : UseScript('/snek-ai.js') }
    </div>
  );
}

export default Snek;
