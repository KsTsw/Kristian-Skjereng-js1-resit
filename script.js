// index.html
const baseUrl = 'https://api.noroff.dev/api/v1';
let allJokes = []; // Store all jokes initially

// Fetch jokes / display setup / type
fetchJokes();

function fetchJokes() {
  const jokesContainer = document.getElementById('jokes-container');
  jokesContainer.innerHTML = '';

  fetch(`${baseUrl}/jokes`)
    .then(response => response.json())
    .then(data => {
      allJokes = data; // Store all jokes in the allJokes variable
      displayJokes(allJokes); // Display all jokes initially
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Display jokes in jokesContainer
function displayJokes(jokes) {
  const jokesContainer = document.getElementById('jokes-container');
  jokesContainer.innerHTML = '';

  jokes.forEach(joke => {
    const { setup, type, id } = joke;
    const jokeElement = document.createElement('div');
    jokeElement.innerHTML = `<p>${setup} (${type})</p>`;
    const punchlineLink = document.createElement('a');
    punchlineLink.href = `joke.html?id=${id}`; // Add ID to URL
    punchlineLink.textContent = 'View Punchline';
    punchlineLink.addEventListener('click', () => {
      sessionStorage.setItem('jokeId', id); // Store ID in session storage
    });
    jokeElement.appendChild(punchlineLink);
    jokesContainer.appendChild(jokeElement);
  });
}

// Filter (General or Programming)
const filterGeneralBtn = document.getElementById('filter-general');
const filterProgrammingBtn = document.getElementById('filter-programming');

filterGeneralBtn.addEventListener('click', () => {
  filterJokes('general');
});

filterProgrammingBtn.addEventListener('click', () => {
  filterJokes('programming');
});

function filterJokes(type) {
  const filteredJokes = allJokes.filter(joke => joke.type === type);
  displayJokes(filteredJokes);
}
