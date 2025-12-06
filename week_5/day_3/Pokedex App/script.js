const randomButton = document.getElementById('random-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const pokemonImage = document.getElementById('pokemon-image');
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonHeight = document.getElementById('pokemon-height');
const pokemonWeight = document.getElementById('pokemon-weight');
const pokemonType = document.getElementById('pokemon-type');

let currentPokemonId = null;

const fetchPokemon = async (id) => {
    loadingMessage.style.display = 'block';
    pokemonImage.style.display = 'none';
    errorMessage.style.display = 'none';

    try {
        const response = await fetch(`pokeapi.co{id}`);
        if (!response.ok) {
            throw new Error('Pokémon non disponible');
        }
        const data = await response.json();
        displayPokemon(data);
        currentPokemonId = data.id;
    } catch (error) {
        errorMessage.style.display = 'block';
        loadingMessage.style.display = 'none';
    }
};

const displayPokemon = (data) => {
    pokemonImage.src = data.sprites.front_default;
    pokemonImage.alt = data.name;
    pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    pokemonId.textContent = data.id;
    pokemonHeight.textContent = data.height * 10; // Convert dm to cm
    pokemonWeight.textContent = data.weight / 10; // Convert hg to kg
    pokemonType.textContent = data.types.map(typeInfo => typeInfo.type.name).join(', ');

    loadingMessage.style.display = 'none';
    pokemonImage.style.display = 'block';
};

const fetchRandomPokemon = () => {
    // There are about 1000 visible Pokémon in the API currently
    const randomId = Math.floor(Math.random() * 1000) + 1; 
    fetchPokemon(randomId);
};

const fetchNextPokemon = () => {
    if (currentPokemonId) {
        fetchPokemon(currentPokemonId + 1);
    }
};

const fetchPrevPokemon = () => {
    if (currentPokemonId && currentPokemonId > 1) {
        fetchPokemon(currentPokemonId - 1);
    }
};

randomButton.addEventListener('click', fetchRandomPokemon);
nextButton.addEventListener('click', fetchNextPokemon);
prevButton.addEventListener('click', fetchPrevPokemon);

// Load an initial random Pokémon when the page loads
fetchRandomPokemon();
