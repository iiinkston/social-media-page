// src/components/Comment.js
import React, { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const Comment = ({ postId, comments }) => {
    const [newComment, setNewComment] = useState("");

    const handleComment = async () => {
        if (newComment.trim() === "") return;
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
            comments: arrayUnion(newComment)
        });
        setNewComment("");
    };

    return (
        <div className="comment-section">
            <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleComment}>
                <i className="fa-solid fa-comment-dots"></i> Comment
            </button>
            <ul>
                {comments?.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default Comment;
