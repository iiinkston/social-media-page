import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, increment } from "firebase/firestore";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "posts"));
            const postsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            postsArray.sort((a, b) => b.likes - a.likes);
            setPosts(postsArray);
        };
        fetchPosts();
    }, []);

    const handleLike = async (id) => {
        const postRef = doc(db, "posts", id);
        await updateDoc(postRef, { likes: increment(1) });
        window.location.reload();
    };

    return (
        <div className="post-list">
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <p>{post.text}</p>
                    <div className="post-actions">
                        <button onClick={() => handleLike(post.id)}>
                            <i className="fa-regular fa-thumbs-up"></i> {post.likes}
                        </button>
                        <button>
                            <i className="fa-solid fa-comment-dots"></i> Comment
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;