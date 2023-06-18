// joke.html
const baseUrl = 'https://api.noroff.dev/api/v1/jokes';

// Get ID from session storage
const jokeId = sessionStorage.getItem('jokeId');

// Fetch details and display 
fetchJokeDetails();

function fetchJokeDetails() {
  const jokeDetailsContainer = document.getElementById('joke-details');

  fetch(`${baseUrl}/${jokeId}`)
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
