// ─────────────────────────────────────────────────────────────────────────
// dashboard.js (UPDATED)
// ─────────────────────────────────────────────────────────────────────────

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  const sidenav = document.querySelector('.sidenav');
  const contentDiv = document.getElementById('content');

  // 1) Hover to expand/collapse the sidebar exactly as before:
  sidenav.addEventListener('mouseenter', () => {
    sidenav.classList.remove('collapsed');
    // (We leave .content's left:80px so that expanded sidebar overlays .content)
  });
  sidenav.addEventListener('mouseleave', () => {
    sidenav.classList.add('collapsed');
  });

  // 2) Logout link behavior (unchanged):
  const logoutLink = document.querySelector('.icon_items ul li a[href="../index.html"]');
  if (logoutLink) {
    logoutLink.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = '../index.html';
    });
  }

  // 3) SECTION‐LOADING LOGIC:
  //    Each <a data-section="SECTION_NAME"> will load:
  //       SECTION_NAME.html  → inject into #content
  //       SECTION_NAME.css   → <link> in <head>
  //       SECTION_NAME.js    → <script> at end of <body>
  //
  //    We keep at most one <link id="section-css"> and one <script id="section-js"> at a time.
  //    If you click a different section, the old <link>/<script> get removed.

  // Helper: remove existing section <link> or <script>
  function removeExistingSectionAssets() {
    const oldLink = document.getElementById('section-css');
    if (oldLink) oldLink.remove();
    const oldScript = document.getElementById('section-js');
    if (oldScript) oldScript.remove();
  }

  // Helper: dynamically add <link rel="stylesheet" id="section-css" href="…">
  function addSectionCSS(filename) {
    const head = document.querySelector('head');
    const linkTag = document.createElement('link');
    linkTag.id = 'section-css';
    linkTag.rel = 'stylesheet';
    linkTag.href = filename;
    head.appendChild(linkTag);
  }

  // Helper: dynamically add <script id="section-js" src="…"></script>
  function addSectionJS(filename) {
    const scriptTag = document.createElement('script');
    scriptTag.id = 'section-js';
    scriptTag.src = filename;
    document.body.appendChild(scriptTag);
  }

  // Main loader: given a section like "mydashboard", fetch its HTML and insert
  function loadSection(sectionName) {
    const htmlFile = `${sectionName}.html`;
    const cssFile  = `${sectionName}.css`;
    const jsFile   = `${sectionName}.js`;

    // 1) Remove any old CSS/JS belonging to a previous section
    removeExistingSectionAssets();

    // 2) Load the new CSS first (so styling is applied as soon as possible)
    addSectionCSS(cssFile);

    // 3) Fetch the HTML and inject
    fetch(htmlFile)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not fetch ${htmlFile}`);
        return response.text();
      })
      .then((htmlContent) => {
        contentDiv.innerHTML = htmlContent;
        // 4) After HTML is in place, load the section’s JS
        addSectionJS(jsFile);
      })
      .catch((err) => {
        console.error(err);
        contentDiv.innerHTML = `<p style="color:red;">
          Failed to load section “${sectionName}”.<br/>
          Verify that <code>${htmlFile}</code> exists.
        </p>`;
      });
  }

  // Attach click‐listeners to each sidebar‐link that has data-section="…"
  document.querySelectorAll('.icon_items ul li a[data-section]').forEach((linkEl) => {
    linkEl.addEventListener('click', function(event) {
      event.preventDefault();
      const sectionName = linkEl.getAttribute('data-section');
      loadSection(sectionName);
    });
  });

  // OPTIONAL: Auto‐load “mydashboard” on first page load
  loadSection('mydashboard');
});
