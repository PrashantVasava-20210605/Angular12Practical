using AngularApplicationTest.Models;
using AngularApplicationTest.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplicationTest.Controllers
{
    [Route("api/[controller]")]
    public class LinkedInController : Controller
    {
        ILinkedInRepository _linkedInRepository;

        public LinkedInController(ILinkedInRepository linkedInRepository)
        {
            _linkedInRepository = linkedInRepository;
        }

        [Route("posts")]
        [HttpGet]
        public async Task<List<PostView>> ListPost()
        {
            return await _linkedInRepository.ListPost();
        }

        [Route("posts")]
        [HttpPost]
        public async Task<int> AddPost([FromBody]Post post)
        {
            return await _linkedInRepository.AddPost(post);
        }

        [Route("posts/{postId}")]
        [HttpPut]
        public async Task UpdatePost([FromRoute] int postId, [FromBody] Post post)
        {
            await _linkedInRepository.UpdatePost(postId, post);
        }

        [Route("posts/{postId}")]
        [HttpDelete]
        public async Task DeletePost([FromRoute] int postId)
        {
            await _linkedInRepository.DeletePost(postId);
        }

        [Route("posts/{postId}/like")]
        [HttpPost]
        public async Task LikePost([FromRoute] int postId)
        {
            await _linkedInRepository.LikePost(postId);
        }

        [Route("posts/{postId}/comments")]
        [HttpGet]
        public async Task<List<Comment>> ListComment(int postId)
        {
            return await _linkedInRepository.ListComment(postId);
        }

        [Route("posts/{postId}/comments")]
        [HttpPost]
        public async Task<int> AddComent(int postId, Comment comment)
        {
            return await _linkedInRepository.AddComent(postId, comment);
        }

        [Route("posts/{postId}/comments/{commentId}")]
        [HttpPut]
        public async Task UpdateComment(int postId, int commentId, Comment comment)
        {
            await _linkedInRepository.UpdateComment(postId, commentId, comment);
        }

        [Route("posts/{postId}/comments/{commentId}")]
        [HttpDelete]
        public async Task DeleteComment(int postId, int commentId)
        {
            await _linkedInRepository.DeleteComment(postId, commentId);
        }

    }
}
