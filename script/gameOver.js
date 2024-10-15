function togglePopup() {
  let popup = document.querySelector("#bouton");
  popup.classList.toggle("open");
}

function togglePopup() {
  let popup2 = document.querySelector("#bouton4");
  popup2.classList.toggle("active");
}

const openPopupButton = document.getElementById("openPopup");
const popup = document.getElementById("popup");

openPopupButton.addEventListener("click", () => {
  popup.style.display = "block";
});

function chooseOption(option) {
  document.getElementById("popup").addEventListener("click", function () {
    const video = document.getElementById("videoPlayer");
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
}
chooseOption("Option1");
function closePopup() {
  popup.style.display = "none";
}
