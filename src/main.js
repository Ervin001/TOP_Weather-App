import { API_KEY } from './config.js';
import DisplayUI from './display.js';
import Logic from './logic.js';

const logic = new Logic(API_KEY);
const display = new DisplayUI();

const searchField = document.querySelector('.search');

searchField.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    callApi(searchField.value);
  }
});

function init() {
  callApi('Dallas');
}

init();
