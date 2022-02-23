import React, { useState, useEffect } from 'react';
import './App.css';
import Quadtree from './Quadtree';

const createEntity = (id, x, y, radius) => ({id, x, y, radius});

const size = Math.floor(Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9));

let tempqt = new Quadtree(0,0,size,size);
let tempEntities = [];
let directions = [];
let step = [];
let speed = 6;

function setDots(numPoints, minRadius, maxRadius, setNumPoints) {
  tempqt = new Quadtree(0,0,size,size);
  tempEntities = [];
  directions = [];
  step = [];

  let totalAttempts = 0;
  for (let i = 0; i < numPoints; i++) {
    totalAttempts++;
    let radius = Math.floor(Math.random() * (maxRadius-minRadius))+minRadius;
    let x = Math.floor(Math.random() * (size-2*radius))+radius;
    let y = Math.floor(Math.random() * (size-2*radius))+radius;
    if(Math.random() < .75){
      x = Math.floor(Math.random() * (size/2-2*radius))+radius;
    }
    if(Math.random() < .75){
      y = Math.floor(Math.random() * (size/2-2*radius))+radius;
    }
    let entity = createEntity(i,x,y,radius);
    
    tempqt.addEntity(entity);

    const neighbourIds = tempqt.getNeighbourIds(entity);
    const collisionOccured = neighbourIds.some(id => {
      return areColliding(entity, tempEntities[id]);
    });
    if (collisionOccured) {
      tempqt.removeEntity(entity);
      if (totalAttempts >= Math.max(1000,numPoints*10)) {
        numPoints = tempEntities.length;
        setNumPoints && setNumPoints(numPoints);
        break;
      }
      i--;
      continue;
    }
    tempEntities.push(entity);
  }

  for (let i = 0; i < numPoints; i++){
    let rn = Math.floor(Math.random() * 4);
    directions.push(rn);
    let xRatio = Math.random();
    let stepX = Math.round(Math.sqrt(speed*speed*xRatio));
    let stepY = Math.round(Math.sqrt(speed*speed*(1-xRatio)));
    step.push({x: stepX, y: Math.max(stepY, 1)});
  }
}

function drawBoard(qt){
  let canvas = document.getElementById('mainCanvas');
  if(!canvas) return;
  let context = canvas.getContext("2d");

  const {x1,x3,y1,y3} = qt.getxys();
  const canvasWidth = x3-x1;
  const canvasHeight = y3-y1;

  context.canvas.width = canvasWidth+1;
  context.canvas.height = canvasHeight+1;
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  context.moveTo(0, 0);
  context.lineTo(canvasWidth, 0);
  context.lineTo(canvasWidth, canvasHeight);
  context.lineTo(0, canvasHeight);
  context.lineTo(0, 0);

  qt.drawAll(context);

  context.strokeStyle = "black";
  context.stroke();
}

function drawPoints(qt, entities, selectedId = 0) {
  let canvas = document.getElementById('pointsCanvas');
  if(!canvas) return;
  let context = canvas.getContext("2d");

  const {x1,x3,y1,y3} = qt.getxys();
  const canvasWidth = x3-x1;
  const canvasHeight = y3-y1;

  context.canvas.width = canvasWidth+1;
  context.canvas.height = canvasHeight+1;
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  
  const entity = tempEntities[selectedId];
  const neighbourIds = tempqt.getNeighbourIds(entity);

  entities.forEach(entity => {
    context.beginPath();
    const {id, x, y, radius} = entity;
    context.moveTo(x+radius, y);
    context.arc(x, y, radius, 0, 2 * Math.PI);
    if(id == selectedId){
      context.fillStyle =  'rgba(255,0,255,0.9)';
    }
    else if (neighbourIds.includes(id)){
      context.fillStyle =  'rgba(0,255,0,0.9)';
    }
    else {
      context.fillStyle =  'rgba(255,0,0,0.9)';
    }
    context.fill();
  });
}

function areColliding(entity1, entity2) {
  let x = Math.abs(entity2.x - entity1.x);
  let y = Math.abs(entity2.y - entity1.y);
  let dist = Math.sqrt(x**2 + y**2);
  return dist < entity2.radius + entity1.radius;
}

function App() {
  const [selectedId, setSelectedId] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [numDots, setNumDots] = useState(100);
  const [dotSpeed, setDotSpeed] = useState(16);
  const [minRadius, setMinRadius] = useState(5);
  const [maxRadius, setMaxRadius] = useState(8);
  const [updates, setUpdates] = useState(0);
  useEffect(() => {
    drawBoard(tempqt);
    drawPoints(tempqt, tempEntities);
    setDots(numDots, minRadius, maxRadius);
  }, []);

  const handleSelectedIdChange = (e) => {
    let val = parseInt(e.target.value) || 0;
    if (val < 0) val = 0;
    setSelectedId(val);
    drawPoints(tempqt, tempEntities, val);
  }

  useEffect(() => {
    intervalId != null && clearInterval(intervalId);
    let newIntervalId = setInterval(() => {
      if (!window.location.hash.endsWith('/collision-detection')){
        clearInterval(newIntervalId);
      }
      let collidingEntityIds = {};
      for (let i = 0; i < numDots; i++){
        let entity = tempEntities[i];
        const neighbourIds = tempqt.getNeighbourIds(entity);
        neighbourIds.forEach(id => {
          if(areColliding(entity, tempEntities[id])){
            collidingEntityIds[entity.id] = id;
            collidingEntityIds[id] = entity.id;
          }
        });
      }
      Object.keys(collidingEntityIds).forEach(id => {
        let entity = tempEntities[id];
        let collisionEntity = tempEntities[collidingEntityIds[id]];
        let xDif = collisionEntity.x - entity.x;
        let yDif = collisionEntity.y - entity.y;
        let xRatio = Math.abs(xDif) / Math.max(1,(Math.abs(xDif)+Math.abs(yDif)));
        let stepX = Math.round(Math.sqrt(speed*speed*xRatio));
        let stepY = Math.round(Math.sqrt(speed*speed*(1-xRatio)));
        step[id] = {x: stepX, y: stepY};
        switch (true) {
          case xDif < 0 && yDif < 0:
            directions[id] = 2;
            break;
          case xDif < 0:
            directions[id] = 1;
            break;
          case xDif > 0 && yDif > 0:
            directions[id] = 0;
            break;
          case xDif > 0:
            directions[id] = 3;
            break;
        }
      });
      for (let i = 0; i < numDots; i++){
        let entity = tempEntities[i];
        let stepX = step[i].x;
        let stepY = step[i].y;
        let newX = [1,2].includes(directions[i]) ? entity.x+stepX : entity.x-stepX;
        let newY = [2,3].includes(directions[i]) ? entity.y+stepY : entity.y-stepY;
        if (newX > size - entity.radius){
          switch (directions[i]){
            case 1:
              directions[i] = 0;
              break;
            case 2:
              directions[i] = 3;
              break;
          }
        }
        else if (newX < entity.radius){
          switch (directions[i]){
            case 0:
              directions[i] = 1;
              break;
            case 3:
              directions[i] = 2;
              break;
          }
        }
        if (newY > size - entity.radius){
          switch (directions[i]){
            case 2:
              directions[i] = 1;
              break;
            case 3:
              directions[i] = 0;
              break;
          }
        }
        else if (newY < entity.radius){
          switch (directions[i]){
            case 0:
              directions[i] = 3;
              break;
            case 1:
              directions[i] = 2;
              break;
          }
        }
        let newPoint = {x: newX, y: newY};
        tempqt.moveEntity(entity, newPoint);
        tempEntities[i] = {...entity, ...newPoint};
      }
      drawBoard(tempqt);
      drawPoints(tempqt, tempEntities, selectedId);
    }, 1000/dotSpeed);
    setIntervalId(newIntervalId);
  }, [selectedId, dotSpeed, updates]);

  return (
    <div className="Collision">
      <div className="wrapper">
        <canvas id="mainCanvas" className="mainCanvas" />
        <canvas id="pointsCanvas" className="pointsCanvas" />
      </div>
      <div className="idWrapper">
        <label>Purple circle id</label>
        <input className="idSelector" type='number' 
          value={selectedId}
          onChange={handleSelectedIdChange}
        />
        <br /><br />
        <label>Number of Dots</label>
        <input className="idSelector" type='number' 
          value={numDots}
          onChange={(e) => setNumDots(e.target.value)}
        />
        <br /><br />
        <label>Min Radius</label>
        <input className="idSelector" type='number' 
          value={minRadius}
          onChange={(e) => {
            let val = parseInt(e.target.value) || 0;
            if (val < 1) val = 1;
            setMinRadius(val);
          }}
        />
        <br /><br />
        <label>Max Radius</label>
        <input className="idSelector" type='number' 
          value={maxRadius}
          onChange={(e) => {
            let val = parseInt(e.target.value) || 0;
            if (val < 1) val = 1;
            setMaxRadius(val);
          }}
        />
        <br /><br />
        <label>Speed</label>
        <input className="idSelector" type='number' 
          value={dotSpeed}
          onChange={(e) => setDotSpeed(e.target.value)}
        />
        <br /><br />
        <input className="idSelector" type='button' 
          value={'Go!'}
          onClick={() => {setDots(numDots, minRadius, maxRadius, setNumDots);setUpdates(updates + 1)}}
        />
      </div>
    </div>
  );
}

export default App;
