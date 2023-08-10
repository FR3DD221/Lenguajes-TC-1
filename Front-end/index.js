const getID = document.getElementById("entrada");
const btnPlay = document.getElementById("playBTN");

btnPlay.addEventListener("click", function () {
  if (getID.value.length === 0) {
    alert();
  } else {
    window.location.href = "game.html";
  };
});
