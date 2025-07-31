using CoreBackend.DataLayer.Model;

namespace CoreBackend.DataLayer.ResponseModel
{
    public class PostResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public Post? Post { get; set; }
    }

    public class PostsListResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public List<Post> Posts { get; set; }
    }
}
