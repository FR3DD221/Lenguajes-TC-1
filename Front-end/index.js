//Pantalla de logueo
const getID = document.getElementById("entrada");
const btnPlay = document.getElementById("playBTN");
const btnHs = document.getElementById("historyBTN");
const logo = document.getElementById("logo");
const modal1 = document.getElementById("errorID");
const modal2 = document.getElementById("wrongAns");
const modal3 = document.getElementById("assertAns");
const modal4 = document.getElementById("win");
const modal5 = document.getElementById("lost");
const modal6 = document.getElementById("hs");

//Pantalla de juego
const playerLabel = document.getElementById("playerName");
const questionLabel = document.getElementById("questions");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");

//datos del back
let jsonQuestions;
let jsonHistory;
let nameId = "";

//variables para el juego
let actualQuestion = 0;
let misses = 0;
let asserts = 0;

//Petición de los datos al back
fetch("http://localhost:3001/api/data")
  .then((res) => res.json())
  .then((data) => setJsonQS(data));

fetch("http://localhost:3001/api/data2")
  .then((res) => res.json())
  .then((data) => setJsonHS(data));

//Guardando los datos solicitados
function setJsonQS(data) {
  jsonQuestions = data;
}

function setJsonHS(data) {
  jsonHistory = data;
}

//Funcionalidad de los componentes del HTML
btnPlay.addEventListener("click", function () {
  if (getID.value.length === 0) {
    modal1.showModal();
  } else {
    btnPlay.style.display = "none";
    logo.style.display = "none";
    getID.style.display = "none";
    btnHs.style.display = "none";

    playerLabel.innerText = "Jugador: " + getID.value;
    nameId = getID.value;
    getID.value = "";
    playerLabel.style.display = "block";
    questionLabel.style.display = "block";
    answer1.style.display = "block";
    answer2.style.display = "block";
    answer3.style.display = "block";
    console.log(jsonQuestions);
    jsonQuestions = randomQS();
    handleQS();
  }
});

btnHs.addEventListener("click", function () {
  fillHistory();
  modal6.showModal();
});

answer1.addEventListener("click", function () {
  checkAnswer(0);
});

answer2.addEventListener("click", function () {
  checkAnswer(1);
});

answer3.addEventListener("click", function () {
  checkAnswer(2);
});

//Lógica del juego
function handleQS() {
  if (actualQuestion === 10) {
    if (asserts >= 6) {
      modal4.showModal();
      modal4.addEventListener("click", function () {
        sendData(nameId, asserts, misses, "Victoria");
        nameId = "";
      });
    } else {
      modal5.showModal();
      modal5.addEventListener("click", function () {
        sendData(nameId, asserts, misses, "Derrota");
        nameId = "";
      });
    }

    btnPlay.style.display = "block";
    logo.style.display = "block";
    getID.style.display = "block";
    btnHs.style.display = "block";

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
  answer2.innerText = jsonQuestions[actualQuestion].respuestas[1];
  answer3.innerText = jsonQuestions[actualQuestion].respuestas[2];
}

function checkAnswer(selectedAnswer) {
  if (jsonQuestions[actualQuestion].correcta === selectedAnswer) {
    actualQuestion++;
    asserts++;
    modal3.showModal();
    modal3.addEventListener("click", function () {
      handleQS();
    });
  } else {
    actualQuestion++;
    misses++;
    modal2.showModal();
    modal2.addEventListener("click", function () {
      handleQS();
    });
  }
}

function fillHistory() {
  text = "HISTORIAL\n\n";

  for (i = 0; i < jsonHistory.length; i++) {
    text += jsonHistory[i].namePlayer + "\n";
    text += "Aciertos: " + jsonHistory[i].shoots + "\n";
    text += "Fallos: " + jsonHistory[i].misses + "\n";
    text += "Resultado: " + jsonHistory[i].result + "\n";
    text += "\n\n";
  }

  modal6.innerText = text;
}

function sendData(name, asserts, misses, result) {
  const data = {
    namePlayer: name,
    shoots: asserts,
    misses: misses,
    result: result,
  };


  fetch("http://localhost:3001/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
}

function randomQS() {
  positions = [];
  i = 0;

  while (i < 10) {
    num = Math.floor(Math.random() * jsonQuestions.length);
    if (!positions.includes(num)) {
      positions.push(num);
      i++;
    }
  }

  questions = [];

  for (j = 0; j < 10; j++) {
    questions.push(jsonQuestions[positions[j]]);
  }

  return questions;
}
