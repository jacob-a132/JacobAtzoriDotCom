import React, { useState } from 'react';
import Draggable from 'react-draggable';
import CreateObject from './CreateObject';

function getStyles(props, inNav) {
  const { squareSize, width, height, color, isRound, rotate } = props;
  let styles = {
    width: inNav ? 50 : width*squareSize,
    height: inNav ? 50 : height*squareSize,
    backgroundColor: color,
    transform: `rotate(${rotate || 0}deg)`
  };
  if (isRound) {
    styles.borderRadius = '50%';
  }
  return styles;
}

function getLayerStyles(props) {
  const { layer } = props;
  let styles = {
    zIndex: 10+layer
  };
  return styles;
}

function handleDrag(data, inNav, setInNav, setIsLocked, onNavAdd, onNavRemove, index) {
  let windowWidth = window.innerWidth;
  if(!inNav && data.x <= 0){
    setInNav(true);
    setIsLocked(true);
    onNavAdd(index);
  }
  else if(inNav && data.x >= 0){
    setInNav(false);
    onNavRemove(index);
  }
}

function getPosition(index) {
  let yOffset = Math.floor(index/3)*60;
  let xOffset = (index%3)*60;
  return {x: -150+xOffset, y: 50+yOffset};
}

function ObjectQ(props) {
  const [inNav, setInNav] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [editing, setEditing] = useState(false);
  const { name, width, height, index, onNavAdd, onNavRemove, navIndex, onUpdate,
    layer, color, isRound, rotate } = props;
  return (
    <>
      {editing?
        <CreateObject 
          onCreate={(object) => {onUpdate(index, object);setEditing(false);}} 
          onClose={() => setEditing(false)}
          isUpdate={true}
          {...{ name, width, height, layer, color, isRound, rotate}}
        />
        : null
      }
      <div style={getLayerStyles(props)}>
        <Draggable 
          onDrag={(e, data) => handleDrag(data, inNav, setInNav, setIsLocked, onNavAdd, onNavRemove, index)}
          onMouseDown={() => setIsLocked(false)}
          position={isLocked && inNav ? getPosition(navIndex) : null}
        >
          <div>
            {inNav ? 
              <input
                className="editButton"
                type="button"
                value="?"
                onClick={() => setEditing(true)}
              />
              : null
            }
            <div className="object" style={getStyles(props, inNav)}>
              {name}
              <div className="bottomMiddle">{`${width}x${height}`}</div>
            </div>
          </div>
        </Draggable>
      </div>
    </>
  );
}

export default ObjectQ;
