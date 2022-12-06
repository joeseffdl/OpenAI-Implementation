import Head from 'next/head'
import { useState } from "react"
import { toast } from "react-toastify"
import validator from "validator"

export default function Home() {
  // Use State
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();
  console.log(result)

  async function onSubmit(e) {
    // Prevents the page from reloading when submitting the form
    e.preventDefault();

    // Check if the input field is empty
    if (validator.isEmpty(textInput)) {
      toast.error("Please enter a profession ☹️")
      return
    }
    
    // Use API to generate a response
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: textInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setTextInput("");
  }

  return (
    <>
      <Head>
        <title>Open AI - GPT 3</title>
        <meta name="description" content="Open AI Implementation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-green-300 to-cyan-300">
        <div className="w-max h-max border-4 border-black bg-slate-100 m-10 p-5 shadow-2xl rounded-xl">
          <form className="w-full flex flex-col justify-center items-center px-5" onSubmit={onSubmit}>
            <h2 className="font-bold text-center text-3xl">Open AI - Text&nbsp;Davinci&nbsp;003 Implementation</h2>
            <h3 className="font-semibold text-center text-xl mx-2 my-5">Important skills in a Profession</h3>
            <input
              className={`w-full p-2 rounded-md focus:outline-none focus:border-2 focus:border-yellow-300 ${textInput != "" ? 'border-2 border-green-300' : 'border-2 border-red-300'}`}
              type="text"
              name="profession"
              placeholder="Type in a profession"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <button className="w-full flex border-2 border-black rounded-full mt-5 items-center justify-center p-2 font-semibold hover:border-green-600 hover:text-green-600 hover:scale-105 duration-300 ease-in-out" type="submit">Generate Skills</button>
            <div className="flex list-disc list-inside p-5">
              {result}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
