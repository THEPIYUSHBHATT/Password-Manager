import { useRef, useState, useEffect } from 'react'

const MyUi = () => {
  const [passwordArray, setpasswordArray] = useState([])
  const [form, setform] = useState({ site: '', username: '', password: '' })

  useEffect(() => {
    let password = localStorage.getItem('password')
    let passwordArray
    if (password) {
      setpasswordArray(JSON.parse(password))
    }
  }, [])

  const ref = useRef()
  const passwordRef = useRef()
  const showPass = () => {
   passwordRef.current.type='text'
    if (ref.current.src.includes('icons/hide.png')) {
      ref.current.src = 'icons/eye.png'
      passwordRef.current.type = 'password'
    } else {
    
      ref.current.src = 'icons/hide.png'
         passwordRef.current.type = 'text'
     
    }
  }
  const savePassword = () => {
    setpasswordArray([...passwordArray, form])
    localStorage.setItem('password', JSON.stringify([...passwordArray, form]))
    console.log(passwordArray)
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className=" mycontainer">
        <h1 className="text-4xl text-white font-bold text-center">
          <span className="text-white">&lt;</span>
          Pass
          <span className="text-green-700">Up/&gt;</span>
        </h1>
        <p className="text-green-800 text-lg text-center font-bold">
          Your Own Password Manager
        </p>
        <div className="flex flex-col text-black p-4 gap-8 items-center ">
          <input
            name="site"
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website Url"
            type="text"
            className="rounded-full border-2 border-green-800 w-full p-4 py-1"
          />

          <div className="flex gap-8 justify-center w-full ">
            <input
              name="username"
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Your Username"
              type="text"
              className="rounded-full border-2 border-green-800 w-full p-4 py-1"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                name="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                type="password"
                className="rounded-full border-2 border-green-800 w-full p-4 py-1"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPass}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="rounded-full border-2 border-green-800 bg-white text-black flex justify-center items-center w-fit mx-auto p-2  gap-2 px-3 py-1 hover:bg-green-100 "
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            <span> Add Password</span>
          </button>
        </div>
        <div className="password">
          <h2 className="text-white font-bold font-mono text-2xl py-3">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-white font-semibold font-mono">
              {' '}
              No passwords to show{' '}
            </div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md ">
              <thead className="bg-green-800 text-white ">
                <tr>
                  <th className="py-">Site</th>
                  <th className="py-">Username</th>
                  <th className="py-">Password</th>
                </tr>
              </thead>
              <tbody className="bg-green-300">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center w-32 py-2 border border-black font-semibold">
                        <a href={item.site} target="_blank">
                          {' '}
                          {item.site}
                        </a>
                      </td>
                      <td className="text-center w-32 py-2 border border-black font-semibold">
                        {item.username}
                      </td>
                      <td className="text-center w-32 py-2 border border-black font-semibold">
                        {item.password}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}
export default MyUi
