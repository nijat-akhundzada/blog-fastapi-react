import { useState, useEffect } from "react";
import styles from "./App.module.css";
import Post from "./Post";
import NewPost from "./NewPost";

export const BASE_URL = "http://127.0.0.1:8000";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/post/all`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className={styles.blog_title}>Open Info Blog</div>
      <div className="app_posts">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
      <div className={styles.new_post}>
        <NewPost />
      </div>
    </>
  );
}

export default App;
