// Daily Challenge: Solar System
// Create an array of objects for the planets

const solarSystem = [
    {
        name: "Mercury",
        color: "mercury",
        moons: 0,
        diameter: "4,880 km",
        facts: ["Closest to the Sun", "No atmosphere", "Extreme temperatures"]
    },
    {
        name: "Venus",
        color: "venus",
        moons: 0,
        diameter: "12,104 km", 
        facts: ["Hottest planet", "Thick atmosphere", "Rotates backwards"]
    },
    {
        name: "Earth",
        color: "earth",
        moons: 1,
        diameter: "12,742 km",
        facts: ["Only planet with life", "71% water", "Protective atmosphere"]
    },
    {
        name: "Mars",
        color: "mars",
        moons: 2,
        diameter: "6,779 km",
        facts: ["The Red Planet", "Olympus Mons volcano", "Two moons: Phobos & Deimos"]
    },
    {
        name: "Jupiter",
        color: "jupiter", 
        moons: 95,
        diameter: "139,820 km",
        facts: ["Largest planet", "Great Red Spot", "Strong magnetic field"]
    },
    {
        name: "Saturn",
        color: "saturn",
        moons: 146,
        diameter: "116,460 km",
        facts: ["Famous rings", "Least dense", "Hexagonal storm"]
    },
    {
        name: "Uranus",
        color: "uranus",
        moons: 28,
        diameter: "50,724 km",
        facts: ["Rotates on its side", "Ice giant", "Methane atmosphere"]
    },
    {
        name: "Neptune",
        color: "neptune",
        moons: 16,
        diameter: "49,244 km", 
        facts: ["Windiest planet", "Great Dark Spot", "Discovered mathematically"]
    }
];

// Get the section where planets will be placed
const planetsSection = document.querySelector('.listPlanets');

console.log("🚀 Starting Daily Challenge: Solar System");
console.log(`Creating ${solarSystem.length} planets...`);

// For each planet in the array, create a div and append it to the section
solarSystem.forEach((planet, index) => {
    console.log(`Creating planet: ${planet.name}`);
    
    // Create planet container
    const planetContainer = document.createElement('div');
    planetContainer.style.display = 'inline-block';
    planetContainer.style.margin = '15px';
    planetContainer.style.textAlign = 'center';
    
    // Create planet div with class "planet"
    const planetDiv = document.createElement('div');
    planetDiv.className = `planet ${planet.color}`;
    
    // Add planet name
    planetDiv.textContent = planet.name;
    
    // Style the text
    planetDiv.style.display = 'flex';
    planetDiv.style.alignItems = 'center';
    planetDiv.style.justifyContent = 'center';
    planetDiv.style.fontWeight = 'bold';
    
    // BONUS: Create moons for this planet
    createMoons(planetDiv, planet.moons, planet.name);
    
    // Create planet info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'planet-info';
    infoDiv.innerHTML = `
        <div>${planet.moons} moon${planet.moons !== 1 ? 's' : ''}</div>
        <div>${planet.diameter}</div>
    `;
    
    // Add hover effect
    planetDiv.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    planetDiv.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Add click event to show facts
    planetDiv.addEventListener('click', function() {
        showPlanetFacts(planet);
    });
    
    // Add everything to container
    planetContainer.appendChild(planetDiv);
    planetContainer.appendChild(infoDiv);
    planetsSection.appendChild(planetContainer);
});

// BONUS: Function to create moons
function createMoons(planetDiv, moonCount, planetName) {
    // Only create moons if the planet has them
    if (moonCount === 0) return;
    
    console.log(`Creating ${moonCount} moons for ${planetName}`);
    
    // Limit displayed moons for visibility (max 12)
    const moonsToShow = Math.min(moonCount, 12);
    
    for (let i = 0; i < moonsToShow; i++) {
        const moon = document.createElement('div');
        moon.className = 'moon';
        
        // Calculate position in circular orbit
        const angle = (i / moonsToShow) * 2 * Math.PI;
        const orbitRadius = 85; // Distance from planet center
        
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius;
        
        // Position the moon
        moon.style.left = `calc(50% + ${x}px - 12.5px)`; // 12.5px is half of moon width
        moon.style.top = `calc(50% + ${y}px - 12.5px)`;
        
        // Add moon number
        moon.textContent = i + 1;
        
        // Add moon to the planet
        planetDiv.appendChild(moon);
    }
    
    // If we didn't show all moons, add an indicator
    if (moonsToShow < moonCount) {
        const extraIndicator = document.createElement('div');
        extraIndicator.className = 'moon';
        extraIndicator.style.left = 'calc(50% - 12.5px)';
        extraIndicator.style.top = 'calc(50% - 70px)';
        extraIndicator.style.background = 'rgba(255, 255, 255, 0.5)';
        extraIndicator.textContent = `+${moonCount - moonsToShow}`;
        extraIndicator.style.fontSize = '7px';
        planetDiv.appendChild(extraIndicator);
    }
}

// Function to show planet facts
function showPlanetFacts(planet) {
    const factsHTML = `
        <strong>${planet.name} Facts:</strong><br>
        ${planet.facts.map(fact => `• ${fact}`).join('<br>')}
    `;
    
    alert(factsHTML);
}

// Add some animations
function addAnimations() {
    const planets = document.querySelectorAll('.planet');
    
    planets.forEach((planet, index) => {
        // Add slow rotation to planets with moons
        const planetData = solarSystem[index];
        if (planetData.moons > 0) {
            planet.style.animation = `rotate${index} 30s linear infinite`;
            
            // Create rotation keyframes
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rotate${index} {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    });
}

// Initialize animations when page loads
window.addEventListener('load', function() {
    addAnimations();
    console.log('✅ Daily Challenge Completed!');
    console.log('🌌 Solar System Features:');
    console.log('   - 8 planets with different colors');
    console.log('   - Moon systems with orbital display');
    console.log('   - Hover effects and animations');
    console.log('   - Click planets for facts');
    console.log('   - Responsive design');
});

console.log('📝 Instructions Completed:');
console.log('   ✅ Created array of planets (objects)');
console.log('   ✅ Used createElement for planet divs');
console.log('   ✅ Added "planet" class to each div');
console.log('   ✅ Different background colors for each planet');
console.log('   ✅ Appended to section in HTML');
console.log('   ✅ BONUS: Created moon systems');