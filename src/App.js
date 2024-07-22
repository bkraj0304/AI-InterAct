import './App.css';
import { useEffect, useState,useRef } from 'react';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon1 from './assets/user_icon1.png';
import  {sendMsgToOpenAI } from './openai';
import {gemini_model_call} from './gemini';
import chatbot from './assets/chatbot.png';



function App() {
  const msgEnd=useRef(null);
  const [input,setInput]=useState("");
  const [messages,setMessages]=useState([
    {
    text:"Hi, I am Chatbot, How can I help You",
    isBot:true,
    }
]);

useEffect(()=>{
  console.log("Raj",messages);
  msgEnd.current.scrollIntoView();
},[messages]);



  const handlesend = async () => {
    try {
      const user_input=input;
      setInput('');
      setMessages([
        ...messages,
        {text:user_input ,isBot:false}
      ]);

      
      //  gemini_model_call();
        // const res = await sendMsgToOpenAI(text1);
        const res = await gemini_model_call(user_input);
        // data  = {
        //         user:user_input,
        //         bot:res
        //         }

        setMessages([
          ...messages,
          {text:user_input, isBot:false},
          {text:res, isBot:true}
        ]);
        console.log(setMessages);
        
    } catch (error) {
        console.error('Error:', error);
    }
};

const handleEnter=async (e)=>{
  if(e.key ==='Enter') await handlesend();
   
}


  return (

    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="gptlogo" className="logo" /><span className="brand">AI INTERACT</span></div>

          <button className="midBtn btn btn-primary" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new Chat" className="addBtn" />New Chat</button>

          {/* <div className="upperSideBottom">
            <button className="query"><img src={msgIcon} alt="Query" className="logo" />What is Programming ?</button>

            <button className="query"><img src={msgIcon} alt="Query" className="logo" />How to use an API ?</button>
          </div> */}




        </div>
        <div className="lowerside">
          {/* <div className="listItems"><img src={home} alt="home" className="listItemsImage" />Home</div>
          <div className="listItems"><img src={saved} alt="bookmark" className="listItemsImage" />Saved</div>
          <div className="listItems"><img src={rocket} alt="rocket" className="listItemsImage" />Upgrade</div> */}
          <button type="button" className="btn btn-success listItems">Save</button>

        </div>

      </div>
      <div className="main">
        <div className="chats">

          {messages.map((message,i)=>
            <div key={i} className={message.isBot?"chat bot":"chat"} >
            <img className="chatImg" src={message.isBot?chatbot:userIcon1} alt="userIcon" /><p className="txt">{message.text}</p>
          </div>
          )}
          <div ref={msgEnd} />



        </div>
        <div className="chatFooter">
    <div className="inp">
        <input 
            type="text" 
            placeholder='Send a message' 
            value={input} 
            onKeyDown={handleEnter} 
            onChange={(e)=>{setInput(e.target.value)}}  
        />
        <button className='send' onClick={handlesend}>
            <img src={sendBtn} alt="send" />
        </button>
    </div>
    
    <p>ChatGPT may produce incorrect result</p>
</div>

      </div>
    </div>
  );
}

export default App;
