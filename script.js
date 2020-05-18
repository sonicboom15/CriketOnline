var Player = /** @class */ (function () {
    function Player() {
        this.ballNo = 0;
        this.total = 0;
    }
    Player.prototype.incrementBall = function () {
        this.ballNo = this.ballNo.valueOf() + 1;
    };
    return Player;
}());
var Team = /** @class */ (function () {
    function Team() {
        var _this = this;
        this.updateTotalScore = function () {
            _this.totalScore = 0;
            _this.players.forEach(function (player) { return _this.totalScore = player.total.valueOf() + _this.totalScore.valueOf(); });
        };
        this.totalScore = 0;
        this.players = [];
    }
    return Team;
}());
var teams = [];
var turnIndicator = 0;
var TeamAPlayerNo = 0;
var TeamBPlayerNo = 0;
var timeleft = 60;
var countdownTimer = setInterval(function () {
    var countdown = document.getElementById("timercontent");
    if (timeleft <= 0) {
        clearInterval(countdownTimer);
        countdown.innerHTML = "0";
        if (turnIndicator == 0) {
            if (TeamAPlayerNo < 10) {
                turnIndicator = 1;
            }
            else {
                lockButton();
            }
        }
        else if (turnIndicator == 1) {
            if (TeamBPlayerNo < 10) {
                turnIndicator = 0;
            }
            else {
                lockButton();
            }
        }
        countReset();
    }
    else {
        countdown.innerHTML = timeleft + " seconds";
    }
    timeleft -= 1;
}, 1000);
var lockButton = function () {
    var lock = document.getElementById("Play");
    lock.disabled = true;
};
var getBallScore = function () {
    var AllButtons = document.getElementsByClassName("btn-success");
    for (var i = 0; i < AllButtons.length; i++) {
        AllButtons.item(i).classList.replace("btn-success", "btn-primary");
    }
    countReset();
    var data = [1, 2, 4, 6, 0];
    var number = Math.floor(Math.random() * 5);
    var videoplayer = document.getElementById("video");
    videoplayer.play();
    videoplayer.onended = function () {
        var button = document.getElementById(data[number].toString());
        button.classList.replace("btn-primary", "btn-success");
        if (turnIndicator == 0) {
            loadTeamB();
        }
        else if (turnIndicator == 1) {
            loadTeamA();
        }
    };
    return data[number];
};
var countReset = function () {
    clearInterval(countdownTimer);
    timeleft = 60;
    countdownTimer = setInterval(function () {
        var countdown = document.getElementById("timercontent");
        if (timeleft <= 0) {
            clearInterval(countdownTimer);
            countdown.innerHTML = "0";
            if (turnIndicator == 0) {
                loadTeamB();
                if (TeamAPlayerNo < 10) {
                    turnIndicator = 1;
                }
                else {
                    lockButton();
                }
            }
            else if (turnIndicator == 1) {
                loadTeamA();
                if (TeamBPlayerNo < 10) {
                    turnIndicator = 0;
                }
                else {
                    lockButton();
                }
            }
            countReset();
        }
        else {
            countdown.innerHTML = timeleft + " seconds";
        }
        timeleft -= 1;
    }, 1000);
};
var loadTeamA = function () {
    var videoplayer = document.getElementById("video");
    var videoSource = document.getElementById("videosource");
    videoSource.src = "\\resources\\videos\\TeamA.mp4";
    videoplayer.load();
};
var loadTeamB = function () {
    var videoplayer = document.getElementById("video");
    var videoSource = document.getElementById("videosource");
    videoSource.src = "\\resources\\videos\\TeamB.mp4";
    videoplayer.load();
};
var playButton = function (button) {
    var score = getBallScore();
    if (turnIndicator == 0) {
        teams[turnIndicator].players[TeamAPlayerNo].scores[teams[turnIndicator].players[TeamAPlayerNo].ballNo] = score;
        teams[turnIndicator].players[TeamAPlayerNo].total = teams[turnIndicator].players[TeamAPlayerNo].total.valueOf() + score;
        teams[turnIndicator].players[TeamAPlayerNo].incrementBall();
        teams[turnIndicator].updateTotalScore();
        if (score == 0) {
            TeamAPlayerNo = +1;
        }
        else if (teams[turnIndicator].players[TeamAPlayerNo].ballNo.valueOf() >= 5) {
            TeamAPlayerNo = +1;
        }
        if (TeamAPlayerNo < 10) {
            turnIndicator = 1;
        }
        else {
            lockButton();
        }
    }
    else if (turnIndicator == 1) {
        teams[turnIndicator].players[TeamBPlayerNo].scores[teams[turnIndicator].players[TeamAPlayerNo].ballNo] = score;
        teams[turnIndicator].players[TeamBPlayerNo].total = teams[turnIndicator].players[TeamAPlayerNo].total.valueOf() + score;
        teams[turnIndicator].players[TeamBPlayerNo].incrementBall();
        teams[turnIndicator].updateTotalScore();
        if (score == 0) {
            TeamBPlayerNo = +1;
        }
        else if (teams[turnIndicator].players[TeamBPlayerNo].ballNo.valueOf() >= 5) {
            TeamBPlayerNo = +1;
        }
        if (TeamBPlayerNo < 10) {
            turnIndicator = 0;
        }
        else {
            lockButton();
        }
    }
    console.log(teams);
};
window.onload = function () {
    teams.push(new Team());
    teams.push(new Team());
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 10; j++) {
            teams[i].players.push(new Player());
            teams[i].players[j].scores = [NaN, NaN, NaN, NaN, NaN, NaN];
        }
    }
};
