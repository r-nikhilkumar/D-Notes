import React, { useEffect, useState } from "react";
import "./editor.css";
import Markdown from "react-markdown";
import { MentionsInput, Mention } from "react-mentions";

function Editor() {
  const [title, setTitle] = useState("");
  const [mark, setMarkdown] = useState("");
  const [users, setUsers] = useState([]);

  const fun = async () => {
    fetch("http://localhost:8000/getusers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: window.localStorage.getItem("id"),
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        // console.log(resJson);
        const dataset = new Set(users)
        resJson.users.map((user) => {
          const data = {
            id: user.id,
            display: user.username,
          };
          dataset.add(data)
        });
        setUsers([...dataset])
      });
  };
  useEffect(() => {
    fun();
  }, []);

  const [file, setFile] = useState<any>(null);

  const handleUpload = (event: any) => {
    event.preventDefault();
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    const id: any = window.localStorage.getItem("id");
    if (title.length == 0) {
      alert("Provide the title!");
      return;
    }
    if (!id) {
      alert("User required!");
      return;
    }
    formData.append("title", title);
    formData.append("user", id);
    formData.append("notes", mark);
    if (file) {
      formData.append("file", file);
    }

    const options = {
      method: "POST",
      body: formData,
    };

    const res = await fetch("http://127.0.0.1:8000/notes/create/", options);
    const resJson = await res.json();
    if (resJson.status == "ok") {
      alert("Notes saved in backend/database!");
      setTitle("");
      setMarkdown("");
      setFile(null);
    }else{
      alert(resJson.data)
    }
  };

  return (
    <div className="center-div">
      <div className="left-side">
          <div>
            <input
              className="title-input"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <MentionsInput
            className="markdown-input center-div"
            value={mark}
            placeholder="Write something!"
            onChange={(e) => setMarkdown(e.target.value)}
            style={{ color: "black" }}
          >
            <Mention trigger="@" data={users}></Mention>
          </MentionsInput>
      </div>
      <div className="title-preview">
            <h2>{title}</h2>
          </div>
      <div className="right-side">
        
          <Markdown className="insideEditor">{mark}</Markdown>
        </div>
      {/* )} */}
      <div className="upload-button">
        <input type="file" onChange={handleUpload} />
      </div>
      <button className="submit" onClick={handleOnSubmit} disabled={mark=="" || !file || title==""}>
        Submit
      </button>
    </div>
  );
}

export default Editor;
