import { useEffect, useState } from "react";
import stopIcon from "./assets/icons/two-vertical-rect.png";
import diceIcon from "./assets/icons/dice.png";

// API: https://api.adviceslip.com

export default function App() {
  let [adviceInfo, setAdviceInfo] = useState();

  useEffect(() => {
    getAdvice().then((advice) => setAdviceInfo(advice));
  }, []);

  if (adviceInfo) {
    return (
      <>
        <h1>ADVICE #{adviceInfo.slip.id}</h1>
        <p className="advice-text">“{adviceInfo.slip.advice}”</p>
        <div className="separator">
          <span className="separator__line"></span>
          <img src={stopIcon} alt="" />
        </div>
        <div className="dice">
          <button
            onClick={() => {
              getAdvice().then((advice) => {
                setAdviceInfo(advice);
                console.log(advice)
              });
            }}
          >
            <img src={diceIcon} alt="" />
          </button>
        </div>
      </>
    );
  }
}

async function getAdvice() {
  let adviceInfo = await fetch("https://api.adviceslip.com/advice");
  return await adviceInfo.json();
}
