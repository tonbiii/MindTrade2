// performance.js

function loadChartJsPerf(callback) {
  if (window.Chart) {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = callback;
  document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("✅ Performance Metrics section loaded.");

  // Highlight active nav item
  document.querySelectorAll('.icon_items ul li a').forEach((link) => {
    if (link.getAttribute('data-section') === 'performance') {
      link.style.backgroundColor = '#fff';
      link.style.color = '#000';
    } else {
      link.style.backgroundColor = 'transparent';
      link.style.color = 'inherit';
    }
  });

  // Render equity curve line chart
  loadChartJsPerf(() => {
    const ctx = document.getElementById('equityCurveChart').getContext('2d');

    // Mock data for the last 30 days
    const labels = [];
    for (let i = 30; i >= 1; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      labels.push(
        `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`
      );
    }
    const dataPoints = [];
    let base = 45000;
    for (let i = 0; i < 30; i++) {
      base += (Math.random() - 0.4) * 500; // random walk
      dataPoints.push(Math.max(40000, Math.round(base)));
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Equity ($)',
          data: dataPoints,
          borderColor: '#fff',
          backgroundColor: 'rgba(255,255,255,0.2)',
          tension: 0.3,
          pointRadius: 2,
          pointBackgroundColor: '#fff'
        }]
      },
      options: {
        scales: {
          x: {
            ticks: { color: '#ccc', maxTicksLimit: 7 },
            grid: { color: 'rgba(255,255,255,0.1)' }
          },
          y: {
            ticks: { color: '#ccc' },
            grid: { color: 'rgba(255,255,255,0.1)' }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#fff',
              font: { family: 'Orbitron, sans-serif' }
            }
          }
        }
      }
    });
  });
});
