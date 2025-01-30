// Function to submit a confession to the backend
async function submitConfession() {
  const to = document.querySelector('.to-text-box').value.trim();
  const message = document.querySelector('.text-box').value.trim();

  if (!to || !message) {
    alert('Please fill out both fields before sending.');
    return;
  }

  try {
    const response = await fetch('https://the-love-letters.vercel.app/api/confessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, message })
    });

    if (!response.ok) throw new Error('Failed to post confession');

    const result = await response.json();
    window.location.href = `confirmation.html?id=${result.id}`;
  } catch (error) {
    console.error('Error submitting confession:', error);
    alert('There was an error posting your confession. Please try again later.');
  }
}

// Function to fetch confessions and display them on the wall
async function fetchConfessions() {
  const confessionsList = document.getElementById('confessionsList');
  confessionsList.innerHTML = '<p>Loading confessions...</p>';

  try {
    const response = await fetch('https://the-love-letters.vercel.app/api/confessions');
    if (!response.ok) throw new Error("Failed to fetch confessions");

    const confessions = await response.json();

    if (!Array.isArray(confessions) || confessions.length === 0) {
      confessionsList.innerHTML = '<p>No confessions to display.</p>';
      return;
    }

    confessionsList.innerHTML = '';
    loadConfessions(confessions);
  } catch (error) {
    console.error('Error fetching confessions:', error);
    confessionsList.innerHTML = '<p>Oops! Unable to load confessions.</p>';
  }
}

// Function to load confessions into the HTML
function loadConfessions(confessions) {
  const confessionsList = document.getElementById('confessionsList');

  confessions.forEach(confession => {
    const confessionElement = document.createElement('div');
    confessionElement.className = 'confession';
    confessionElement.innerHTML = `
      <p><strong>To:</strong> ${confession.to}</p>
      <p>${confession.message}</p>
      <p>${confession.viewed ? 'Viewed' : 'Not Viewed'}</p>
    `;
    confessionsList.appendChild(confessionElement);
  });
}

// Function to copy the confession link to the clipboard
function copyToClipboard() {
  const confessionLink = document.getElementById('confessionLink').href;
  navigator.clipboard.writeText(confessionLink).then(() => {
    alert('URL copied to clipboard!');
  }).catch(err => console.error('Failed to copy:', err));
}

// Function to redirect to the confessions wall
function exitToWall() {
  window.location.href = 'wall.html';
}

// Fetch confessions when the page loads (if applicable)
if (window.location.pathname.includes('wall.html')) {
  window.onload = fetchConfessions;
}
