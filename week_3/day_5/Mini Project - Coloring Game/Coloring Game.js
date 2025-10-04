// =============================================
// COLORING GAME


console.log("🎨 Coloring Game - JavaScript Loaded!");

const coloringGame = {
    // Game state
    currentColor: '#4285f4',
    isDrawing: false,
    isErasing: false,
    isRainbow: false,
    coloredPixels: 0,
    totalPixels: 256,

    // Color palette
    colors: [
        { name: 'Red', value: '#ea4335' },
        { name: 'Blue', value: '#4285f4' },
        { name: 'Green', value: '#34a853' },
        { name: 'Yellow', value: '#fbbc05' },
        { name: 'Purple', value: '#9c27b0' },
        { name: 'Orange', value: '#ff9800' },
        { name: 'Pink', value: '#e91e63' },
        { name: 'Teal', value: '#009688' },
        { name: 'Black', value: '#2c3e50' }
    ],

    // Rainbow colors for rainbow mode
    rainbowColors: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'],

    // Initialize the game
    init: function() {
        console.log("🚀 Initializing Coloring Game...");
        
        this.createColorPalette();
        this.createCanvas();
        this.setupEventListeners();
        this.updateDisplay();
        
        console.log("✅ Coloring Game initialized successfully!");
        console.log("🎯 Features: 16x16 grid, Color palette, Drawing, Erasing, Rainbow mode");
    },

    // Create color palette
    createColorPalette: function() {
        const colorsGrid = document.getElementById('colorsGrid');
        
        this.colors.forEach((color, index) => {
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option';
            colorOption.style.backgroundColor = color.value;
            colorOption.dataset.color = color.value;
            colorOption.dataset.name = color.name;
            
            // Select first color by default
            if (index === 1) { // Blue is default
                colorOption.classList.add('selected');
            }
            
            colorOption.addEventListener('click', () => {
                this.selectColor(color.value, color.name);
            });
            
            colorsGrid.appendChild(colorOption);
        });
        
        console.log("🎨 Color palette created with", this.colors.length, "colors");
    },

    // Create 16x16 canvas grid
    createCanvas: function() {
        const canvasGrid = document.getElementById('canvasGrid');
        
        for (let i = 0; i < this.totalPixels; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.dataset.index = i;
            
            // Mouse events for drawing
            pixel.addEventListener('mousedown', (e) => {
                this.startDrawing(e);
                this.colorPixel(pixel);
            });
            
            pixel.addEventListener('mouseover', (e) => {
                if (this.isDrawing) {
                    this.colorPixel(pixel);
                }
            });
            
            canvasGrid.appendChild(pixel);
        }
        
        console.log("🖼️ 16x16 canvas created with", this.totalPixels, "pixels");
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Mouse events for continuous drawing
        document.addEventListener('mousedown', () => {
            this.startDrawing();
        });
        
        document.addEventListener('mouseup', () => {
            this.stopDrawing();
        });
        
        document.addEventListener('mouseleave', () => {
            this.stopDrawing();
        });
        
        // Color picker
        const colorPicker = document.getElementById('colorPicker');
        colorPicker.addEventListener('input', (e) => {
            this.selectColor(e.target.value, 'Custom');
        });
        
        // Prevent drag and drop
        document.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
        
        console.log("🎯 Event listeners setup completed");
    },

    // Start drawing
    startDrawing: function(event) {
        this.isDrawing = true;
        this.updateModeIndicator();
        
        if (event) {
            this.colorPixel(event.target);
        }
        
        console.log("✏️ Drawing started");
    },

    // Stop drawing
    stopDrawing: function() {
        this.isDrawing = false;
        this.updateModeIndicator();
        console.log("🛑 Drawing stopped");
    },

    // Color a single pixel
    colorPixel: function(pixel) {
        if (!this.isDrawing) return;
        
        const previousColor = pixel.style.backgroundColor;
        
        if (this.isErasing) {
            // Erase the pixel
            pixel.style.backgroundColor = '';
            pixel.classList.remove('colored');
            
            // Update statistics if we're removing color
            if (previousColor) {
                this.coloredPixels--;
            }
        } else {
            // Color the pixel
            let colorToUse = this.currentColor;
            
            if (this.isRainbow) {
                colorToUse = this.getRandomRainbowColor();
            }
            
            pixel.style.backgroundColor = colorToUse;
            pixel.classList.add('colored');
            
            // Update statistics if we're adding new color
            if (!previousColor) {
                this.coloredPixels++;
            }
        }
        
        this.updateStatistics();
    },

    // Select a color
    selectColor: function(color, name) {
        this.currentColor = color;
        this.isErasing = false;
        this.isRainbow = false;
        
        // Update selected color in palette
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        const selectedOption = document.querySelector(`[data-color="${color}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
        
        // Update display
        document.getElementById('currentColorDisplay').style.backgroundColor = color;
        document.getElementById('currentColorName').textContent = name;
        
        this.updateModeIndicator();
        
        console.log(`🎨 Color selected: ${name} (${color})`);
    },

    // Toggle eraser mode
    toggleEraser: function() {
        this.isErasing = !this.isErasing;
        this.isRainbow = false;
        this.updateModeIndicator();
        
        console.log(`✏️ Eraser mode: ${this.isErasing ? 'ON' : 'OFF'}`);
    },

    // Toggle rainbow mode
    toggleRainbow: function() {
        this.isRainbow = !this.isRainbow;
        this.isErasing = false;
        this.updateModeIndicator();
        
        console.log(`🌈 Rainbow mode: ${this.isRainbow ? 'ON' : 'OFF'}`);
    },

    // Get random rainbow color
    getRandomRainbowColor: function() {
        const randomIndex = Math.floor(Math.random() * this.rainbowColors.length);
        return this.rainbowColors[randomIndex];
    },

    // Clear the entire canvas
    clearCanvas: function() {
        const pixels = document.querySelectorAll('.pixel');
        pixels.forEach(pixel => {
            pixel.style.backgroundColor = '';
            pixel.classList.remove('colored');
        });
        
        this.coloredPixels = 0;
        this.updateStatistics();
        
        console.log("🗑️ Canvas cleared");
    },

    // Fill canvas with random colors
    fillRandom: function() {
        const pixels = document.querySelectorAll('.pixel');
        let newlyColored = 0;
        
        pixels.forEach(pixel => {
            if (!pixel.style.backgroundColor) {
                pixel.style.backgroundColor = this.getRandomRainbowColor();
                pixel.classList.add('colored');
                newlyColored++;
            }
        });
        
        this.coloredPixels += newlyColored;
        this.updateStatistics();
        
        console.log(`🎲 Filled ${newlyColored} pixels with random colors`);
    },

    // Update mode indicator
    updateModeIndicator: function() {
        const indicator = document.getElementById('modeIndicator');
        
        if (this.isErasing) {
            indicator.textContent = 'Eraser Mode - Click and drag to erase ✏️';
            indicator.className = 'mode-indicator erasing';
        } else if (this.isRainbow) {
            indicator.textContent = 'Rainbow Mode - Every pixel gets a random color! 🌈';
            indicator.className = 'mode-indicator drawing';
        } else if (this.isDrawing) {
            indicator.textContent = 'Drawing Mode - Click and drag to draw 🎨';
            indicator.className = 'mode-indicator drawing';
        } else {
            indicator.textContent = 'Ready to draw! Select a color and start coloring 🎨';
            indicator.className = 'mode-indicator';
        }
    },

    // Update statistics and display
    updateStatistics: function() {
        document.getElementById('coloredPixels').textContent = this.coloredPixels;
        
        const completion = Math.round((this.coloredPixels / this.totalPixels) * 100);
        document.getElementById('completion').textContent = completion + '%';
    },

    // Update all displays
    updateDisplay: function() {
        this.updateModeIndicator();
        this.updateStatistics();
        
        // Set initial color display
        document.getElementById('currentColorDisplay').style.backgroundColor = this.currentColor;
    }
};

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    coloringGame.init();
    
    console.log("\n🎮 Game Controls:");
    console.log("   • Click and drag to draw");
    console.log("   • Select colors from palette");
    console.log("   • Use eraser to remove color");
    console.log("   • Rainbow mode for random colors");
    console.log("   • Clear button to reset canvas");
    
    console.log("\n🖼️ Canvas Info:");
    console.log("   • 16x16 grid (256 pixels)");
    console.log("   • Real-time statistics");
    console.log("   • Smooth drawing experience");
});

// Make the game globally available
window.coloringGame = coloringGame;