const quizData = [
  {
    type: "single",
    question: "Which language runs in a web browser?",
    options: ["Python", "Java", "C", "JavaScript"],
    answer: "JavaScript"
  },

  {
    type: "multi",
    question: "Select frontend technologies:",
    options: ["HTML", "CSS", "Node.js", "JavaScript"],
    answer: ["HTML", "CSS", "JavaScript"]
  },

  {
    type: "fill",
    question: "Fill in the blank: HTML stands for ____ Markup Language.",
    answer: "HyperText"
  },

  {
    type: "single",
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Apple"],
    answer: "Facebook"
  },

  {
    type: "multi",
    question: "Which are programming languages?",
    options: ["Python", "Car", "Java", "Bottle"],
    answer: ["Python", "Java"]
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 20;

const questionEl = document.getElementById("question");
const optionsBox = document.getElementById("options-box");
const nextBtn = document.getElementById("next-btn");
const currentQ = document.getElementById("current-q");
const totalQ = document.getElementById("total-q");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreEl = document.getElementById("score");
const scoreText = document.getElementById("score-text");
const fillInput = document.getElementById("fill-input");
const questionType = document.getElementById("question-type");
const timeDisplay = document.getElementById("time");

totalQ.innerText = quizData.length;

function loadQuestion() {

  resetState();

  let q = quizData[currentQuestion];

  currentQ.innerText = currentQuestion + 1;
  questionEl.innerText = q.question;

  startTimer();

  if (q.type === "single") {

    questionType.innerText = "Single Select Question";

    q.options.forEach(option => {

      const div = document.createElement("div");

      div.classList.add("option");

      div.innerText = option;

      div.addEventListener("click", () => {

        document.querySelectorAll(".option")
          .forEach(opt => opt.classList.remove("selected"));

        div.classList.add("selected");
      });

      optionsBox.appendChild(div);
    });
  }

  else if (q.type === "multi") {

    questionType.innerText = "Multi Select Question";

    q.options.forEach(option => {

      const div = document.createElement("div");

      div.classList.add("option");

      div.innerText = option;

      div.addEventListener("click", () => {
        div.classList.toggle("selected");
      });

      optionsBox.appendChild(div);
    });
  }

  else if (q.type === "fill") {

    questionType.innerText = "Fill in the Blank";

    fillInput.style.display = "block";
  }
}

function resetState() {

  clearInterval(timer);

  timeLeft = 20;

  timeDisplay.innerText = timeLeft;

  optionsBox.innerHTML = "";

  fillInput.style.display = "none";

  fillInput.value = "";
}

function startTimer() {

  timer = setInterval(() => {

    timeLeft--;

    timeDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {

      clearInterval(timer);

      nextQuestion();
    }

  }, 1000);
}

function checkAnswer() {

  let q = quizData[currentQuestion];

  if (q.type === "single") {

    const selected = document.querySelector(".option.selected");

    if (selected && selected.innerText === q.answer) {

      score++;
    }
  }

  else if (q.type === "multi") {

    const selected = [...document.querySelectorAll(".option.selected")]
      .map(opt => opt.innerText)
      .sort();

    const correct = [...q.answer].sort();

    if (JSON.stringify(selected) === JSON.stringify(correct)) {

      score++;
    }
  }

  else if (q.type === "fill") {

    const userAnswer = fillInput.value.trim().toLowerCase();

    if (userAnswer === q.answer.toLowerCase()) {

      score++;
    }
  }
}

function nextQuestion() {

  checkAnswer();

  currentQuestion++;

  if (currentQuestion < quizData.length) {

    loadQuestion();

  } else {

    showResult();
  }
}

function showResult() {

  quizBox.classList.add("hidden");

  resultBox.classList.remove("hidden");

  // FIXED LINE
  scoreEl.innerText = `${score}/${quizData.length}`;

  let percentage = (score / quizData.length) * 100;

  if (percentage >= 80) {

    scoreText.innerText = "🏆 Excellent Performance!";
  }

  else if (percentage >= 50) {

    scoreText.innerText = "👍 Good Job!";
  }

  else {

    scoreText.innerText = "😅 Keep Practicing!";
  }
}

nextBtn.addEventListener("click", nextQuestion);

loadQuestion();