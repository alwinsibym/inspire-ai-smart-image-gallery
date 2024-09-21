let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");
let startBtn = document.getElementById("startBtn");
let webcam = document.getElementById("webcam");

// Image Slider
nextBtn.addEventListener("click", function () {
  updateImage("right");
});

prevBtn.addEventListener("click", function () {
  updateImage("left");
});

let canChange = false; // Defines whether image can be changed or not
let intervalID = setInterval(() => {
  canChange = true;
}, 3000);

function updateImage(ctx) {
  let controller;
  if (controller != ctx && canChange == true) {
    console.log("updating image with: ", ctx);
    switch (ctx) {
      case "left": {
        previous();
        canChange = false;
        break;
      }
      case "right": {
        next();
        canChange = false;
        break;
      }

      default: {
        console.log("Nothing to change");
        canChange = false;
      }
    }
  }
}

function previous() {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").prepend(items[items.length - 1]);
}

function next() {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").appendChild(items[0]);
}

// Script for AI automation

console.log("Dom Content loaded");
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/zhDnwEapI/";

let gesture = document.getElementById("gesture");

let images = [
  "../images/dog-1.jpeg",
  "../images/dog-2.jpg",
  "../images/dog-3.jpeg",
  "../images/dog-4.jpg",
  "../images/dog-5.jpg",
];

let displayedImg = document.getElementById("displayed-img");
let gestureText = document.getElementById("gesture-text"); // Element to display the detected gesture
let currentIndex = 0;

let video;

// Classifier Variable
let classifier;

function initializeAutmation() {}

// Load the model first
function preload() {
  console.log("Preload called");
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

// Creates canvas and initializes the application
function setup() {
  console.log("Setup called");

  console.log("Creating Video Canvas");
  let ratio = [16 * 13, 9 * 13];
  createCanvas(ratio[0], ratio[1]);
  // Create the video
  video = createCapture(VIDEO);
  video.size(ratio[0], ratio[1]);
  video.hide();

  // Start classifying
  classifyVideo();
}

let label;

// Main draw loop. Draws video captured from the webcam to canvas element and classifies video accoringly. Its an endless loop
function draw() {
  // console.log("Draw called");

  background(0);
  // Draw the video
  image(video, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  // console.log("Classify video called");
  classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    // console.error(error[0].label);
    gesture.innerHTML = error[0].label.toUpperCase();
    updateImage(error[0].label);
  }
}
