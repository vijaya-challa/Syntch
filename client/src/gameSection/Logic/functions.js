/* eslint-disable */
export function generateExercise(text, numBlanks) {
  return new Promise((resolve) => {
    const parentElement = document.querySelector('.language-javascript');
    const spanElements = parentElement.querySelectorAll('span:not(:empty)');
    const selectedSpanIndices = [];

    // Store the value of each span element in an array
    const spanValues = [];
    spanElements.forEach((spanElement) => {
      spanValues.push(spanElement.textContent.trim());
    });

    while (selectedSpanIndices.length < numBlanks) {
      const index = Math.floor(Math.random() * spanElements.length);
      if (!selectedSpanIndices.includes(index) && spanElements[index].textContent.trim() !== '') {
        selectedSpanIndices.push(index);
      }
    }

    selectedSpanIndices.forEach((index) => {
      const spanElement = spanElements[index];
      const inputElement = document.createElement('input');
      inputElement.className = 'input generated-input';
      inputElement.type = 'text';
      inputElement.value = '';
      inputElement.style.border = 'none';
      inputElement.style.width = `${spanElement.offsetWidth}px`;
      inputElement.style.border = '1px solid';
      inputElement.style.borderRadius = '2px';
      // Set the value of the input element to the stored value of the span element
      inputElement.dataset.originalValue = spanValues[index];
      console.log('Span:', spanValues[index]);
      spanElement.parentNode.replaceChild(inputElement, spanElement);
    });

    resolve();
  });
}