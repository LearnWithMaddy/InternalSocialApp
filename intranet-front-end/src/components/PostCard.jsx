// src/components/PostCard.jsx
import {Link} from 'react-router-dom';

export default function PostCard({post}) {
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
    });

    return (
        <Link to={`/news/${post.id}`} className="block hover:shadow-lg transition">
            <div className="bg-white rounded-xl shadow overflow-hidden w-80">
                <div className="relative">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        {formattedDate}
                    </div>
                </div>
                <div className="p-4 space-y-2">
                    <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{post.body}</p>
                    <p className="text-xs text-gray-500">By {post.author}</p>
                </div>
            </div>
        </Link>
    );
}
