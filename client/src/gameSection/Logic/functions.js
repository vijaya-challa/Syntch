/* eslint-disable */

// function to add input fields to the code snippets
export function generateExercise(text, numBlanks) {
  const parentElement = document.querySelector('.language-javascript');
  const spanElements = parentElement.querySelectorAll('span:not(:empty)');
  const selectedSpanIndices = [];
  while (selectedSpanIndices.length < numBlanks) {
    const index = Math.floor(Math.random() * spanElements.length);
    if (!selectedSpanIndices.includes(index) && spanElements[index].textContent.trim() !== '') {
      selectedSpanIndices.push(index);
    }
  }
  selectedSpanIndices.forEach((index) => {
    const spanElement = spanElements[index];
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = '';
    inputElement.style.border = 'none';
    inputElement.style.width = `${spanElement.offsetWidth}px`;
    inputElement.style.backgroundColor = 'lightblue';
    inputElement.style.border = '1px solid';
    inputElement.style.borderRadius = '2px';
    spanElement.parentNode.replaceChild(inputElement, spanElement);
  });
}

// function to change the timer visibility
export const toggleTimerVisibility = () => {
  const timerVisible = document.getElementById('timer');
  if (timerVisible) {
    timerVisible.style.opacity = '0';
  }
};

// function to change the visibility of the message when timer ends
export const toggleTimerMessageVisibility = () => {
  const messageVisible = document.querySelector('.timerMessage');
  if (messageVisible) {
    messageVisible.style.opacity = '1';
  }
};
