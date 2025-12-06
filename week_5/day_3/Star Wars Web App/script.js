const fetchBtn = document.getElementById('fetch-btn');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const characterInfo = document.getElementById('character-info');
const nameEl = document.getElementById('name');
const heightEl = document.getElementById('height');
const genderEl = document.getElementById('gender');
const birthYearEl = document.getElementById('birth-year');
const homeWorldEl = document.getElementById('home-world');

fetchBtn.addEventListener('click', fetchRandomCharacter);

async function fetchRandomCharacter() {
    // Hide character info and error, show loading
    characterInfo.classList.add('hidden');
    errorDiv.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        // Generate random ID (1-83)
        const randomId = Math.floor(Math.random() * 83) + 1;
        const response = await fetch(`https://www.swapi.tech/api/people/${randomId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch character');
        }
        const data = await response.json();
        const character = data.result.properties;

        // Fetch homeworld
        const homeworldResponse = await fetch(character.homeworld);
        if (!homeworldResponse.ok) {
            throw new Error('Failed to fetch homeworld');
        }
        const homeworldData = await homeworldResponse.json();
        const homeworldName = homeworldData.result.properties.name;

        // Update DOM
        nameEl.textContent = character.name;
        heightEl.textContent = character.height;
        genderEl.textContent = character.gender;
        birthYearEl.textContent = character.birth_year;
        homeWorldEl.textContent = homeworldName;

        // Hide loading, show character info
        loading.classList.add('hidden');
        characterInfo.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        // Hide loading, show error
        loading.classList.add('hidden');
        errorDiv.classList.remove('hidden');
    }
}
