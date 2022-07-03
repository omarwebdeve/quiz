///.... open Quiz apps ........///
const openQuiz = document.querySelector(".apps_icon");
const pageOne = document.querySelector(".page_one");

openQuiz.onclick = () => {
    pageOne.classList.add("page_one_active");
}
///.... open  page tow ........///
const btnOne = document.querySelector("#btnOne");
const pageTwo = document.querySelector(".page_two");

btnOne.onclick = () => {
    pageTwo.classList.add("page_two_active");
}
///.... Reload ........///
const exitQuiz = document.querySelector("#exitQuiz");
exitQuiz.onclick = () => {
    // window.location.reload();
    pageTwo.classList.remove("page_two_active");
}
const quitQuiz = document.querySelector("#quitQuiz");
quitQuiz.onclick = () => {
    window.location.reload();
}
///.... open  page tree ........///
const btnTwo = document.querySelector("#btnTwo");
const pageTree = document.querySelector(".page_tree");
btnTwo.onclick = () => {
    pageTree.classList.add("page_tree_active");
    showQuestion(queCount);
    startTimer(16);
}
const pagFour = document.querySelector(".page_four");
const replay = document.querySelector("#replay")
replay.onclick = () => {
    pagFour.classList.remove("page_four_active");
}

let queCount = 0;
let counter = 0;
let userRightAns = 0;

 
// ----------------------- question -----------------------//

function showQuestion(index) {
    const queText = document.querySelector('.que_text');
    const optionText = document.querySelector(".option");
    const count = document.querySelector(".count");
    let que_show = "<div>" + questions[index].number + ". " + questions[index].question + "<div>";
    let showOption =
        "<span id='option'>" + questions[index].options[0] + "</span>" +
        "<span id='option'>" + questions[index].options[1] + "</span>" +
        "<span id='option'>" + questions[index].options[2] + "</span>" +
        "<span id='option'>" + questions[index].options[3] + "</span>";
    let listShow = questions[index].number + `/${questions.length}`;
    const totalQues = document.querySelector('#totalQues');
    totalQues.innerHTML = `${questions.length}`;

    queText.innerHTML = que_show;
    optionText.innerHTML = showOption;
    count.innerHTML = listShow;


    /// ------------ Select Option ------------- ///
    const selectOption = optionText.querySelectorAll("#option");
    for (let i = 0; i < option.length; i++) {
        selectOption[i].setAttribute("onclick", "optionSelected(this)")
    }
}

function optionSelected(answer) {
    const userAns = answer.textContent;
    const correctAns = questions[queCount].answer;
    const optionOne = document.querySelector(".option");
    let allOptions = optionOne.children.length;
    if (userAns == correctAns) {
        let caryOn = document.querySelector('#caryOn');
        answer.classList.add("correct");
        userRightAns += 1;
        const totalMarks = document.querySelector("#total_marks")
        totalMarks.innerHTML = userRightAns;
        const totalQuestion = questions.length;
        const eightyPas = totalQuestion * 80 / 100;
        const eightyOnePas = totalQuestion * 81 / 100;
        const fiftyOnePas = totalQuestion * 51 / 100;
        const fiftyPas = totalQuestion * 50 / 100;
        const thirtyThreePas = totalQuestion * 33 / 100;
        const thirtyTwoPas = totalQuestion * 32 / 100;
        if (userRightAns <= thirtyTwoPas || userRightAns == 0) {
            caryOn.innerHTML = "Sorry Try again 🤔 <br>";
        } else if (userRightAns >= thirtyThreePas && userRightAns <= fiftyPas) {
            caryOn.innerHTML = "Good 👍";
        } else if (userRightAns >= fiftyOnePas && userRightAns <= eightyPas) {
            caryOn.innerHTML = "Awesome! 👌";
        } else if (userRightAns >= eightyOnePas) {
            caryOn.innerHTML = "Congratulations! 😊 <br>";
        }

    } else {
        answer.classList.add("wrong");
        for (let i = 0; i < allOptions; i++) {
            if (optionOne.children[i].textContent == correctAns) {
                optionOne.children[i].setAttribute("class", " correct option")
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        optionOne.children[i].classList.add("disable");
    }
}

const startTimer = (minute) => {
    let counts = setInterval(updated, 1000);
    let upto = minute;
    function updated() {
        var count = document.getElementById("count");
        count.innerHTML = --upto;
    console.log(upto);
         if (upto <= 0) {
            clearInterval(counts);
            count.textContent = "00";
            const optionOne = document.querySelector(".option");
            let allOptions = optionOne.children.length;
            for (let i = 0; i < allOptions; i++) {
                optionOne.children[i].classList.add("disable");
            }
        } else if (upto <= 9) {
            let addZero = count.textContent;
            count.textContent = 0 + addZero;
        }
        const next = document.querySelector("#queNext");
        next.onclick = () => {
            if (queCount < questions.length - 1) {
                queCount++;
                showQuestion(queCount);
                clearInterval(counts);
                startTimer(16);
            } else {
                showPageFour();
            }
        }
    }
}
function showPageFour() {
    pageTree.classList.remove("page_tree_active");
    pagFour.classList.add("page_four_active");

}