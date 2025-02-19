import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const NewPostForm = () => {
    const [newPost, setNewPost] = useState("");
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handlePost = async () => {
        if (newPost.trim() === "" && !image) return;

        setUploading(true);
        let imageUrl = "";

        try {
            if (image) {
                // Correct Firebase Storage Upload Request
                const imageRef = ref(storage, `images/${uuidv4()}_${image.name}`);
                const uploadTask = uploadBytesResumable(imageRef, image);

                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            // Optional: Track Upload Progress
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`Upload is ${progress}% done`);
                        },
                        (error) => reject(error),
                        async () => {
                            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve();
                        }
                    );
                });
            }

            // Save post to Firestore
            await addDoc(collection(db, "posts"), {
                text: newPost,
                imageUrl: imageUrl,
                likes: 0,
                comments: [],
                timestamp: serverTimestamp(),
            });

            setNewPost("");
            setImage(null);
            setUploading(false);
            navigate("/");
        } catch (error) {
            console.error("Error uploading file: ", error);
            setUploading(false);
        }
    };

    return (
        <div className="post-form">
            <input
                type="text"
                placeholder="Share your experience..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handlePost} disabled={uploading}>
                {uploading ? "Uploading..." : <><i className="fa-solid fa-circle-plus"></i> Post</>}
            </button>
        </div>
    );
};

export default NewPostForm;
