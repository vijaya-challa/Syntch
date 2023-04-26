/* eslint-disable */
import React, { useContext } from 'react';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import SyntaxHighlighter from 'react-syntax-highlighter';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import { generateExercise } from '../Logic/functions.js';
import Countdown from '../Logic/Countdown.js';
import { GameContext } from '../Context/GameContext.jsx';
import LevelSelector from 'gameSection/LevelSelector/LevelSelector.jsx';
import './TaskSection.css';

const TaskSection = () => {
  const {
    currentTaskIndex,
    setCurrentTaskIndex,
    currentTask,
    setCurrentTask,
    showSnippet,
    setShowSnippet,
    data,
    setBlanks,
    setExerciseGenerated,
    taskAccepted,
    setTaskAccepted,
    remainingTime,
    selectedLevel,
    timer,
    resetTimer,
    delay,
    countdown,
    numBlanks,
    opacity,
    setOpacity
  } = useContext(GameContext);

  const handleAcceptClick = () => {
    setTaskAccepted(true);
    setShowSnippet(true);
    setOpacity(1); //countdown is visible
    setTimeout(() => {
      const codeWithBlanks = generateExercise(formattedCode, numBlanks);
      const timerVisible = document.getElementById('timer');
      if (timerVisible) {
        timerVisible.style.opacity = '1';
      }
      timer();
      setBlanks(codeWithBlanks); //task with input fields is displayed
      setOpacity(0); //countdown no longer visible
    }, delay);
  };

  const handleSubmitClick = () => {};

  const handleNextClick = () => {
    setCurrentTaskIndex(
      currentTaskIndex === data[selectedLevel].length - 1 ? 0 : currentTaskIndex + 1
    );
    setCurrentTask(data[selectedLevel][currentTaskIndex + 1][`task${currentTaskIndex + 2}`]);
    setExerciseGenerated(false); //task with input field no longer visible
    setBlanks(''); //reset the input field to 0
    setShowSnippet(false); //task snippet no longer visible
    setTaskAccepted(false); //accept btn is visible
    resetTimer(); //timer is set to 0
    const messageVisible = document.querySelector('.timerMessage');
    if (messageVisible) {
      messageVisible.style.opacity = '0';
    }
  };

  const handlePreviousClick = () => {
    setCurrentTaskIndex(
      currentTaskIndex === 0 ? data[selectedLevel].length - 1 : currentTaskIndex - 1
    );
    setCurrentTask(data[selectedLevel][currentTaskIndex][`task${currentTaskIndex + 1}`]);
    setExerciseGenerated(false);
    setBlanks('');
    setShowSnippet(false);
    setTaskAccepted(false);
    resetTimer();
    const messageVisible = document.querySelector('.timerMessage');
    if (messageVisible) {
      messageVisible.style.opacity = '0';
    }
  };

  const isPrevDisabled = currentTaskIndex === 0; //previous btn is disabled at index 0
  const prevButtonClass = isPrevDisabled ? 'disabled' : 'active'; //previous btn is enabled at index > 0
  const isNextDisabled = currentTaskIndex === data && [selectedLevel].length - 1; //next btn is disabled at the last index
  const nextButtonClass = isNextDisabled ? 'disabled' : 'active';

  const formattedCode = currentTask
    ? prettier.format(currentTask.snippet, {
        parser: 'babel',
        plugins: [parserBabel]
      })
    : '';

  return (
    <div>
      {currentTask ? (
        <>
          <div className="task-desc">{currentTask.description}</div>
          <div className="timers">
            <div id="countdown" className="countdown" style={{ opacity }}>
              {countdown}
            </div>
            {taskAccepted && (
              <div id="timer" className="timer">
                Remaining time: {remainingTime}
              </div>
            )}
            <div className="timerMessage">
              <h2>Time's Up!</h2>
            </div>
          </div>
          <div className="task">
            {showSnippet && (
              <SyntaxHighlighter language="javascript" style={atomOneDark}>
                {formattedCode}
              </SyntaxHighlighter>
            )}
          </div>
          <div className="task-btn">
            <button
              onClick={handlePreviousClick}
              disabled={isPrevDisabled}
              className={`arrow prev ${prevButtonClass}`}></button>
            {!taskAccepted && <button onClick={handleAcceptClick}>Accept</button>}
            {taskAccepted && <Countdown delay={delay} />}
            {taskAccepted && <button onClick={handleSubmitClick}>Submit</button>}
            <button
              onClick={handleNextClick}
              disabled={isNextDisabled}
              className={`arrow next ${nextButtonClass}`}></button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
      <LevelSelector />
    </div>
  );
};

export default TaskSection;
