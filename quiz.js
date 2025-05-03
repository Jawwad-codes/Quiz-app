/** @format */

const div = document.getElementById("quiz");
let Index = 0;
let response = [];
let Total = 0;
const RenderQuestion = (arr) => {
  const allAnswers = [...arr.incorrectAnswers, arr.correctAnswer];
  let shufflearray = [];
  function shuffle(allAnswers) {
    let usedIndex = [];
    let i = 0;
    while (i < allAnswers.length) {
      let randomnumber = Math.floor(Math.random() * allAnswers.length);
      if (!usedIndex.includes(randomnumber)) {
        shufflearray.push(allAnswers[randomnumber]);
        usedIndex.push(randomnumber);
        i++;
      }
    }
    return shufflearray;
  }
  shuffle(allAnswers);
  div.innerHTML += `
  <h3>Q${Index + 1}: ${arr.question.text}</h3>
          <ul>
              ${shufflearray
                .map(
                  (answer) => `
                  <li>
                      <label>
                          <input type="radio" name="question${Index}" value="${answer}">
                          ${answer}
                      </label>
                  </li>`
                )
                .join("")}
          </ul>
          `;
  document.getElementById("nextButton").disabled = true;
  const radioButtons = document.querySelectorAll(
    `input[name=question${Index}]`
  );
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      var selected = document.querySelector(
        `input[name=question${Index}]:checked`
      ).value;
      if (selected) {
        document.getElementById("nextButton").disabled = false;
      }
      if (selected === arr.correctAnswer) {
        Total += 10;
      }
    });
  });
};

const prevQuestion = () => {
  if (Index > 0) {
    Index--;
    div.innerHTML = " ";
    RenderQuestion(response[Index]);
  }
};

const Nextquestion = () => {
  try {
    if (Index < response.length - 1) {
      div.innerHTML = "";
      Index++;
      RenderQuestion(response[Index]);
    } else {
      div.innerHTML = `
        <h2>🎉 You have completed the quiz!</h2>
        <h3>Your Score: ${Total}/${response.length * 10}</h3>
        <button onclick="reload()">🔁 Try Again</button>
      `;
      document.getElementById("nextButton").style.display = "none";
      document.getElementById("prevButton").style.display = "none";
    }
  } catch (error) {
    console.error("Nextquestion Error:", error);
  }
};
const getQueston = async () => {
  try {
    const data = await fetch("https://the-trivia-api.com/v2/questions");
    response = await data.json();
    RenderQuestion(response[Index]);
  } catch (error) {
    console.log("error===>", error);
  }
};
getQueston();
const reload = () => {
  window.location.href = "quiz.html";
};
