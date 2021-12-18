import { useState } from "react"

export const MessageBox = ({ messages }) => {
  return (
    <>
    <div className="h-full w-full flex flex-col">
      {messages.map((message, index) => (
        <div key={index} className="flex flex-col items-center justify-center w-full h-full">
          <p>{message.body}</p>
        </div>
      ))}
    </div>
    </>
  )
}
