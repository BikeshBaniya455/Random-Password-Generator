import { useState,useCallback,useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState('')

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "~!@#$%^&*()_+{}[]"

    for(let i = 1;i<= length;i++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
     }
     setPassword(pass)
  },[length,numberAllowed,charAllowed])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto rounded-lg
      px-4 py-5 my-8 text-orange-500 bg-gray-800 '>
        <h1 className='text-2xl text-center text-white font-bold mb-4'>Password Generator</h1>
        <div className='flex gap-1 shadow-rounded-lg overflow-hidden mb-4'>
          <input type='text'
           value={password} 
           className='w-full bg-gray-700 text-white px-3 py-2 outline-none
          rounded-xl' 
          placeholder='Password'
           readOnly
           ref={passwordRef}/>
          <button onClick={copyPasswordToClipboard} 
          className='outline-none bg-blue-600 hover:bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-xl'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'> 
            <input type='range'
             min={8}
              max={35} 
              value={length} 
              className='cursor-pointer'
              onChange={(e)=>setLength(e.target.value)}></input>
          
            <label>Length : {length} </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' 
            defaultChecked={numberAllowed}
            id = "numberInput"
            onChange={()=>{
              setNumberAllowed((prev) =>!prev)
            }}
            
            />
            <label htmlFor='numberInput'>Numbers</label>

          </div>
              <div className='flex items-center gap-x-1'>
            <input type='checkbox'
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={()=>{
              setCharAllowed((prev) =>!prev)
            }}
            />
            <label htmlFor='characterInput'>Characters</label>
              </div>
          
        </div>


      </div>
    </>
  )
}

export default App
