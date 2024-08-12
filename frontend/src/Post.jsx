import styles from "./Post.module.css";
import { BASE_URL } from "./App";

export default function Post({ post }) {
  const handleDelete = (e) => {
    e?.preventDefault();
    const requestOptions = {
      method: "DELETE",
    };
    fetch(BASE_URL + `/post/${post.id}`, requestOptions)
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
    <div className={styles.post}>
      <img
        src={`${BASE_URL}/${post.image_url}`}
        alt="Blog image"
        className={styles.post_img}
      />
      <div className={styles.post_cotent}>
        <div className={styles.post_title}>{post.title}</div>
        <div className={styles.post_creator}>by {post.creator}</div>
        <div className={styles.post_text}>{post.content}</div>
        <div className={styles.post_delete}>
          <button onClick={handleDelete}>Delete post</button>
        </div>
      </div>
    </div>
  );
}
