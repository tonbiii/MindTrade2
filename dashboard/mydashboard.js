// Inject Chart.js dynamically, then render the charts
function loadChartJs(callback) {
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
  console.log("🚀 My Dashboard section loaded.");

  // Highlight active nav item
  document.querySelectorAll('.icon_items ul li a').forEach((link) => {
    if (link.getAttribute('data-section') === 'mydashboard') {
      link.style.backgroundColor = '#fff';
      link.style.color = '#000';
    } else {
      link.style.backgroundColor = 'transparent';
      link.style.color = 'inherit';
    }
  });

  // Once Chart.js is loaded, build the charts
  loadChartJs(() => {
    // Pie chart for fund distribution
    const ctxPie = document.getElementById('fundDistributionChart').getContext('2d');
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: [
          'Trading Account',
          'Savings Account',
          'Other Accounts',
          'Planned Withdrawal'
        ],
        datasets: [{
          data: [50320, 15000, 7130, 1000],
          backgroundColor: [
            'rgba(255,255,255,0.8)',
            'rgba(200,200,200,0.6)',
            'rgba(150,150,150,0.4)',
            'rgba(100,100,100,0.2)'
          ],
          borderColor: '#000',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#fff',
              font: {
                family: 'Orbitron, sans-serif'
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutBounce'
        }
      }
    });

    // Sample data for net worth history
    const netWorthData30d = {
      labels: ['2025-05-01', '2025-05-08', '2025-05-15', '2025-05-22', '2025-05-29'],
      datasets: [{
        label: 'Net Worth',
        data: [70000, 70500, 71000, 71500, 72450],
        borderColor: 'rgba(255,255,255,0.8)',
        backgroundColor: 'rgba(255,255,255,0.2)',
        fill: true,
      }]
    };

    const netWorthData7d = {
      labels: ['2025-05-25', '2025-05-26', '2025-05-27', '2025-05-28', '2025-05-29', '2025-05-30', '2025-05-31'],
      datasets: [{
        label: 'Net Worth',
        data: [72000, 72100, 72200, 72300, 72400, 72450, 72450],
        borderColor: 'rgba(255,255,255,0.8)',
        backgroundColor: 'rgba(255,255,255,0.2)',
        fill: true,
      }]
    };

    // Line chart for net worth history
    const ctxLine = document.getElementById('netWorthHistoryChart').getContext('2d');
    const netWorthChart = new Chart(ctxLine, {
      type: 'line',
      data: netWorthData30d,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#fff',
              font: {
                family: 'Orbitron, sans-serif'
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#fff'
            }
          },
          y: {
            ticks: {
              color: '#fff'
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutBounce'
        }
      }
    });

    // Bar chart for account balances
    const accountBalancesData = {
      labels: ['Trading Account', 'Savings Account', 'Other Accounts'],
      datasets: [{
        label: 'Balance',
        data: [50320, 15000, 7130],
        backgroundColor: [
          'rgba(255,255,255,0.8)',
          'rgba(200,200,200,0.6)',
          'rgba(150,150,150,0.4)'
        ],
        borderColor: '#000',
        borderWidth: 1
      }]
    };

    const ctxBar = document.getElementById('accountBalancesChart').getContext('2d');
    new Chart(ctxBar, {
      type: 'bar',
      data: accountBalancesData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff'
            }
          },
          x: {
            ticks: {
              color: '#fff'
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutBounce'
        }
      }
    });

    // Event listener for time period selection
    document.getElementById('timePeriod').addEventListener('change', function() {
      const period = this.value;
      let data;
      if (period === '7d') {
        data = netWorthData7d;
      } else if (period === '30d') {
        data = netWorthData30d;
      } else {
        // For ytd, use 30d for now
        data = netWorthData30d;
      }
      netWorthChart.data.labels = data.labels;
      netWorthChart.data.datasets[0].data = data.datasets[0].data;
      netWorthChart.update();
    });
  });

  // Update the total net worth after 1s to simulate dynamic data
  setTimeout(() => {
    const netWorthAmount = document.querySelector('.total-net-worth .amount');
    if (netWorthAmount) {
      const newUsd = 73200;
      const conversionRate = 130;
      const newKsh = newUsd * conversionRate;
      const formattedUsd = newUsd.toLocaleString('en-US');
      const formattedKsh = newKsh.toLocaleString('en-US');
      netWorthAmount.textContent = `$${formattedUsd} / ${formattedKsh} KSH`;
      console.log(`🔄 Total Net Worth updated to $${formattedUsd} / ${formattedKsh} KSH`);
    }
  }, 1000);
});