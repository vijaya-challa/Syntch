/* eslint-disable */
import { createContext, useState } from 'react';
import { toggleTimerVisibility, toggleTimerMessageVisibility } from '../Logic/functions';

export const GameContext = createContext(null);

function GameContextProvider({ children }) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(1);
  const [currentTask, setCurrentTask] = useState(null);
  const [showSnippet, setShowSnippet] = useState(false);
  const [data, setData] = useState(null);
  const [blanks, setBlanks] = useState('');
  const [exerciseGenerated, setExerciseGenerated] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [taskAccepted, setTaskAccepted] = useState(false);
  const [remainingTime, setRemainingTime] = useState();
  const [selectedLevel, setSelectedLevel] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [timerId, setTimerId] = useState(null);
  const [delay, setDelay] = useState(0);
  const [countdown, setCountdown] = useState(delay / 1000);
  const [numBlanks, setNumBlanks] = useState(0);
  const [opacity, setOpacity] = useState(0);

  const timer = () => {
    let duration;
    switch (selectedLevel) {
      case 'beginner':
        duration = 1 * 60 + 30; // task timer
        break;
      case 'intermediate':
        duration = 1 * 60;
        break;
      case 'advanced':
        duration = 0 * 60 + 45;
        break;
      default:
        duration = 5 * 60;
        break;
    }

    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;

    setRemainingTime(`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

    const intervalId = setInterval(() => {
      duration--;
      minutes = Math.floor(duration / 60);
      seconds = duration % 60;
      setRemainingTime(`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
      if (duration === 0) {
        clearInterval(intervalId); // reset the timer to 0
        setRemainingTime(''); // digits no longer visible
        toggleTimerVisibility(); // the element that holds the timer no longer visible
        toggleTimerMessageVisibility(); // timer-end message is visible
      }
    }, 1000);

    setTimerId(intervalId);
  };

  const resetTimer = () => {
    setRemainingTime(null);
    clearInterval(timerId);
    setTimerId(null);
  };

  return (
    <GameContext.Provider
      value={{
        currentTaskIndex,
        setCurrentTaskIndex,
        currentTask,
        setCurrentTask,
        showSnippet,
        setShowSnippet,
        data,
        setData,
        blanks,
        setBlanks,
        exerciseGenerated,
        setExerciseGenerated,
        totalTime,
        setTotalTime,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        taskAccepted,
        setTaskAccepted,
        remainingTime,
        setRemainingTime,
        selectedLevel,
        setSelectedLevel,
        filteredData,
        setFilteredData,
        timerId,
        setTimerId,
        delay,
        setDelay,
        timer,
        resetTimer,
        countdown,
        setCountdown,
        numBlanks,
        setNumBlanks,
        opacity,
        setOpacity
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
