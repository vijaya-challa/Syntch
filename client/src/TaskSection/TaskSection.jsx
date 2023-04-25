/* eslint-disable */
import React, { useState, useEffect } from 'react';
import atomOneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import SyntaxHighlighter from 'react-syntax-highlighter';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import { generateExercise } from '../Logic/functions.js';
import './TaskSection.css';

function TaskSection() {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(1);
  const [currentTask, setCurrentTask] = useState(null);
  const [showSnippet, setShowSnippet] = useState(true);
  const [data, setData] = useState(null);
  const [blanks, setBlanks] = useState('');
  const [exerciseGenerated, setExerciseGenerated] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [taskAccepted, setTaskAccepted] = useState(false);

  const handleAcceptClick = () => {
    setTaskAccepted(true);
    setShowSnippet(true);
    getStartTime();
    setTimeout(() => {
      const codeWithBlanks = generateExercise(formattedCode, 3);
      // const codeWithBlanks = generateExercise(currentTask.snippet, 3);
      console.log(currentTask.snippet);
      // generateExercise(currentTask.snippet, 3);
      // setShowSnippet(false);
      setBlanks(codeWithBlanks);
    }, 1000);
  };

  const handleNextClick = () => {
    setCurrentTaskIndex(currentTaskIndex === data.beginner.length - 1 ? 0 : currentTaskIndex + 1);
    setCurrentTask(data.beginner[currentTaskIndex + 1][`task${currentTaskIndex + 2}`]);
    setShowSnippet(false);
    setExerciseGenerated(false);
    setBlanks('');
    setTaskAccepted(false);
  };

  const handlePreviousClick = () => {
    setCurrentTaskIndex(currentTaskIndex === 0 ? data.beginner.length - 1 : currentTaskIndex - 1);
    setCurrentTask(data.beginner[currentTaskIndex][`task${currentTaskIndex + 1}`]);
    setShowSnippet(false);
    setExerciseGenerated(false);
    setBlanks('');
    setTaskAccepted(false);
  };

  const handleSubmitClick = () => {};

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/levels');
        const data = await response.json();
        // console.log(data);
        setData(data);
        setCurrentTask(data.beginner[currentTaskIndex][`task${currentTaskIndex + 1}`]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [currentTaskIndex]);

  const isPrevDisabled = currentTaskIndex === 0;
  const prevButtonClass = isPrevDisabled ? 'disabled' : 'active';
  const isNextDisabled = currentTaskIndex === data?.beginner.length - 1;
  const nextButtonClass = isNextDisabled ? 'disabled' : 'active';

  const formattedCode = currentTask
    ? prettier.format(currentTask.snippet, {
        parser: 'babel',
        plugins: [parserBabel]
      })
    : '';

  function getStartTime() {
    setStartTime(new Date().getTime());
  }

  function getEndTime() {
    setEndTime(new Date().getTime());
  }

  useEffect(() => {
    if (startTime && endTime) {
      const difference = Math.round((endTime - startTime) / 1000);
      setTotalTime(difference);
    }
  }, [startTime, endTime]);

  return (
    <div>
      {currentTask ? (
        <>
          <div className="task-desc">{currentTask.description}</div>
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
    </div>
  );
}

export default TaskSection;
