import { useEffect, useContext } from 'react';
import { GameContext } from '../Context/GameContext';

function Countdown() {
  const { delay, countdown, setCountdown } = useContext(GameContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdown]);

  useEffect(() => {
    setCountdown(delay / 1000);
  }, [delay]);
}

export default Countdown;
