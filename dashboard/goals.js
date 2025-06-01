// goals.js

document.addEventListener('DOMContentLoaded', function() {
  console.log("✅ Goals & Milestones section loaded.");

  // Highlight active nav item
  document.querySelectorAll('.icon_items ul li a').forEach((link) => {
    if (link.getAttribute('data-section') === 'goals') {
      link.style.backgroundColor = '#fff';
      link.style.color = '#000';
    } else {
      link.style.backgroundColor = 'transparent';
      link.style.color = 'inherit';
    }
  });

  // Example: simulate progress update after 1.5s
  setTimeout(() => {
    // Increase “Launch Mobile App” progress from 45% to 60%
    const goalCards = document.querySelectorAll('.goal-card');
    goalCards.forEach((card) => {
      if (card.querySelector('h2').textContent.includes('Mobile App')) {
        const progBar = card.querySelector('.progress');
        progBar.style.width = '60%';
        card.querySelector('.progress-text').textContent = '60% complete';
        console.log("🔄 Updated 'Launch Mobile App' to 60%");
      }
    });
  }, 1500);
});
