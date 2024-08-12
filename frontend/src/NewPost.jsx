import styles from "./NewPost.Module.css";
import { BASE_URL } from "./App";
import { useState } from "react";

export default function NewPost() {
  const [image, setImage] = useState(null);
  const [creator, setCreator] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreate = (e) => {
    e?.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch(BASE_URL + "/post/image", requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        createPost(data.filename);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setImage(null);
        document.getElementById("fileInput").value = null;
      });
  };

  const createPost = (imageUrl) => {
    const json_string = JSON.stringify({
      image_url: imageUrl,
      title: title,
      content: text,
      creator: creator,
    });
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: json_string,
    };

    fetch(BASE_URL + "/post", requestOptions)
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        window.location.reload();
        window.scrollTo(0, 0);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.newpost_content}>
      <div className={styles.newpost_image}>
        <input type="file" id="fileInput" onChange={handleImageUpload} />
      </div>
      <div className={styles.newpost_creator}>
        <input
          type="text"
          id="creator_input"
          placeholder="Creator"
          onChange={(event) => setCreator(event.target.value)}
          value={creator}
          className={styles.newpost_creator}
        />
      </div>
      <div className={styles.newpost_title}>
        <input
          type="text"
          id="title_input"
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          className={styles.newpost_title}
        />
      </div>
      <div class={styles.newpost_text}>
        <textarea
          type="text"
          id="content_input"
          placeholder="Content"
          onChange={(event) => setText(event.target.value)}
          value={text}
          rows={10}
          className={styles.newpost_text}
        />
      </div>
      <div>
        <button className={styles.create_button} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}
