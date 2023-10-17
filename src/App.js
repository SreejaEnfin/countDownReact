import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [myObj, setObj] = useState({
    hrs: 0,
    mins: 0,
    secs: 0,
  });

  const [isStart, setStart] = useState(false);

  const hrsHandler = (event) => {
    setObj({
      ...myObj,
      hrs: event.target.value,
    });
  };

  const minsHandler = (event) => {
    setObj({
      ...myObj,
      mins: event.target.value,
    });
  };

  const secsHandler = (event) => {
    setObj({
      ...myObj,
      secs: event.target.value,
    });
  };

  const startCountDown = () => {
    setStart(true);
  };

  const pauseCountDown = () => {
    setStart(false);
  };

  const restartCountDown = () => {
    setStart(true);
  };

  const resetCountDown = () => {
    setStart(false);
    setObj({
      hrs: 0,
      mins: 0,
      secs: 0,
    });
  };

  const { hrs, mins, secs } = myObj;

  useEffect(() => {
    if (isStart) {
      const intervalId = setInterval(() => {
        console.log("seconds is", secs);
        setObj((_obj) => {
          let { hrs, mins, secs } = _obj;
          if (secs === 0) {
            if (mins === 0) {
              if (hrs === 0) {
                // secs, mins and hrs are zero
                hrs = 0;
                mins = 0;
                secs = 0;
                console.log(hrs, mins, secs);
                clearInterval(intervalId);
              } else {
                hrs = hrs - 1 >= 0 ? hrs - 1 : 0;
                mins = 59;
                secs = 59;
              }
            } else {
              // secs zero but mins not zero
              console.log("Minutes not Zero but seconds are zero");
              mins = mins - 1 >= 0 ? mins - 1 : 0;
              secs = 59;
            }
          } else {
            // secs not zero
            console.log("seconds are not zero");
            // setSecs((secs) => (secs - 1 >= 0 ? secs - 1 : 0));
            secs = secs - 1 >= 0 ? secs - 1 : 0;
          }
          return { hrs, mins, secs };
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isStart]);

  return (
    <div>
      <div className="timer-input">
        <div className="form-inputs">
          <div className="form-input">
            <label htmlFor="hours">Hours</label>
            <input type="number" defaultValue={hrs} onChange={hrsHandler} />
          </div>
          <div className="form-input">
            <label htmlFor="mins">Minutes</label>
            <input defaultValue={mins} onChange={minsHandler} type="number" />
          </div>
          <div className="form-input">
            <label htmlFor="secs">Seconds</label>
            <input defaultValue={secs} onChange={secsHandler} type="number" />
          </div>
        </div>

        <div className="button-inputs">
          <button
            type="submit"
            className="button-input"
            onClick={startCountDown}
          >
            Start Count Down
          </button>
          {isStart ? (
            <button
              type="submit"
              className="button-input"
              onClick={pauseCountDown}
            >
              Pause
            </button>
          ) : (
            <button
              type="submit"
              className="button-input"
              onClick={restartCountDown}
            >
              Restart
            </button>
          )}

          <button
            type="submit"
            className="button-input"
            onClick={resetCountDown}
          >
            Reset Count Down
          </button>
        </div>
      </div>

      <div className="timer-output">
        <span>{hrs}</span>:<span>{mins}</span>:<span>{secs}</span>
      </div>
    </div>
  );
}

export default App;
