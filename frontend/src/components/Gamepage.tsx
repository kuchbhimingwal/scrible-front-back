import React, { useEffect, useState } from 'react'
import Messagebox from './Messagebox';
import Sender from './Sender';
import Reciever from './Reciever';

function Gamepage({socket}:any) {
  const [playername, setPlayername] = useState("");
  const [messages, setMessages] = useState([{}]);
  const [guessing, setGuessing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [word, setWord] = useState("");
  const [started, setStarted] = useState(false);
  const [currentPoint, setCurrentPoint] = useState(null)
  const [prevPoint, setPrevPoint] = useState(null)
  const [color, setColor] = useState("#000000")
  useEffect(()=>{
    if (!socket) {
      return;
  }
  // console.log("reched 1");
  
  socket.onmessage = (event:any) => {
    // console.log("reched");
    
      const message = JSON.parse(event.data);
      switch (message.type) {
          case "INIT_GAME":
              setPlayername(message.payload.player);
              setStarted(true)
              break;
          case "GUESSING_PLAYERS":
            setGuessing(true);
            setWord("");
            break;
          case "DRAWING":
            setGuessing(false);
            setWord(message.payload.word);
            break;
          case "TIMER":
            setTimer(message.payload.time);
            break;
          case "GUESS":
            // console.log(message.payload.guessed);
            setMessages(message.payload.guessed);
            break;
          case "GUESSED":
            alert(message.payload.message);
            break;
          case "DRAWING_LINES":
            
            setCurrentPoint(message.payload.currentPoint);
            
            setPrevPoint(message.payload.prevPoint);
            
            setColor(message.payload.color)
            
            break;
      }
  }
  },[socket])


  if(!started) return <div>
    <h1>connecting to the server...</h1>
    </div>
  return (
    <div className='gird grid-cols-2'>
      <div className='col-span-1 border border-gray-400'>
        <h1>you are player {playername}</h1>
        {guessing? <h2>you are guessing</h2>: <h2>you are drawing the word:{word}</h2>}
        <h3>Timer:{timer}</h3>
      </div>
      <div className='flex'>
        <div>
          {guessing ? <Reciever currentPoint={currentPoint} prevPoint={prevPoint} color={color}/> : <Sender socket={socket} />}
        </div>
        <div>
          <Messagebox messages={messages} socket={socket}/>
        </div>
      </div>
    </div>
  )
}

export default Gamepage