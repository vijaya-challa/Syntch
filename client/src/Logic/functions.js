/* eslint-disable */

export function generateExercise(text, numBlanks) {
  const parentElement = document.querySelector('.language-javascript');
  const spanElements = parentElement.querySelectorAll('span:not(:empty)');
  const selectedSpanIndices = [];
  while (selectedSpanIndices.length < 3) {
    const index = Math.floor(Math.random() * spanElements.length);
    if (!selectedSpanIndices.includes(index) && spanElements[index].textContent.trim() !== '') {
      selectedSpanIndices.push(index);
    }
  }
  selectedSpanIndices.forEach((index) => {
    const spanElement = spanElements[index];
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    // inputElement.value = spanElement.textContent;
    inputElement.value = '';
    inputElement.style.border = 'none';
    inputElement.style.width = `${spanElement.offsetWidth}px`;
    inputElement.style.backgroundColor = 'lightblue';
    inputElement.style.border = '1px solid';
    inputElement.style.borderRadius = '2px';
    spanElement.parentNode.replaceChild(inputElement, spanElement);
  });
}
