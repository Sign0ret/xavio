"use client";
import React from 'react'
import { useState } from 'react';

export default function UploadPDF() {
  // components/UploadForm.js
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
// @ts-ignore
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
// @ts-ignore
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // @ts-ignore
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('File uploaded successfully');
    } else {
      setMessage('Error uploading file');
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};



