using AngularApplicationTest.Models;
using AngularApplicationTest.Repositories;
using AngularApplicationTest.ServiceLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplicationTest.Controllers
{
    [Route("api/[controller]")]
    public class LinkedInController : Controller
    {
        ILinkedInService _linkedInService;

        public LinkedInController(ILinkedInService linkedInService)
        {
            _linkedInService = linkedInService;
        }

        [Route("posts")]
        [HttpGet]
        public async Task<List<PostView>> ListPost()
        {
            return await _linkedInService.ListPost();
        }

        [Route("posts/{postId}")]
        [HttpGet]
        public async Task<Post> GetPostById(int postId)
        {
            return await _linkedInService.GetPostById(postId);
        }

        [Route("posts")]
        [HttpPost]
        public async Task<int> AddPost([FromForm] IFormFile file, [FromForm] string postJson)
        {
            var post = JsonConvert.DeserializeObject<Post>(postJson);
            return await _linkedInService.AddPost(post, file);
        }

        [Route("posts/{postId}")]
        [HttpPut]
        public async Task UpdatePost([FromRoute] int postId, [FromForm] IFormFile file, [FromForm] string postJson)
        {
            var post = JsonConvert.DeserializeObject<Post>(postJson);
            await _linkedInService.UpdatePost(postId, post, file);
        }

        [Route("posts/{postId}")]
        [HttpDelete]
        public async Task DeletePost([FromRoute] int postId)
        {
            await _linkedInService.DeletePost(postId);
        }

        [Route("posts/{postId}/like")]
        [HttpPost]
        public async Task LikePost([FromRoute] int postId)
        {
            await _linkedInService.LikePost(postId);
        }

        [Route("posts/{postId}/comments")]
        [HttpGet]
        public async Task<List<Comment>> ListComment([FromRoute] int postId)
        {
            return await _linkedInService.ListComment(postId);
        }

        [Route("posts/{postId}/comments/{commentId}")]
        [HttpGet]
        public async Task<Comment> GetCommentId(int postId, int commentId)
        {
            return await _linkedInService.GetCommentById(postId, commentId);
        }

        [Route("posts/{postId}/comments")]
        [HttpPost]
        public async Task<int> AddComent(int postId, Comment comment)
        {
            return await _linkedInService.AddComent(postId, comment);
        }

        [Route("posts/{postId}/comments/{commentId}")]
        [HttpPut]
        public async Task UpdateComment(int postId, int commentId, Comment comment)
        {
            await _linkedInService.UpdateComment(postId, commentId, comment);
        }

        [Route("posts/{postId}/comments/{commentId}")]
        [HttpDelete]
        public async Task DeleteComment(int postId, int commentId)
        {
            await _linkedInService.DeleteComment(postId, commentId);
        }

    }
}
