
var triviaQuestions = [
    {
        question: "What kind of vehicles where manufactured by Lambroghini in 1947 when the factory was just opened?",
        answers: [
            "Drag racing cars",
            "Limos",
            "Tractors",
            "Motorbike"
        ],
        correct: 2,
        img: "assets/images/tractor.jpg",
    },
    {
        question: "What is the most expensive Lamborghini production model today?",
        answers: [
            "Chentenario",
            "Diablo",
            "Huracane",
            "Veneno"
        ],
        correct: 3,
        img: "assets/images/veneno.jpg",
    },
    {
        question: "How many 100 years anniversary Centenarios will be made by Lamborhini?",
        answers: [
            "100 cars",
            "only 1",
            "50 coupes and 50 roadsters",
            "20 coupes and 20 roadsters"
        ],
        correct: 3,
        img: "assets/images/centenario.jpg",
    },
    {
        question: "What is the model name of the first ever Lamborghini's SUV?",
        answers: [
            "Levante",
            "The Cruiser",
            "Urus",
            "Corage"
        ],
        correct: 2,
        img: "assets/images/urus.jpg",
    },
    {
        question: "What is the starting price of Lamborhini Veneno Radster if you would order one directly from manufacturer?",
        answers: [
            "$4.5 million USD",
            "$750000 USD",
            "$1.2 million USD",
            "2500000 USD"
        ],
        correct: 0,
        img: "assets/images/veneno_roadster.jpg",
    },
    {
        question: "Which Lamborhini model was holding Nurburgring lap record of 6:52:01 established on 5th of October of 2016 until it got beaten by Porche 911 GT2 RS on September 20 of 2017?",
        answers: [
            "Veneno",
            "Huracan LP640-4 Performante",
            "Centenario Roadster",
            "Countach"
        ],
        correct: 1,
        img: "assets/images/huracan_performante.jpg",
    },
];
var gameObj = {
    questions: triviaQuestions,
    correct: 0,
    incorrect: 0,
    totaltime: 0,
    questionCounter: 0,
    timer: 0,
    countdownTime: 30,
    messageTime: 5000
};
var game = {};

function countdown() {
    if (game.countdownTime === -1) {
        var curQuestion = game.questions[game.questionCounter];
        if (curQuestion === undefined) {
            gameOver();
            return;
        }
        takeAnswer();
        game.incorrect++;
        showMessage('Your time is out... The correct answer is ' + curQuestion.answers[curQuestion.correct] + '!', curQuestion.img, 'alert-danger');
        var timeout = setTimeout(showQuestion, game.messageTime);
    } else {
        if (game.countdownTime < 15 && game.countdownTime > 5) {
            $('#countdown').removeAttr('class').addClass('alert').addClass('alert-warning');
        }
        else if (game.countdownTime <= 5) {
            $('#countdown').removeAttr('class').addClass('alert').addClass('alert-danger');
        }
        $('#timer').text(game.countdownTime);
        game.countdownTime--;
    }
}

function startGame() {
    game = Object.assign({}, gameObj);
    showQuestion();
    $('#startGame').hide();
}

function showQuestion() {
    var curQuestion = game.questions[game.questionCounter];
    if (curQuestion === undefined) {
        gameOver();
        return;
    }
    game.timer = setInterval(countdown, 1000);
    $('#countdown').show();
    $('#message').hide();
    $('#answers').html('');
    $('#question').text(curQuestion.question);
    $('#questionSlide').show();

    $.each(curQuestion.answers, function (index, answer) {
        $('#answers').append('<div data-answerId="' + index + '" class="answer">' + answer + '</div>');
    });
    $('.answer').on('click', function () {
        var answer = parseInt($(this).attr('data-answerId'));
        takeAnswer();
        if (checkRightAnswer(answer, curQuestion)) {
            game.correct++;
            showMessage('You are correct! The answer is ' + curQuestion.answers[answer] + '!', curQuestion.img, 'alert-success');
        } else {
            game.incorrect++;
            showMessage('Mistake! The correct answer is ' + curQuestion.answers[curQuestion.correct] + '!', curQuestion.img, 'alert-danger');
        }
        var timeout = setTimeout(showQuestion, game.messageTime);
    });

}

function takeAnswer() {
    game.totaltime = game.totaltime + (30 - game.countdownTime);
    game.countdownTime = 30;
    game.questionCounter++;
    resetTimer();
    $('#questionSlide').hide();
    $('#message').show();
}

function gameOver() {
    var gameClass = 'alert-success';
    if (game.correct === game.incorrect) {
        gameClass = 'alert-warning';
    }
    if (game.correct < 2) {
        gameClass = 'alert-danger';
    }
    $('#countdown').hide();
    showMessage('Game Over! You have ' + game.correct + ' correct answer(s) and ' + game.incorrect + ' incorrect answer(s). You spent ' + game.totaltime + ' seconds on this game.', null, gameClass);
    $('#startGame').show().text('Restart Game');
    console.log('gameover');
}

function resetTimer() {
    $('#countdown').removeAttr('class').addClass('alert').addClass('alert-info');
    clearInterval(game.timer);
}

function checkRightAnswer(answerId, question) {
    return (question.correct === parseInt(answerId));
}

function showMessage(message, img, messageClass) {
    $('#message').html('').removeAttr('class').addClass('alert').addClass(messageClass).append('<p>' + message + '</p>');
    if (img !== null) {
        $('#message').append('<p><img src="' + img + '"></p>');
    }
}

$(function () {
    $('#message').hide();
    $('#countdown').hide();
    $('#questionSlide').hide();
    $('#startGame').click(function () {
        startGame();
    });
});






