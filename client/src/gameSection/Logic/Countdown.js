import { useEffect, useContext } from 'react';
import { GameContext } from '../Context/GameContext';

function Countdown() {
  const { delay, countdown, setCountdown } = useContext(GameContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (countdown > 0) {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [countdown]);

  useEffect(() => {
    setCountdown(delay / 1000);
  }, [delay]);
}

export default Countdown;
