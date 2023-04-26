import { useEffect, useContext } from 'react';
import { GameContext } from '../Context/GameContext';
import { toggleTimerVisibility } from '../Logic/functions';
import './LevelSelector.css';

function LevelSelector() {
  const {
    setData,
    selectedLevel,
    setSelectedLevel,
    currentTaskIndex,
    setCurrentTask,
    setExerciseGenerated,
    setBlanks,
    setNumBlanks,
    setShowSnippet,
    setTaskAccepted,
    resetTimer,
    setDelay,
    setOpacity
  } = useContext(GameContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/levels?${selectedLevel}`);
        const data = await response.json();
        console.log(data);
        console.log(selectedLevel);
        console.log(data[selectedLevel]);
        setData(data);
        setCurrentTask(data[selectedLevel][currentTaskIndex][`task${currentTaskIndex + 1}`]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [selectedLevel]);

  function handleLevelChange(level) {
    console.log('Level changed to', level);
    setSelectedLevel(level);
    if (level === 'beginner') {
      setDelay(4000); // countdown value
      setNumBlanks(3); // input fields number
    } else if (level === 'intermediate') {
      setDelay(2000);
      setNumBlanks(5);
    } else if (level === 'advanced') {
      setDelay(1000);
      setNumBlanks(7);
    }
    setExerciseGenerated(false); // task with input field no longer visible
    setBlanks(''); // reset the input field to 0
    setShowSnippet(false); // task snippet no longer visible
    setTaskAccepted(false); // accept btn is visible
    resetTimer(); // timer is set to 0
    toggleTimerVisibility(); // timer no longer visible
    setOpacity(0); // countdown no longer visible
    setTimeout(() => {
      const messageVisible = document.querySelector('.timerMessage');
      if (messageVisible) {
        messageVisible.style.opacity = '0';
      }
    }, 10);
  }

  return (
    <div className="levelsBtn">
      -TEMP-
      <button onClick={() => handleLevelChange('beginner')}>Beginner</button>
      <button onClick={() => handleLevelChange('intermediate')}>Intermediate</button>
      <button onClick={() => handleLevelChange('advanced')}>Advanced</button>
      -TEMP-
      {selectedLevel && <p>You selected the {selectedLevel} level.</p>}
    </div>
  );
}

export default LevelSelector;
