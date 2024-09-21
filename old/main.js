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
displayedImg.src = images[currentIndex];

let video;

// Classifier Variable
let classifier;

// Video
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  console.log("Preload called");
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  console.log("Setup called");

  createCanvas(320, 180);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 180);
  video.hide();

  // flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

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

  // flippedVideo = ml5.flipImage(video)
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
  // The results are in an array ordered by confidence.
  // Classify again with a small delay
}

function next() {
  currentIndex += 1;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  displayedImg.src = images[currentIndex];
}

function previous() {
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  displayedImg.src = images[currentIndex];
}

let canChange = false; // Defines whether image can be changed or not
let intervalID = setInterval(() => {
  canChange = true;
}, 1000);
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
