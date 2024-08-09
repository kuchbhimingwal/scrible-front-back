import { WebSocket } from "ws";

export class Game{
  public players: WebSocket[];
  public wordGuesses: Object[];
  public scribbleWords: String[];
  public startTime: Date;
  public playerDrawing: number;
  public randomWord: number;
  public gameDuration: number;
  public time : number;
  public timeoutDuration : number;
  public playersGuessing: WebSocket[];
  public gameLoop: NodeJS.Timeout | undefined;
  public names: String[];
  constructor(players: WebSocket[]){
    this.wordGuesses = [{}];
    this.names = ["John", "Emily", "Michael", "Sophia", "James"];
    this.scribbleWords = [
      "apple", "banana", "mountain", "river", "ocean",
      "house", "car", "dog", "cat", "tree",
      "bird", "flower", "cloud", "sun", "moon",
      "star", "boat", "train", "bicycle", "book",
      "chair", "table", "window", "door", "pencil",
      "balloon", "cake", "hat", "shoe", "clock",
      "bridge", "road", "fish", "elephant", "lion",
      "giraffe", "turtle", "butterfly", "rainbow", "fire",
      "ice", "snow", "rain", "wind", "forest",
      "desert", "castle", "dragon", "wizard", "knight"
    ];
    this.players = players;
    this.startTime = new Date();
    players.map((player,i)=>{
    player.send(JSON.stringify({
        type: "INIT_GAME",
        payload:{
          player: `player ${this.names[i]}`
        }
      }))
    })
    this.playerDrawing = 0;
    this.randomWord = 0;
    this.gameDuration = 0;
    this.time = 0;
    this.timeoutDuration = 0;
    this.playersGuessing = [];
    this.gameLoop = undefined;
    this.startGame();
  }

  startGame(){
    clearInterval(this.gameLoop);
    this.time = 30;
    this.gameDuration = 30000;
    this.timeoutDuration = 1000;
    this.wordGuesses = [];
    this.playerDrawing = Math.floor(Math.random() * 4);
    this.randomWord = Math.floor(Math.random() * 50);
      this.playersGuessing = this.players.filter((_, index) => index !== this.playerDrawing);
      this.playersGuessing.map((player,i)=>{
        // console.log(i);
        
        player.send(JSON.stringify({
          type: "GUESSING_PLAYERS",
          payload:{
            message: "you guyes are guessing"
          }}))
      })
      this.players[this.playerDrawing].send(JSON.stringify({
        type: "DRAWING",
        payload:{
          word: this.scribbleWords[this.randomWord]
        }
      }))
      this.gameLoop = setInterval(() => {
        this.time--;
        this.players.map((player)=>{
          player.send(JSON.stringify({
            type: "TIMER",
            payload:{
              time: this.time
            }
          }))
        })
        // Add game logic here
    }, this.timeoutDuration);
    setTimeout(() => {
      clearInterval(this.gameLoop);
      this.startGame();
    }, this.gameDuration);
  }
  guess(playerSocket:WebSocket, guessWord: string){
    this.wordGuesses.push({guessWord, player : `player ${this.names[this.players.indexOf(playerSocket)]}`});

    this.players.map((player,i)=>{
        player.send(JSON.stringify({
          type: "GUESS",
          payload: {
            guessed: this.wordGuesses
          }
        }))
      if(playerSocket == player){
       if(guessWord == this.scribbleWords[this.randomWord]) {
        this.wordGuesses = [];
        this.players.map((player)=>{
          player.send(JSON.stringify({
            type: "GUESSED",
            payload:{
              message: `player ${this.names[i]} guess the answere right!!`
            }
          }))
        })
        // clearInterval(this.gameLoop);
        this.startGame();
        return
       } 
      }
    })
  }
  draw(playerSocket:WebSocket, payload:any){
    if(playerSocket == this.players[this.playerDrawing]){
      // console.log("currrent reccecivede");
      // console.log(payload);
      // console.log("gusseing", this.playersGuessing.length);
      
      
      this.playersGuessing.map((player)=>{
        player.send(JSON.stringify({
          type: "DRAWING_LINES",
          payload
        }))
      })
    } else {
      this.players.map((player)=>{
        console.log("invalid");
        
        player.send(JSON.stringify({
          type: "DRAWING_LINES",
          payload: {
            message: "not allowed"
          }
        }))
      })
    }
  }
}