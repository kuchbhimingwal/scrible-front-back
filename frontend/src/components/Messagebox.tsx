import React, { useState } from 'react'

function Messagebox({messages, socket}:any) {
  const [wordsending, setWordsending] = useState("");
  const clickHandler = () =>{
    if(socket){
      socket.send(JSON.stringify({
        type: "GUESS",
        payload: {
          guess: wordsending
        }
    }))
    }
  }
  // console.log(messages);
  
    return (
    <div>
    <div className="flex items-center min-h-full">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
            </div>
            <div className="p-4 h-64 overflow-y-scroll">
                {/* <!-- Chat messages --> */}
                <div className="mb-4">
                  {messages.map((message:any,i:any)=>(
                    <div key={i} className="flex justify-end mt-2">
                      <div className="max-w-xs px-4 py-2  bg-gray-500 text-white rounded-lg">
                          {message.player}
                      </div>
                      <div className="max-w-xs px-4 py-2 bg-blue-500 text-white rounded-lg">
                          {message.guessWord}
                      </div>
                    </div>
                  ))}
                </div>
                {/* <!-- Add more messages here --> */}
            </div>
            <div className="p-4 border-t">
                <div className="flex items-center">
                    <input type="text" placeholder="Type your message..." className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" onChange={(e)=>{setWordsending(e.target.value)}}/>
                    <button onClick={clickHandler} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Messagebox