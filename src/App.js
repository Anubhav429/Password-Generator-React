import { useState , useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const[length, setLength]= useState(8);
  const[numberAllowed, setNumberAllowed] = useState(false);
  const[CharAllowed, setCharAllowed]= useState(false);
  const[Password, setPassword] = useState("")
  // useRef hook
  const PasswordRef = useRef(null)

  // useCallback HOOK for reuseable code on re rendering
  const PasswordGenerator = useCallback(()=>{
    let pass = ""
    let str = 
    "ABCDEFGHIJKLNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(CharAllowed) str+= "!@#$%^&*_+[]~`"

    for(let i=1; i<length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length, numberAllowed, CharAllowed , setPassword])
  
  const copyPasswordToclipboard = useCallback(()=>{
    PasswordRef.current?.select();
    PasswordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(Password)
  },[Password])



//  agr inme se kuch bhi chedchaad ho toh dobara run kr do
// call kr rha jise ui pr dikheega change
  useEffect(()=>{
    PasswordGenerator()
  },[length, numberAllowed,CharAllowed,PasswordGenerator])
 
  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
     <h1 className="text-center text-white my-3">Password generator</h1>
     <div className="flex shadow-sm rounded-lg overflow-hidden mb-4">
      <input
       type="text" 
       value={Password}
       className="outline-none w-full py-1 px-3"
       placeholder="password"
       readOnly
       ref={PasswordRef}
      />

      <button 
       onClick={copyPasswordToclipboard}
       className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
        Copy
      </button>
     </div>
     <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input
         type="range"
         min={6}
         max={100}
         value={length}
         className="cursor-pointer"
         onChange={(e)=>{setLength(e.target.value)}}   
        />
        <label>Length:{length}</label>
      </div>

      <div className="flex items-center gap-x-1">
        <input 
         type="checkbox"
         defaultChecked={numberAllowed}
         id="numberInput"
         onChange={()=>{
          setNumberAllowed((prev)=> !prev);
         }}
          />
          <label htmlFor="numberInput">Numbers</label>

      </div>

      <div className="flex items-center gap-x-1">
        <input 
         type="checkbox"
         defaultChecked={CharAllowed}
         id="characterInput"
         onChange={()=>{
          setCharAllowed((prev)=> !prev);
          }}
        />
        <label htmlFor="characterInput">Characters</label>

      </div>

     </div>


    </div>
  

    </>
  );
}

export default App;
