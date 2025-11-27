// Daily Challenge: Gifs
// Use Giphy API Random documentation. API Key: hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My

const apiKey = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
const fetchGifBtn = document.getElementById('fetch-gif');
const deleteAllBtn = document.getElementById('delete-all');
const gifContainer = document.getElementById('gif-container');
const categoryInput = document.getElementById('category-input');

fetchGifBtn.addEventListener('click', async () => {
  const category = categoryInput.value.trim();
  if (!category) {
    alert('Please enter a category');
    return;
  }

  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${category}&rating=g`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const gifUrl = data.data.images.fixed_height.url;

    // Create gif element with delete button
    const gifDiv = document.createElement('div');
    gifDiv.className = 'gif-item';
    const img = document.createElement('img');
    img.src = gifUrl;
    img.alt = category;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'DELETE';
    deleteBtn.addEventListener('click', () => {
      gifContainer.removeChild(gifDiv);
    });

    gifDiv.appendChild(img);
    gifDiv.appendChild(deleteBtn);
    gifContainer.appendChild(gifDiv);

    categoryInput.value = ''; // Clear input
  } catch (error) {
    console.error('Error fetching GIF:', error);
    alert('Failed to fetch GIF. Please try again.');
  }
});

deleteAllBtn.addEventListener('click', () => {
  gifContainer.innerHTML = '';
});
