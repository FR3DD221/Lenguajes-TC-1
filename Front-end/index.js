//Pantalla de logueo
const getID = document.getElementById("entrada");
const btnPlay = document.getElementById("playBTN");
const logo = document.getElementById("logo");
const modal1 = document.getElementById("errorID");
const modal2 = document.getElementById("wrongAns");
const modal3 = document.getElementById("assertAns");

//Pantalla de juego
const playerLabel = document.getElementById("playerName");
const questionLabel = document.getElementById("questions");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");

//datos del back
let jsonQuestions;
let actualQuestion = 0;
let misses = 0;
let asserts = 0;

//Petición de los datos al back
fetch("http://localhost:3001/api/data")
  .then((res) => res.json())
  .then((data) => setJsonQS(data));

//Guardando los datos solicitados
function setJsonQS(data) {
  jsonQuestions = data;
}

//Funcionalidad de los componentes del HTML
btnPlay.addEventListener("click", function () {
  if (getID.value.length === 0) {
    modal1.showModal();
  } else {
    btnPlay.style.display = "none";
    logo.style.display = "none";
    getID.style.display = "none";

    playerLabel.innerText = "Jugador: " + getID.value;
    getID.value = "";
    playerLabel.style.display = "block";
    questionLabel.style.display = "block";
    answer1.style.display = "block";
    answer2.style.display = "block";
    answer3.style.display = "block";
    handleQS();
  }
});

//setTimeout(showMessage, 3000) showmessage puede ser una funcion

//Lógica del juego
function handleQS() {
  if (actualQuestion === 10) {
    if (asserts >= 6) {
      modal3.showModal();
    } else {
      modal2.showModal();
    }

    btnPlay.style.display = "block";
    logo.style.display = "block";
    getID.style.display = "block";

    playerLabel.style.display = "none";
    questionLabel.style.display = "none";
    answer1.style.display = "none";
    answer2.style.display = "none";
    answer3.style.display = "none";

    actualQuestion = 0;
    asserts = 0;
    misses = 0;
  }

  questionLabel.innerText =
    "Pregunta #" +
    (actualQuestion + 1) +
    ":" +
    jsonQuestions[actualQuestion].pregunta;
  answer1.innerText = jsonQuestions[actualQuestion].respuestas[0];
  answer3.innerText = jsonQuestions[actualQuestion].respuestas[1];
  answer2.innerText = jsonQuestions[actualQuestion].respuestas[2];
}

function checkAnswer(selectedAnswer) {
  if (jsonQuestions[actualQuestion].correcta === selectedAnswer) {
    actualQuestion++;
    asserts++;
    modal3.showModal();
    modal3.addEventListener("click", function () {
      handleQS();
    });
    //handleQS();
  } else {
    actualQuestion++;
    misses++;
    modal2.showModal();
    modal2.addEventListener("click", function () {
      handleQS();
    });
    //handleQS();
  }
}

answer1.addEventListener("click", function () {
  checkAnswer(0);
});

answer2.addEventListener("click", function () {
  checkAnswer(1);
});

answer3.addEventListener("click", function () {
  checkAnswer(2);
});
