function submitConfession() {
  const uniqueId = Date.now(); // Generate a unique identifier
  window.location.href = `confirmation.html?id=${uniqueId}`;
}
