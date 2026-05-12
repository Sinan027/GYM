import React, { useState } from "react";
import axios from "axios";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // or wherever you store JWT

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    formData.append("image", file);

    try {
      await axios.post("http://localhost:5000/api/blogs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog created successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="text"
        placeholder="Author"
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button type="submit">Create Blog</button>
    </form>
  );
}

export default CreateBlog;