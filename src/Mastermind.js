import { React, useState } from 'react';

const availableChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getSecretString = (n) => {
  let s = '';
  for(let i = 0; i < n; i++){
    s += '*';
  }
  return s;
}

const getRandomInt = (max) => Math.floor(Math.random() * max);

const getSecretSequence = (n, m) => {
  let chars = availableChars.substring(0, m).split('');
  let resArr = [];

  for(let i = 0; i < n; i++){
    let ranIdx = getRandomInt(chars.length);
    resArr.push(chars.splice(ranIdx,1)[0])  
  }

  return resArr.join('');
}

const GuessedBox = ({guess, p, f}) => {
  return <div>
    <input
      type="text"
      value={guess}
      disabled
    />
    <input
      type="button"
      value="guess"
      disabled
    />
    <span className='px-2'>p: {p}</span>
    <span>f: {f}</span>
  </div>
}

const Mastermind = () => {
  const [n, setN] = useState(4);
  const [m, setM] = useState(10);
  const [s, setS] = useState({});
  const [r, setR] = useState(false);
  const [v, setV] = useState("");
  const [g, setG] = useState([]);
  const [w, setW] = useState(false);

  const handleGuess = (guess, n, m, seq) => {
    if (guess.length != n){
      return null;
    }
    for (let char of guess) {
      if (!availableChars.substring(0, m).includes(char)){
        return null;
      }
    }
    let p = 0;
    let f = 0;
  
    let idx = 0;
    for (let char of guess) {
      if (seq.includes(char)){
        if (guess[idx] == seq[idx]) f++;
        else p++;
      }
      idx++;
    }

    setG([...g, <GuessedBox key={g.length} guess={guess} p={p} f={f} />]);
    if (f == n) {
      setW(true);
    }
  }

  return <div className='paf p-3'>
    <h1>Picas Y Fijas</h1>

    <div className='row justify-content-center pb-4'>
      <div className='col-sm-4 col-xs-6'>
        <span className="paf-label px-2">Sequence Length</span>
        <br/>
        <input
          className='paf-number'
          type="number"
          value={n}
          onChange={(e) => {
            setN(e.target.value);
          }}
          onBlur={() => {
            let val = Math.max(1, n);
            val = Math.min(val, 62);
            setN(val);
            if (val > m){
              setM(val)
            }
          }}
        />
      </div>
      <div className='col-sm-4 col-xs-6'>
        <span className="paf-label">Number of Characters</span>
        <br/>
        <input
          className='paf-number'
          type="number"
          value={m}
          onChange={(e) => {
            setM(e.target.value);
          }}
          onBlur={() => {
            let val = Math.max(n, m);
            setM(Math.min(val, 62));
          }}
        />
      </div>
    </div>
    <div className='row justify-content-center pb-3'>
      <div className='col-3'>
        <input
          type="button"
          value="start"
          onClick={() => {
            const secretSequence = getSecretSequence(n, m);
            setS({n, m, a: secretSequence});
            setR(true);
            setW(false)
            setG([]);
            setV("");
          }}
        />
      </div>
    </div>
    {r ? 
      <>
        <div className='row justify-content-center'>
          <div className='paf-secret col-1'>
            {getSecretString(s.n)}
          </div>
          <div>
            available characters: {availableChars.substring(0, s.m)}
          </div>
          <div>
            {g}
          </div>
          {
            w ? <span>You Win!</span> :
            <div>
              <input
                type="text"
                value={v}
                onChange={(e) => setV(e.target.value)}
              />
              <input
                type="button"
                value="guess"
                onClick={() => handleGuess(v, n, m, s.a)}
              />
            </div>
          }
        </div>
      </> : null
    }
  </div>
}

export default Mastermind;