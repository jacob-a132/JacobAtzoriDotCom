import React, { useState } from 'react';
import { CirclePicker } from 'react-color';

function CreateObject(props) {
  const [width, setWidth] = useState(props.width || 3.0);
  const [height, setHeight] = useState(props.height || 3.0);
  const [rotate, setRotate] = useState(props.rotate || 0);
  const [name, setName] = useState(props.name || "bed");
  const [color, setColor] = useState(props.color || "#f44336");
  const [layer, setLayer] = useState(props.layer || 0);
  const [isRound, setIsRound] = useState(props.isRound || false);

  const { onClose, onCreate, isUpdate } = props;
  return (
    <div className="createObject">
      <h5>{isUpdate ? "Update object" : "Create new object"}</h5>
      <input
        className="closeButton"
        type="button"
        value="X"
        onClick={() => onClose()}
      />
      <div className="CreateInputContainer">
        <div>
          <span className="Label">Name</span>
          <input
            className="textBox"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <span className="Label">Width</span>
          <input
            className="numBox"
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value === "" ? "" : parseFloat(e.target.value))}
          />
        </div>
        <div>
        <span className="Label">Height</span>
          <input
            className="numBox"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value === "" ? "" : parseFloat(e.target.value))}
          />
        </div>
        <div className="colorChooser Center mt-2">
          <h3>Color</h3>
          <CirclePicker
            width="210px"
            circleSize={28}
            circleSpacing={7}
            color={color}
            onChangeComplete={color => setColor(color.hex)}
          />
        </div>
        <div>
        <span className="Label">Layer</span>
          <input
            className="numBox"
            type="number"
            value={layer}
            onChange={(e) => setLayer(e.target.value === "" ? "" : parseInt(e.target.value))}
          />
        </div>
        <div>
        <span className="Label">Rotate</span>
          <input
            className="numBox"
            type="number"
            value={rotate}
            onChange={(e) => setRotate(e.target.value === "" ? "" : parseInt(e.target.value))}
          />
        </div>
        <div className="Radio pt-2">
          <div>
            <input type="radio" id="isRoundRadio0"
              checked={!isRound} 
              onChange={(e) => setIsRound(false)} 
            />
            <label htmlFor="isRoundRadio0">square</label>
          </div>
          <div>
            <input type="radio" id="isRoundRadio1"
              checked={isRound} 
              onChange={(e) => setIsRound(true)} 
            />
            <label htmlFor="isRoundRadio1">round</label>
          </div>
        </div>
        <div className="pt-3">
          <input
            type="button"
            value={isUpdate ? "Update" : "Create"}
            onClick={() => onCreate({name, width, height, color, layer, isRound, rotate})}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateObject;
