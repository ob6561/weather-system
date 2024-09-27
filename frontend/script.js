const url = 'http://192.168.1.20:5000/data/sensor_data';

// Fetch sensor data from the API
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Data not found (${response.status})`);
    }
    return response.json();
  })
  .then(data => {
    // Extract relevant fields (humidity, light intensity, temperature, timestamp)
    const timestamps = data.map(item => new Date(item.timestamp).toLocaleTimeString());
    const humidity = data.map(item => item.humidity);
    const lightIntensity = data.map(item => item.light_intensity);
    const temperature = data.map(item => item.temperature);

    // Create charts
    createChart('humidityChart', 'Humidity (%) over Time', 'Humidity (%)', timestamps, humidity);
    createChart('lightIntensityChart', 'Light Intensity over Time', 'Light Intensity', timestamps, lightIntensity);
    createChart('temperatureChart', 'Temperature (°C) over Time', 'Temperature (°C)', timestamps, temperature);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Function to create the line chart using Chart.js
function createChart(canvasId, chartTitle, yAxisLabel, labels, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
    type: 'line',  // Line chart for time-series data
    data: {
      labels: labels,
      datasets: [{
        label: yAxisLabel,
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',  // Chart line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Background under the line
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
        tension: 0.1  // Smooth curve
      }]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time',
            color: 'white'  // X-axis label color
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'  // Grid color for x-axis
          }
        },
        y: {
          title: {
            display: true,
            text: yAxisLabel,
            color: 'white'  // Y-axis label color
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'  // Grid color for y-axis
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: chartTitle,
          color: 'white'  // Chart title color
        }
      }
    }
  });
}
