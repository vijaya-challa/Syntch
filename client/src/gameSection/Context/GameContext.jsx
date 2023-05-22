/* eslint-disable */
import { createContext, useState } from 'react';

export const GameContext = createContext(null);

function GameContextProvider({ children }) {
  const [acceptedTasks, setAcceptedTasks] = useState(3);
  const [advancedCount, setAdvancedCount] = useState(0);
  const [advancedPoints, setAdvancedPoints] = useState(0);
  const [advancedLength, setAdvancedLength] = useState(0);
  const [beginnerCount, setBeginnerCount] = useState(0);
  const [beginnerPoints, setBeginnerPoints] = useState(0);
  const [blanks, setBlanks] = useState('');
  const [beginnerLength, setBeginnerLength] = useState(0);
  const [delay, setDelay] = useState(0);
  const [countdown, setCountdown] = useState(delay / 1000);
  const [countdownVisible, setCountdownVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [data, setData] = useState(null);
  const [defaultPoints, setDefaultPoints] = useState(0);
  const [duration, setDuration] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const [exerciseGenerated, setExerciseGenerated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [intermediateCount, setIntermediateCount] = useState(0);
  const [intermediatePoints, setIntermediatePoints] = useState(0);
  const [intermediateLength, setIntermediateLength] = useState(0);
  const [levelBtnClass, setLevelBtnClass] = useState('levelsBtn');
  const [levelBtnStyle, setLevelBtnStyle] = useState({ backgroundColor: '#ce93d8' });
  const [modalOpen, setModalOpen] = useState(false);
  const [numBlanks, setNumBlanks] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [remainingTime, setRemainingTime] = useState();
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showSnippet, setShowSnippet] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [userStatistics, setUserStatistics] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [taskAccepted, setTaskAccepted] = useState(false);
  const [timeBonus, setTimeBonus] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [timerVisible, setTimerVisible] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [userAnswer, setUserAnswer] = useState(false);

  const timeToPoints = (time) => {
    const [minutes, seconds] = time.split(':');
    const totalSeconds = +minutes * 60 + +seconds;
    return totalSeconds;
  };

  const timer = () => {
    let timeDuration;
    switch (selectedLevel) {
      case 'beginner':
        timeDuration = timeToPoints('01:05') * 1000;
        break;
      case 'intermediate':
        timeDuration = timeToPoints('01:00') * 1000;
        break;
      case 'advanced':
        timeDuration = timeToPoints('02:45') * 1000;
        break;
      default:
        timeDuration = timeToPoints('05:00') * 1000;
        break;
    }

    setDuration(timeDuration); // Keep track of initial time duration

    let minutes = Math.floor(timeDuration / 60000);
    let seconds = Math.floor((timeDuration % 60000) / 1000);

    setRemainingTime(`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

    const intervalId = setInterval(() => {
      timeDuration -= 1000;
      minutes = Math.floor(timeDuration / 60000);
      seconds = Math.floor((timeDuration % 60000) / 1000);
      setRemainingTime(`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
      if (timeDuration === 0) {
        clearInterval(intervalId); // reset the timer to 0
        setRemainingTime(''); // digits no longer visible
        setTimerVisible(false);
        setOpacity(1); // timer-end message is visible
      }
    }, 1000);

    setTimerId(intervalId);
  };

  const stopTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
    const [minutes, seconds] = remainingTime.split(':');
    const remainingTimeInSeconds = +minutes * 60 + +seconds;
    const elapsedTime = Math.floor(duration - remainingTimeInSeconds);
    const timerBonus = duration - elapsedTime;
    setTimeBonus(timerBonus);
    setTotalPoints(timerBonus + defaultPoints);
    setRemainingTime(null);
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
        setOpacity,
        timerVisible,
        setTimerVisible,
        countdownVisible,
        setCountdownVisible,
        defaultPoints,
        setDefaultPoints,
        totalPoints,
        setTotalPoints,
        stopTimer,
        timeBonus,
        setTimeBonus,
        submitClicked,
        setSubmitClicked,
        userAnswer,
        setUserAnswer,
        levelBtnClass,
        setLevelBtnClass,
        levelBtnStyle,
        setLevelBtnStyle,
        acceptedTasks,
        setAcceptedTasks,
        modalOpen,
        setModalOpen,
        totalTasks,
        setTotalTasks,
        beginnerLength,
        setBeginnerLength,
        intermediateLength,
        setIntermediateLength,
        advancedLength,
        setAdvancedLength,
        beginnerCount,
        setBeginnerCount,
        intermediateCount,
        setIntermediateCount,
        advancedCount,
        setAdvancedCount,
        beginnerPoints,
        setBeginnerPoints,
        intermediatePoints,
        setIntermediatePoints,
        advancedPoints,
        setAdvancedPoints,
        userStatistics,
        setUserStatistics
      }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
