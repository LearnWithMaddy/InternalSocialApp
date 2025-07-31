using CoreBackend.DataLayer.Model;
using CoreBackend.DataLayer.Repository;
using CoreBackend.DataLayer.RequestModel;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CoreBackend.BLLayer.Service
{
    public class PostService
    {
        private readonly PostRepository _postRepository;
        private readonly IWebHostEnvironment _env;

        public PostService(PostRepository postRepository, IWebHostEnvironment env)
        {
            _postRepository = postRepository;
            _env = env;
        }

        public async Task<bool> CreatePostAsync(CreatePostRequest request, int userId)
        {
            if (request.Image == null || request.Image.Length == 0)
                throw new InvalidOperationException("Image file is required and cannot be empty.");

            try
            {
                var baseFolder = Path.Combine(_env.ContentRootPath, "Content", "Posts", userId.ToString());
                if (!Directory.Exists(baseFolder))
                    Directory.CreateDirectory(baseFolder);

                var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(request.Image.FileName)}";
                var filePath = Path.Combine(baseFolder, uniqueFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.Image.CopyToAsync(stream);
                }

                var relativePath = Path.Combine("Content", "Posts", userId.ToString(), uniqueFileName)
                                      .Replace("\\", "/");

                var post = new Post
                {
                    Title = request.Title,
                    Content = request.Content,
                    UserId = userId,
                    ImageUrl = "/" + relativePath,
                    CreatedAt = DateTime.UtcNow
                };

                return await _postRepository.AddPostAsync(post);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while creating the post. " + ex.Message, ex);
            }
        }

        public async Task<Post?> GetPostByIdAsync(int postId)
        {
            return await _postRepository.GetPostByIdAsync(postId);
        }

        public async Task<IEnumerable<Post>> GetAllPostsAsync()
        {
            return await _postRepository.GetAllPostsAsync();
        }

        public async Task<IEnumerable<Post>> GetUserPostsAsync(int userId)
        {
            return await _postRepository.GetUserPostsByUserIdAsync(userId);
        }

        public async Task<bool> UpdatePostAsync(int postId, int userId, UpdatePostRequest request)
        {
            var post = await _postRepository.GetPostByIdAsync(postId);
            if (post == null)
                throw new Exception("Post not found.");

            if (post.UserId != userId)
                throw new UnauthorizedAccessException("You are not allowed to update this post.");

            post.Title = request.Title;
            post.Content = request.Content;
            post.UpdatedAt = DateTime.UtcNow;

            return await _postRepository.UpdatePostAsync(post);
        }

        public async Task<bool> DeletePostAsync(int postId, int userId)
        {
            var post = await _postRepository.GetPostByIdAsync(postId);
            if (post == null)
                throw new Exception("Post not found.");

            if (post.UserId != userId)
                throw new UnauthorizedAccessException("You are not allowed to delete this post.");

            var deleted = await _postRepository.DeletePostAsync(post);

            // Also delete the image file
            if (deleted && !string.IsNullOrEmpty(post.ImageUrl))
            {
                var absolutePath = Path.Combine(_env.ContentRootPath, post.ImageUrl.TrimStart('/').Replace("/", Path.DirectorySeparatorChar.ToString()));
                if (File.Exists(absolutePath))
                    File.Delete(absolutePath);
            }

            return deleted;
        }
    }
}
