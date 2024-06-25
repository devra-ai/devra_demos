document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const gameContainer = document.getElementById('game');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answerInput');
    const micButton = document.getElementById('micButton');
    const feedbackElement = document.getElementById('feedback');

    let score = 0;
    let timeLeft = 60;
    let currentAnswer = 0;
    let timerInterval;
    let recognition;

    const startGame = () => {
        startButton.style.display = 'none';
        gameContainer.classList.remove('hidden');
        score = 0;
        timeLeft = 60;
        scoreElement.textContent = `Score: ${score}`;
        timerElement.textContent = `Time: ${timeLeft}`;
        generateQuestion();
        answerInput.value = '';
        answerInput.focus();
        feedbackElement.textContent = '';
        timerInterval = setInterval(updateTimer, 1000);
        startSpeechRecognition();
    };

    const updateTimer = () => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    };

    const endGame = () => {
        startButton.style.display = 'block';
        gameContainer.classList.add('hidden');
        recognition.stop();
        alert(`Game over! Your score is ${score}.`);
    };

    const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        currentAnswer = num1 * num2;
        questionElement.textContent = `${num1} x ${num2} = ?`;
    };

    const checkAnswer = () => {
        const userAnswer = parseInt(answerInput.value.replace(/\D/g, ''), 10);
        if (userAnswer === currentAnswer) {
            feedbackElement.textContent = 'Correct!';
            feedbackElement.className = 'correct';
            score++;
            scoreElement.textContent = `Score: ${score}`;
            generateQuestion();
            answerInput.value = '';
        } else {
            feedbackElement.textContent = 'Incorrect!';
            feedbackElement.className = 'incorrect';
            answerInput.value = userAnswer;
        }
        answerInput.focus();
    };

    const startSpeechRecognition = () => {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.start();
        recognition.onresult = (event) => {
            const speechResult = event.results[event.resultIndex][0].transcript;
            answerInput.value = speechResult.replace(/\D/g, '');
            checkAnswer();
        };
    };

    startButton.addEventListener('click', startGame);
    answerInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
    micButton.addEventListener('click', startSpeechRecognition);
});
