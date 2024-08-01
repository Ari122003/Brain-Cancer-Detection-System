"use client";

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const sendPhoto = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data.result); 
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={sendPhoto}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Click</button>
      </form>
    </>
  );
}
