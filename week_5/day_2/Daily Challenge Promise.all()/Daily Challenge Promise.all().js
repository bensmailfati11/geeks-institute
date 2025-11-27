// Daily Challenge: Promise.all()
// Fetch sunrise times for two cities using Promise.all()

const getSunriseBtn = document.getElementById('get-sunrise');
const resultsDiv = document.getElementById('results');

getSunriseBtn.addEventListener('click', async () => {
  const lat1 = document.getElementById('lat1').value;
  const lng1 = document.getElementById('lng1').value;
  const lat2 = document.getElementById('lat2').value;
  const lng2 = document.getElementById('lng2').value;

  if (!lat1 || !lng1 || !lat2 || !lng2) {
    alert('Please fill in all fields');
    return;
  }

  try {
    // Create promises for both API calls
    const promise1 = fetch(`https://api.sunrise-sunset.org/json?lat=${lat1}&lng=${lng1}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });

    const promise2 = fetch(`https://api.sunrise-sunset.org/json?lat=${lat2}&lng=${lng2}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      });

    // Use Promise.all to wait for both promises to resolve
    const [data1, data2] = await Promise.all([promise1, promise2]);

    // Display the sunrise times
    resultsDiv.innerHTML = `
      <h3>Sunrise Times</h3>
      <p>City 1 (Lat: ${lat1}, Lng: ${lng1}): ${data1.results.sunrise}</p>
      <p>City 2 (Lat: ${lat2}, Lng: ${lng2}): ${data2.results.sunrise}</p>
    `;
  } catch (error) {
    console.error('Error fetching sunrise data:', error);
    resultsDiv.innerHTML = '<p>Error fetching sunrise data. Please try again.</p>';
  }
});
