class Player{
    scores:Number[];
    ballNo:Number;
    total:Number;
    constructor(){
        this.ballNo = 0;
        this.total = 0;
    }
    incrementBall(){
        this.ballNo = this.ballNo.valueOf()+1;
    }
}
class Team{
    players:Player[];
    totalScore:Number;
    constructor(){
        this.totalScore = 0;
        this.players = []
    }
    updateTotalScore = () =>{
        this.totalScore = 0;
        this.players.forEach(player => this.totalScore = player.total.valueOf()+this.totalScore.valueOf())
    }
}
let teams = [];
let turnIndicator = 0;
let TeamAPlayerNo = 0;
let TeamBPlayerNo = 0;
let timeleft = 60;
let countdownTimer = setInterval(() =>{
    let countdown = <HTMLHeadingElement>document.getElementById("timercontent");
    if(timeleft<=0){
        clearInterval(countdownTimer);
        countdown.innerHTML = "0";
        if(turnIndicator==0){
            if(TeamAPlayerNo<10){
                turnIndicator = 1;
            }else{
                lockButton()
            }
        }
        else if(turnIndicator==1){
            if(TeamBPlayerNo<10){
                turnIndicator = 0;
            }else{
                lockButton()
            }
        }
        countReset();
    }
    else{
        countdown.innerHTML = `${timeleft} seconds`;
    }
    timeleft-=1;
},1000);

let lockButton = () =>{
    let lock = <HTMLButtonElement>document.getElementById("Play");
    lock.disabled = true;
}

let getBallScore = () =>{
    let AllButtons = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName("btn-success");
    for(let i=0;i<AllButtons.length;i++){
        AllButtons.item(i).classList.replace("btn-success","btn-primary");
    }
    countReset();
    let data = [1,2,4,6,0];
    let number = Math.floor(Math.random() * 5);
    let videoplayer = <HTMLVideoElement>document.getElementById("video");
    videoplayer.play()
    videoplayer.onended = () =>{
        let button = <HTMLButtonElement>document.getElementById(data[number].toString());
        button.classList.replace("btn-primary","btn-success");
        if(turnIndicator==0){
            loadTeamB();
        }
        else if(turnIndicator==1){
            loadTeamA();
        }
    }
    return data[number];
}

let countReset = () => {
    clearInterval(countdownTimer);
    timeleft = 60
    countdownTimer = setInterval(() =>{
        let countdown = <HTMLHeadingElement>document.getElementById("timercontent");
        if(timeleft<=0){
            clearInterval(countdownTimer);
            countdown.innerHTML = "0";
            if(turnIndicator==0){
                loadTeamB();
                if(TeamAPlayerNo<10){
                    turnIndicator = 1;
                }else{
                    lockButton()
                }
            }
            else if(turnIndicator==1){
                loadTeamA();
                if(TeamBPlayerNo<10){
                    turnIndicator = 0;
                }else{
                    lockButton()
                }
            }
            countReset();
        }
        else{
            countdown.innerHTML = `${timeleft} seconds`;
        }
        timeleft-=1;
    },1000);
}

let loadTeamA = () =>{
    let videoplayer = <HTMLVideoElement>document.getElementById("video");
    let videoSource = <HTMLSourceElement>document.getElementById("videosource");
    videoSource.src = "\\resources\\videos\\TeamA.mp4"
    videoplayer.load()
}
let loadTeamB = () =>{
    let videoplayer = <HTMLVideoElement>document.getElementById("video");
    let videoSource = <HTMLSourceElement>document.getElementById("videosource");
    videoSource.src = "\\resources\\videos\\TeamB.mp4"
    videoplayer.load()
}

let playButton = (button) =>{
    let score = getBallScore();
    if(turnIndicator==0){
        teams[turnIndicator].players[TeamAPlayerNo].scores[teams[turnIndicator].players[TeamAPlayerNo].ballNo] = score;
        teams[turnIndicator].players[TeamAPlayerNo].total = teams[turnIndicator].players[TeamAPlayerNo].total.valueOf() + score;
        teams[turnIndicator].players[TeamAPlayerNo].incrementBall();
        teams[turnIndicator].updateTotalScore();
        if(score==0){
            TeamAPlayerNo =+ 1;
        }
        else if(teams[turnIndicator].players[TeamAPlayerNo].ballNo.valueOf() >= 5){
            TeamAPlayerNo =+ 1;
        }
        if(TeamAPlayerNo<10){
            turnIndicator = 1;
        }
        else{
            lockButton()
        }
    }
    else if(turnIndicator==1){
        teams[turnIndicator].players[TeamBPlayerNo].scores[teams[turnIndicator].players[TeamAPlayerNo].ballNo] = score;
        teams[turnIndicator].players[TeamBPlayerNo].total = teams[turnIndicator].players[TeamAPlayerNo].total.valueOf() + score;
        teams[turnIndicator].players[TeamBPlayerNo].incrementBall();
        teams[turnIndicator].updateTotalScore();
        if(score==0){
            TeamBPlayerNo =+ 1;
        }
        else if(teams[turnIndicator].players[TeamBPlayerNo].ballNo.valueOf() >= 5){
            TeamBPlayerNo =+ 1;
        }
        if(TeamBPlayerNo<10){
            turnIndicator = 0;
        }
        else{
            lockButton()
        }
    }
    console.log(teams);
}

window.onload = ()=>{
    teams.push(new Team());
    teams.push(new Team());
    for(let i=0;i<2;i++){
        for(let j=0;j<10;j++){
            teams[i].players.push(new Player());
            teams[i].players[j].scores = [NaN,NaN,NaN,NaN,NaN,NaN];
        }
    }
}