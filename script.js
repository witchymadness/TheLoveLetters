// Function to submit a confession to the backend
async function submitConfession() {
  const to = document.querySelector('.to-text-box').value.trim();
  const message = document.querySelector('.text-box').value.trim();

  // Ensure both fields are filled out before proceeding
  if (!to || !message) {
    alert('Please fill out both fields before sending.');
    return;  // Prevent the form submission if the fields are empty
  }

  try {
    // Send the confession to the backend if everything is okay
    const response = await fetch('https://the-love-letters.vercel.app/api/server.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, message })
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to post confession');
    }

    // Parse the result to get the confession ID
    const result = await response.json();

    // Redirect to the confirmation page with the ID as a URL parameter
    window.location.href = `confirmation.html?id=${result.id}`;
  } catch (error) {
    console.error('Error submitting confession:', error);
    alert('There was an error posting your confession. Please try again later.');
  }
}
