// Exercise 1 : Video class and watch method
console.log("=== Exercise 1: Video class and watch method ===");

class Video {
    constructor(title, uploader, time) {
        this.title = title;
        this.uploader = uploader;
        this.time = time;
    }

    watch() {
        return `${this.uploader} watched all ${this.time} seconds of ${this.title}!`;
    }
}

// Instantiate two Video objects
const video1 = new Video("Learn JavaScript", "Alice", 300);
const video2 = new Video("CSS Basics", "Bob", 180);

// Exercise 2 : Multiple videos with array
console.log("=== Exercise 2: Multiple videos array ===");

const videoData = [
    { title: "JS Tutorial", uploader: "Alice", time: 200 },
    { title: "CSS Tutorial", uploader: "Bob", time: 180 },
    { title: "HTML Tutorial", uploader: "Charlie", time: 220 },
    { title: "React Basics", uploader: "Dana", time: 300 },
    { title: "Node.js Guide", uploader: "Eve", time: 250 }
];

// Instantiate Video objects from array
const videos = videoData.map(data => new Video(data.title, data.uploader, data.time));

// Collect all watch messages in one array
const allMessages = [video1, video2, ...videos].map(video => video.watch());

// Final console.log to test all
console.log(allMessages);
