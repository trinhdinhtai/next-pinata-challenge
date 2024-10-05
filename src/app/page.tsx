"use client"

import { useRef, useState } from "react"

export default function Home() {
  const [file, setFile] = useState("")
  const [url, setUrl] = useState("")
  const [uploading, setUploading] = useState(false)
  const inputFile = useRef(null)

  const uploadFile = async () => {
    try {
      setUploading(true)
      const data = new FormData()
      data.set("file", file)
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      })
      const signedUrl = await uploadRequest.json()
      setUrl(signedUrl)
      setUploading(false)
    } catch (e) {
      console.log(e)
      setUploading(false)
      alert("Trouble uploading file")
    }
  }

  const handleChange = (e: any) => {
    setFile(e.target.files[0])
  }

  return (
    <main className="m-auto flex min-h-screen max-w-[500px] flex-col items-center justify-center gap-4">
      <input type="file" id="file" ref={inputFile} onChange={handleChange} />
      <button
        className="rounded-md bg-white p-2 text-black"
        disabled={uploading}
        onClick={uploadFile}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {url && (
        <a href={url} className="underline" target="_blank">
          {url}
        </a>
      )}
    </main>
  )
}
