let pin = '';

function addDigit(digit) {
  if (pin.length < 4) {
    pin += digit;
    updatePinDisplay();
    if (pin.length === 4) {
      checkPIN();
    }
  }
}


function updatePinDisplay() {
  const pinDigits = document.querySelectorAll('.pinDigit');
  pinDigits.forEach((digit, index) => {
    if (index < pin.length) {
      digit.classList.add('filled');
    } else {
      digit.classList.remove('filled');
    }
  });
}

function checkPIN() {
  if (pin === '7878') {
    window.location.href = 'https://over1cloud.github.io/mira.github.io/';
  } else {
    shakeDigits(); // Добавляем вызов функции для тряски кружков
    pin = '';
    updatePinDisplay();
  }
}

function shakeDigits() {
  const pinDigits = document.querySelectorAll('.pinDigit');
  pinDigits.forEach(digit => {
    digit.classList.add('shake'); // Добавляем класс shake
    setTimeout(() => {
      digit.classList.remove('shake');
    }, 500);
  });
}

