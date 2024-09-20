let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let startBtn = document.getElementById("startBtn");
let webcam = document.getElementById("webcam");

// Image Slider
next.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").appendChild(items[0]);
});

prev.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").prepend(items[items.length - 1]);
});

// Start Webcam Feed
startBtn.addEventListener("click", function () {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      webcam.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Error accessing the webcam:", error);
    });
});
