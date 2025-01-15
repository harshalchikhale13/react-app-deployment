let words = [];
let currentWordIndex = 0;
let speed = 500; 
let intervalId;

const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, )));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


function startReading() {
    const textInput = document.getElementById("textInput").value;
    const speedInput = document.getElementById("speedInput").value;
    speed = 1000 / speedInput; 
    words = textInput.split(/\s+/); 
    currentWordIndex = 0;

    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(displayWord, speed);
}

function displayWord() {
    const readingDashboard = document.getElementById("readingDashboard");

    if (currentWordIndex < words.length) {
        readingDashboard.textContent = words[currentWordIndex];
        currentWordIndex++;
    } else {
        clearInterval(intervalId); 
    }
}

function stopReading() {
    clearInterval(intervalId);
}

function reset() {
    clearInterval(intervalId); 
    document.getElementById("readingDashboard").textContent = ""; 
    currentWordIndex = 0; 
    words = []; 
    document.getElementById("textInput").value = ""; 
    document.getElementById("speedInput").value = 2; 
}
