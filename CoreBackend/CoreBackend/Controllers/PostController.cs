using CoreBackend.BLLayer.Service;
using CoreBackend.DataLayer.RequestModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CoreBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize] // Controller-level authorization
    public class PostController : BaseController
    {
        private readonly PostService _postService;

        public PostController(PostService postService)
        {
            _postService = postService;
        }

        [HttpPost("create")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreatePost([FromForm] CreatePostRequest request)
        {
            var userId = GetUserIdFromToken();
            var result = await _postService.CreatePostAsync(request, userId);
            return Ok(new { message = "Post created successfully." });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _postService.GetPostByIdAsync(id);
            if (post == null)
                return NotFound(new { message = "Post not found." });

            return Ok(post);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _postService.GetAllPostsAsync();
            return Ok(posts);
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUserPosts()
        {
            var userId = GetUserIdFromToken();
            var posts = await _postService.GetUserPostsAsync(userId);
            return Ok(posts);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] UpdatePostRequest request)
        {
            var userId = GetUserIdFromToken();
            var result = await _postService.UpdatePostAsync(id, userId, request);
            return Ok(new { message = "Post updated successfully." });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var userId = GetUserIdFromToken();
            var result = await _postService.DeletePostAsync(id, userId);
            return Ok(new { message = "Post deleted successfully." });
        }
    }
}
