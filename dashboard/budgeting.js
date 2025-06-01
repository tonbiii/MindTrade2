// budgeting.js

function loadChartJsBudget(callback) {
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
  console.log("✅ Budgeting section loaded.");

  // Highlight active nav item
  document.querySelectorAll('.icon_items ul li a').forEach((link) => {
    if (link.getAttribute('data-section') === 'budgeting') {
      link.style.backgroundColor = '#fff';
      link.style.color = '#000';
    } else {
      link.style.backgroundColor = 'transparent';
      link.style.color = 'inherit';
    }
  });

  // Render the budget vs spent bar chart
  loadChartJsBudget(() => {
    const ctx = document.getElementById('budgetBarChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Marketing', 'Development', 'Operations', 'Risk Management'],
        datasets: [
          {
            label: 'Budget',
            data: [5000, 8000, 2500, 3000],
            backgroundColor: 'rgba(255,255,255,0.4)',
            borderColor: '#fff',
            borderWidth: 1
          },
          {
            label: 'Spent',
            data: [3200, 6450, 1700, 1200],
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderColor: '#fff',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          x: {
            ticks: { color: '#ccc', font: { family: 'Orbitron, sans-serif' } },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#ccc', beginAtZero: true },
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
