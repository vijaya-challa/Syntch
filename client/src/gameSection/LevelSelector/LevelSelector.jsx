import { useEffect, useContext } from 'react';
import useAuthUser from '../../auth/hooks/useAuthUser';
import { GameContext } from '../Context/GameContext';
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
    setOpacity,
    setTimerVisible,
    setCountdownVisible,
    setDefaultPoints,
    setSubmitClicked,
    setLevelBtnClass,
    levelBtnClass,
    levelBtnStyle,
    setUserAnswer
  } = useContext(GameContext);

  const { authUser } = useAuthUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/levels?${selectedLevel}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authUser.accessToken}`
          }
        });
        const data = await response.json();
        console.log(data);
        console.log(selectedLevel);
        console.log(data[selectedLevel]);
        setData(data);
        if (selectedLevel) {
          setCurrentTask(data[selectedLevel][currentTaskIndex][`task${currentTaskIndex + 1}`]);
          console.log(currentTaskIndex);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [selectedLevel, currentTaskIndex]);

  const defaultBgColor = '#e6e6e6';

  function handleLevelChange(level) {
    // console.log('Level changed to', level);
    setSelectedLevel(level);
    let newClass = 'levelsBtn';
    if (level === 'beginner' || level === 'intermediate' || level === 'advanced') {
      newClass += ' newPosition';
    }
    setLevelBtnClass(newClass);
    if (level === 'beginner') {
      setDelay(4000); // countdown value
      setNumBlanks(3); // input fields number
      setDefaultPoints(5);
      // setLevelBtnClass('newPosition');
    } else if (level === 'intermediate') {
      setDelay(2000);
      setNumBlanks(5);
      setDefaultPoints(7);
    } else if (level === 'advanced') {
      setDelay(1000);
      setNumBlanks(7);
      setDefaultPoints(13);
    }
    setExerciseGenerated(false); // task with input field no longer visible
    setBlanks(''); // reset the input field to 0
    setShowSnippet(false); // task snippet no longer visible
    setTaskAccepted(false); // accept btn is visible
    resetTimer(); // timer is set to 0
    setTimerVisible(false);
    setCountdownVisible(false);
    setOpacity(0);
    setSubmitClicked(false);
    setUserAnswer(false);
  }

  return (
    <div className={levelBtnClass}>
      <h3>Select Level</h3>
      <button
        onClick={() => handleLevelChange('beginner')}
        style={selectedLevel === 'beginner' ? levelBtnStyle : { backgroundColor: defaultBgColor }}>
        Beginner
      </button>
      <button
        onClick={() => handleLevelChange('intermediate')}
        style={
          selectedLevel === 'intermediate' ? levelBtnStyle : { backgroundColor: defaultBgColor }
        }>
        Intermediate
      </button>
      <button
        onClick={() => handleLevelChange('advanced')}
        style={selectedLevel === 'advanced' ? levelBtnStyle : { backgroundColor: defaultBgColor }}>
        Advanced
      </button>
    </div>
  );
}

export default LevelSelector;
