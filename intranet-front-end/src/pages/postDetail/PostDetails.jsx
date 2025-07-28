// src/pages/PostDetails.jsx
import {useParams} from 'react-router-dom';
import {useState} from 'react';
import {latestPosts} from "../../data/Posts.js";

const timestamp = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
});

export default function PostDetails() {
    const {id} = useParams();
    const postIndex = latestPosts.findIndex((p) => p.id === parseInt(id));
    const originalPost = latestPosts[postIndex];

    const [likes, setLikes] = useState(originalPost.likes);
    const [comments, setComments] = useState(
        (originalPost.comments || []).map((c) =>
            typeof c === 'string' ? {text: c, time: ''} : c
        )
    );
    const [newComment, setNewComment] = useState('');

    const handleLike = () => setLikes(likes + 1);

    const handleCommentSubmit = () => {
        if (!newComment.trim()) return;
        const updated = [...comments, {text: newComment.trim(), time: timestamp}];
        setComments(updated);
        setNewComment('');
    };

    if (!originalPost) return <div className="text-red-500">Post not found.</div>;

    return (
        <div className="w-full bg-white rounded-xl shadow p-6">
            <img src={originalPost.image} alt={originalPost.title} className="w-full h-96 object-cover rounded mb-6"/>
            <h1 className="text-3xl font-bold mb-2 text-blue-700">{originalPost.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
                By {originalPost.author} • {new Date(originalPost.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 text-lg mb-6">{originalPost.body}</p>

            {/* Like & Comment Stats */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={handleLike}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
                >
                    👍 Like ({likes})
                </button>
                <span className="text-sm text-gray-500">{comments.length} comment(s)</span>
            </div>

            {/* Comment Section */}
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Add a comment</h3>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    className="w-full p-2 border rounded mb-2 text-gray-800 placeholder-gray-500 bg-white"
                    placeholder="Write your comment here..."
                />

                <button
                    onClick={handleCommentSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Post
                </button>

                <div className="mt-6 space-y-4">
                    {comments.map((c, index) => (
                        <div key={index} className="p-3 bg-gray-50 border rounded">
                            <p className="text-sm text-gray-800 mb-1">{c.text}</p>
                            <p className="text-xs text-gray-500">{c.time}</p>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}
