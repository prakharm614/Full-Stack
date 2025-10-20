import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  // -------------------- STATE VARIABLES --------------------
  // 'length' stores the password length (default: 8)
  const [length, setLength] = useState(8)

  // 'numberAllowed' determines if numbers can be used in password
  const [numberAllowed, setNumberAllowed] = useState(false);

  // 'charAllowed' determines if special characters are allowed
  const [charAllowed, setCharAllowed] = useState(false)

  // 'password' stores the final generated password
  const [password, setPassword] = useState("")

  // -------------------- REF HOOK --------------------
  // useRef gives direct access to the input field (to select/copy text)
  const passwordRef = useRef(null)


  // -------------------- PASSWORD GENERATOR --------------------
  // useCallback ensures this function is memoized and doesn’t get recreated
  // every time the component re-renders unnecessarily.
  const passwordGenerator = useCallback(() => {
    let pass = ""   // to store generated password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" // base character set

    // add numbers if 'numberAllowed' is true
    if (numberAllowed) str += "0123456789"

    // add special characters if 'charAllowed' is true
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    // generate password using random selection
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charIndex)
    }

    // update the password state
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])
  // dependencies ensure regeneration when these values change


  // -------------------- COPY PASSWORD FUNCTION --------------------
  const copyPasswordToClipboard = useCallback(() => {
    // select text inside input box
    passwordRef.current?.select();

    // in case of mobile devices, ensures full selection
    passwordRef.current?.setSelectionRange(0, 999);

    // copy to clipboard
    window.navigator.clipboard.writeText(password);
  }, [password]);


  // -------------------- USE EFFECT --------------------
  // Automatically generate password whenever:
  // length, numberAllowed, or charAllowed changes
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);


  // -------------------- UI (RETURN PART) --------------------
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password Generator</h1>

      {/* Input + Copy Button */}
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}   // reference to access this input
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >
          Copy
        </button>
      </div>

      {/* Controls Section */}
      <div className='flex text-sm gap-x-2'>

        {/* Length Slider */}
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>

        {/* Checkbox: Numbers */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        {/* Checkbox: Characters */}
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
