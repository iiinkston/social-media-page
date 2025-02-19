import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Post from "../components/Post";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsArray = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsArray);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    return (
        <div className="home">
            <h2>Home Feed</h2>
            {posts.length === 0 ? <p>No posts yet...</p> : posts.map(post => <Post key={post.id} post={post} />)}
        </div>
    );
};

export default Home;
