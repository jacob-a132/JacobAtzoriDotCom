import React, { useState, useEffect } from 'react';
import ObjectQ from './ObjectQ';
import CreateObject from './CreateObject';
import './App.css';

function drawBoard(width, height, scale){

  if(width == 0 || height == 0 || scale == 0)
    return;

  let canvas = document.getElementById('mainCanvas');
  let context = canvas.getContext("2d");

  let windowWidth = window.innerWidth - 280;
  let windowHeight = window.innerHeight - 240;

  let squareSize = Math.min(windowWidth/width, windowHeight/height)*scale;

  let canvasWidth = width * squareSize / scale;
  let canvasHeight = height * squareSize / scale;

  context.canvas.width  = canvasWidth;
  context.canvas.height = canvasHeight;

  for (let x = 0; x <= width/scale; x += 1) {
    context.moveTo(x*squareSize+.5, 0);
    context.lineTo(x*squareSize+.5, canvasHeight);
  }
  context.moveTo(canvasWidth-.5, 0);
  context.lineTo(canvasWidth-.5, canvasHeight-.5);

  for (let x = 0; x <= height/scale; x += 1) {
    context.moveTo(0, x*squareSize+.5);
    context.lineTo(canvasWidth, x*squareSize+.5);
  }
  context.moveTo(0, canvasHeight-.5);
  context.lineTo(canvasWidth, canvasHeight-.5);

  context.strokeStyle = "black";
  context.stroke();

  return squareSize / scale;
}

function handleObjectUpdate(index, newObj, objects, setObjects) {
  // 1. Make a shallow copy of the items
  let items = [...objects];
  items[index] = newObj;
  setObjects(items);
}

function getObjects(objects, squareSize, navArray, setNavArray, setObjects) {
  let objectComps = [];
  let count = 0;
  for (let object of objects){
    objectComps.push(
      <ObjectQ
        squareSize={squareSize}
        width={object.width}
        height={object.height}
        layer={object.layer}
        color={object.color}
        name={object.name}
        isRound={object.isRound}
        index={count}
        rotate={object.rotate}
        onUpdate={(index, newObj) => handleObjectUpdate(index, newObj, objects, setObjects)}
        navIndex={navArray.indexOf(count)}
        onNavAdd={(objIndex) => setNavArray([...navArray, objIndex])}
        onNavRemove={(objIndex) => {
          const index = navArray.indexOf(objIndex);
          if (index > -1) {
            navArray.splice(index, 1);
          }
          setNavArray(navArray);
        }}
        key={`ObjectQ${count}`}
      />
    )
    count++;
  }
  return objectComps;
}

function App() {

  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [scale, setScale] = useState(1);
  const [squareSize, setSquareSize] = useState(0);
  const [objects, setObjects] = useState([]);
  const [creatingObject, setCreatingObject] = useState(false);
  const [navArray, setNavArray] = useState([]);

  useEffect(() => {
    setSquareSize(drawBoard(width, height, scale));
  }, []);

  return (
    <div className="RoomLayout">
      {creatingObject ? 
        <CreateObject 
          onCreate={(object) => {setObjects([...objects, object]); setNavArray([...navArray, objects.length])}} 
          onClose={() => setCreatingObject(false)}
        />
        : null
      }
      <div className="sidebar">
        <div className="nav">
          <h2>Objects</h2>
          <div>
            <input
              className="btn btn-secondary"
              disabled={creatingObject}
              type="button"
              value="Create new object"
              onClick={() => setCreatingObject(true)}
            />
          </div>
          {getObjects(objects, squareSize, navArray, setNavArray, setObjects)}
        </div>
      </div>

      <div className="main">
        <div>
          <h2>Room Layout</h2>
          <div>
          <span className="Label">Width</span>
            <input
              className="numBox"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value === "" ? "" : parseFloat(e.target.value))}
            />
            <span className="Label">Height</span>
            <input
              className="numBox"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value === "" ? "" : parseFloat(e.target.value))}
            />
            <span className="Label">Scale</span>
            <input
              className="numBox"
              type="number"
              value={scale}
              onChange={(e) => setScale(e.target.value === "" ? "" : parseFloat(e.target.value))}
            />
            <input
              className="button"
              type="button"
              value="Resize Room"
              onClick={() => setSquareSize(drawBoard(width, height, scale))}
            />
          </div>
        </div>
        <div>
          <canvas id="mainCanvas" className="mainCanvas" />
        </div>
      </div>
    </div>
  );
}

export default App;
