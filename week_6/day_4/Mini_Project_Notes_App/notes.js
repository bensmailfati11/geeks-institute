const fs = require('fs');

/**
 * Fetch all notes from the JSON file
 * @returns {Array} Array of note objects
 */
const fetchNotes = () => {
    try {
        const notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        // If file doesn't exist or is empty, return empty array
        return [];
    }
};

/**
 * Save notes to the JSON file
 * @param {Array} notes - Array of note objects to save
 */
const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes, null, 2));
};

/**
 * Add a new note
 * @param {string} title - The title of the note
 * @param {string} body - The body content of the note
 * @returns {Object} The newly added note
 */
const addNote = (title, body) => {
    const notes = fetchNotes();
    const note = {
        title,
        body
    };

    // Check if note with same title already exists
    const duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

/**
 * Get all notes
 * @returns {Array} Array of all notes
 */
const getAll = () => {
    return fetchNotes();
};

/**
 * Get a specific note by title
 * @param {string} title - The title of the note to retrieve
 * @returns {Object|undefined} The note object or undefined if not found
 */
const getNote = (title) => {
    const notes = fetchNotes();
    return notes.find((note) => note.title === title);
};

/**
 * Remove a note by title
 * @param {string} title - The title of the note to remove
 * @returns {boolean} True if note was removed, false otherwise
 */
const removeNote = (title) => {
    const notes = fetchNotes();
    const filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    // Return true if a note was actually removed
    return notes.length !== filteredNotes.length;
};

/**
 * Log a note to the console
 * @param {Object} note - The note object to log
 */
const logNote = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
