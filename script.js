// Проверка кода доступа
document.getElementById('codeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const code = document.getElementById('codeInput').value.trim();
  if (code === '4-2-4') {
    document.getElementById('error').textContent = '';
    document.getElementById('code-section').style.display = 'none';
    document.getElementById('access-section').style.display = 'block';
    playSound();
  } else {
    document.getElementById('error').textContent = 'Неверный код';
  }
});

// Переход к экрану «Сюжет»
document.getElementById('continueBtn').addEventListener('click', function() {
  showScreen('plot-screen');
});

// Переход к экрану «Квест»
document.getElementById('to-quest-btn').addEventListener('click', function() {
  showScreen('quest-screen');
});

// Проверка ответа в квесте
document.getElementById('submitAnswer').addEventListener('click', function() {
  const answer = document.getElementById('answerInput').value.trim().toUpperCase();
  if (answer === 'ANUBIS') {
    document.getElementById('resultMessage').textContent = 'Fragment Reconstructed';
  } else {
    document.getElementById('resultMessage').textContent = 'Неправильный ответ';
  }
});

// Функция плавного показа экрана по ID
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    if (s.id === id) {
      s.classList.add('active');
    } else {
      s.classList.remove('active');
    }
  });
}

// Звуковой эффект при доступе
function playSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.type = 'square';
  oscillator.frequency.value = 440;
  gainNode.gain.value = 0.1;
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.start();
  setTimeout(() => oscillator.stop(), 200);
}
