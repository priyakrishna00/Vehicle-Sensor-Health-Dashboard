const modeToggle = document.getElementById('modeToggle');
modeToggle.onclick = () => {
  document.body.classList.toggle('dark');
  modeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
};

function simulateData() {
  const engineTemp = Math.floor(Math.random() * 60 + 40);
  const battery = Math.floor(Math.random() * 60 + 40);
  const brakes = Math.floor(Math.random() * 60 + 30);

  updateSensor('engine', engineTemp, '°C');
  updateSensor('battery', battery, '%');
  updateSensor('brakes', brakes, '%');

  updateChart(engineTemp, battery, brakes);
}

function updateSensor(id, value, unit) {
  const val = document.querySelector(`#${id} .value`);
  const status = document.querySelector(`#${id} .status`);
  val.textContent = `${value} ${unit}`;
  if (value < 50) {
    status.textContent = 'Status: Good';
    status.style.color = 'green';
  } else if (value < 70) {
    status.textContent = 'Status: Warning';
    status.style.color = 'orange';
  } else {
    status.textContent = 'Status: Critical';
    status.style.color = 'red';
  }
}

function downloadCSV() {
  const csv = `Sensor,Value,Unit\nEngine Temp,${document.querySelector('#engine .value').textContent}\nBattery,${document.querySelector('#battery .value').textContent}\nBrakes,${document.querySelector('#brakes .value').textContent}`;
  const blob = new Blob([csv], {type: 'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sensor_data.csv';
  a.click();
}

function sendAlert() {
  alert("Mock email alert triggered! (No real email sent)");
}

let chart = null;
function updateChart(a, b, c) {
  const ctx = document.getElementById('sensorChart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Engine Temp', 'Battery', 'Brakes'],
      datasets: [{
        label: 'Sensor Health',
        data: [a, b, c],
        backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350'],
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
}
