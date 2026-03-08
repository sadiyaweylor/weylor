"use client"

import { useState } from "react";

export default function NewsletterAdmin() {

  const [subject,setSubject] = useState("");
  const [content,setContent] = useState("");
  const [image,setImage] = useState("");
  const [sent,setSent] = useState(false);

  const sendNewsletter = async () => {

    await fetch("/api/send-newsletter",{
      method:"POST",
      body: JSON.stringify({
        subject,
        content,
        image
      })
    });

    setSent(true);
  };

  return (

    <div className="max-w-2xl mx-auto py-20 px-6">

      <h1 className="text-3xl mb-10">Send Newsletter</h1>

      <input
        placeholder="Subject"
        value={subject}
        onChange={(e)=>setSubject(e.target.value)}
        className="w-full border p-3 mb-4"
      />

      <input
        placeholder="Image URL"
        value={image}
        onChange={(e)=>setImage(e.target.value)}
        className="w-full border p-3 mb-4"
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        className="w-full border p-3 mb-6 h-40"
      />

      <button
        onClick={sendNewsletter}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Send Newsletter
      </button>

      {sent && (
        <p className="mt-6 text-green-600">
          Newsletter sent successfully
        </p>
      )}

    </div>

  );
}