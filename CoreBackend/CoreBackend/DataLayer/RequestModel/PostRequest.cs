using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace CoreBackend.DataLayer.RequestModel
{
    public class CreatePostRequest : BaseRequest
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public IFormFile Image { get; set; }
    }

    public class UpdatePostRequest
    {
        public string Title { get; set; }
        public string Content { get; set; }
    }

}
