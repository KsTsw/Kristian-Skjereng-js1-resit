// joke.html
const baseUrl = 'https://api.noroff.dev/api/v1';

// Get joke ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const jokeId = urlParams.get('id');

// Fetch joke details and display them
fetchJokeDetails();

function fetchJokeDetails() {
  const jokeDetailsContainer = document.getElementById('joke-details');

  fetch(`${baseUrl}/jokes/${jokeId}`)
    .then(response => response.json())
    .then(data => {
      const { type, setup, punchline } = data;

      const jokeDetails = document.createElement('div');
      jokeDetails.innerHTML = `
        <p>Type: ${type}</p>
        <p>Setup: ${setup}</p>
        <p id="punchline">Punchline: [Hidden]</p>
        <button id="reveal-btn">Reveal Punchline</button>
      `;
      jokeDetailsContainer.appendChild(jokeDetails);

      const revealButton = document.getElementById('reveal-btn');
      const punchlineElement = document.getElementById('punchline');
      revealButton.addEventListener('click', () => {
        punchlineElement.textContent = `Punchline: ${punchline}`;
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
