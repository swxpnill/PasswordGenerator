
import { useCallback, useEffect, useRef, useState } from 'react';


function App() {

  const [length, setLength] = useState(8)
  const [numbAllow, setNumbAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbAllow) str += "0123456789"
    if (charAllow) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numbAllow, charAllow, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbAllow, charAllow, passwordGenerator])

  return (
    <>
      {/* <h1 className='text-4xl text-center px-12 text-white'>Password Generator</h1> */}

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-black-700">
        <h1 className="text-violet-500 text-center mx-0">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type='text'
            value={password}
            className="outline-none w-full py-1 px-3" placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-violet-500 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1 text-violet-500">
            <input type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1 text-violet-500">
            <input
              type="checkbox"
              defaultChecked={numbAllow}
              id="numbInput"
              onChange={() => {
                setNumbAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numbInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1 text-violet-500">
            <input
              type="checkbox"
              defaultChecked={charAllow}
              id="characterInput"
              onChange={() => {
                setCharAllow((prev) => !prev)
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
