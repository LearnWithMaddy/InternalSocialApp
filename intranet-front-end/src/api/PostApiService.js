import BaseRequestService from './BaseApiService.js';

const UserPostApiService = {
    // Create a post (with image upload)
    createPost: (formData) => {
        return BaseRequestService.post('/post/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // Get all posts (public)
    getAllPosts: () => {
        return BaseRequestService.get('/post/all');
    },

    // Get single post by ID
    getPostById: (postId) => {
        return BaseRequestService.get(`/post/${postId}`);
    },

    // Get logged-in user's posts (requires Authorization)
    getUserPosts: () => {
        return BaseRequestService.get('/post/user');
    },

    // Update post by ID
    updatePost: (postId, data) => {
        return BaseRequestService.put(`/post/update/${postId}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },

    // Delete post by ID
    deletePost: (postId) => {
        return BaseRequestService.delete(`/post/delete/${postId}`);
    },
};

export default UserPostApiService;
