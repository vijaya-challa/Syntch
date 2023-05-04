/* eslint-disable */
import React, { useContext, useRef } from 'react';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import SyntaxHighlighter from 'react-syntax-highlighter';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import { generateExercise } from '../Logic/functions.js';
import Countdown from '../Logic/Countdown.js';
import { GameContext } from '../Context/GameContext.jsx';
import LevelSelector from 'gameSection/LevelSelector/LevelSelector.jsx';
import './TaskSection.css';

let render = 0;

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
    setOpacity,
    timerVisible,
    setTimerVisible,
    countdownVisible,
    setCountdownVisible
  } = useContext(GameContext);

  const snippetIsShowing = useRef();
  snippetIsShowing.current = showSnippet;

  const handleAcceptClick = () => {
    setTaskAccepted(true);
    setShowSnippet(true);
    setCountdownVisible(true);

    setTimeout(() => {
      if (!snippetIsShowing.current) {
        return;
      }
      const codeWithBlanks = generateExercise(formattedCode, numBlanks);
      timer(); //function from GameContext
      setBlanks(codeWithBlanks); //task with input fields is displayed
      setCountdownVisible(false);
      setTimerVisible(true);
    }, delay);
  };

  const handleSubmitClick = () => {};

  const handleNextClick = () => {
    const nextIndex =
      currentTaskIndex === data[selectedLevel].length - 1 ? 0 : currentTaskIndex + 1;
    setCurrentTaskIndex(nextIndex);
    setCurrentTask(data[selectedLevel][nextIndex][`task${nextIndex + 1}`]);
    setExerciseGenerated(false); //task with input field no longer visible
    setBlanks(''); //reset the input field to 0
    setShowSnippet(false); //task snippet no longer visible
    setTaskAccepted(false); //accept btn is visible
    resetTimer(); //timer is set to 0
    setTimerVisible(false);
    setCountdownVisible(false);
    setOpacity(0); //timer-end message no longer visible
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
    setTimerVisible(false);
    setCountdownVisible(false);
    setOpacity(0);
  };

  const isPrevDisabled = currentTaskIndex === 0; //previous btn is disabled at index 0
  const prevButtonClass = isPrevDisabled ? 'disabled' : 'active'; //previous btn is enabled at index > 0

  const tasksCount = data && data[selectedLevel] ? data[selectedLevel].length : 0;
  const isNextDisabled = currentTaskIndex === tasksCount - 1;
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
            {countdownVisible && <div className="countdown">{countdown}</div>}
            {taskAccepted && timerVisible && (
              <div className="timer">Remaining time: {remainingTime}</div>
            )}
            <div className="timerMessage" style={{ opacity }}>
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
              className={`arrow prev ${prevButtonClass}`}
            ></button>
            {!taskAccepted && <button onClick={handleAcceptClick}>Accept</button>}
            {taskAccepted && <Countdown delay={delay} />}
            {taskAccepted && <button onClick={handleSubmitClick}>Submit</button>}
            <button
              onClick={handleNextClick}
              disabled={isNextDisabled}
              className={`arrow next ${nextButtonClass}`}
            ></button>
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
