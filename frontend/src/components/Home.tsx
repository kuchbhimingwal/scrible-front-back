import { useNavigate } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import { useState } from 'react';
import Gamepage from './Gamepage';

function Home() {
  const socket = useSocket();
  const [init, setInit] = useState(false);
  const clickHandler = ()=>{
    if(!socket) return
    try {
      socket.send(JSON.stringify({
        type: "INIT_GAME"
      }));
      setInit(true);
    } catch (error) {
      console.log(error);
      setInit(false);
    }
  }
  if(!init){
    return (
      <div className=''>
        <h1 className='w-full bg-gray-400 p-4 m-4 font-bold text-xl'>Click the button below to connect to the server</h1>
        <button onClick={clickHandler} className='bg-black rounded-lg text-white p-3'>Play Game</button>
      </div>
    )
  } else {
    return (
      <div>
        <Gamepage socket={socket} />
      </div>
    )
  }
  
}

export default Home