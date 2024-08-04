let timerElement = document.createElement('div');
timerElement.style.position = 'fixed';
timerElement.style.top = '10px';
timerElement.style.right = '10px';
timerElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
timerElement.style.color = 'white';
timerElement.style.padding = '5px 10px';
timerElement.style.borderRadius = '5px';
timerElement.style.zIndex = '9999';
document.body.appendChild(timerElement);

let totalTime = 0;
let timer;

chrome.storage.local.get([location.href], result => {
  totalTime = result[location.href] || 0;
  updateTimer();
  timer = setInterval(updateTimer, 10000);
});

function updateTimer() {
  totalTime += 10;
  let hours = Math.floor(totalTime / 3600);
  let minutes = Math.floor((totalTime % 3600) / 60);
  let seconds = totalTime % 60;
  timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
