using AngularApplicationTest.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplicationTest.ServiceLayer
{
    public interface ILinkedInService
    {
        Task<List<PostView>> ListPost();
        Task<Post> GetPostById(int postId);
        Task<int> AddPost(Post post, IFormFile file);
        Task UpdatePost(int postId, Post post, IFormFile file);
        Task DeletePost(int postId);
        Task<int> LikePost(int postId);
        Task<List<Comment>> ListComment(int postId);
        Task<Comment> GetCommentById(int postId, int commentId);
        Task<int> AddComent(int postId, Comment comment);
        Task UpdateComment(int postId, int commentId, Comment comment);
        Task DeleteComment(int postId, int commentId);
    }
}
