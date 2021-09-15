using AngularApplicationTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplicationTest.Repositories
{
    public interface ILinkedInRepository
    {
        Task<List<PostView>> ListPost();
        Task<Post> GetPostById(int postId);
        Task<int> AddPost(Post post);
        Task UpdatePost(int postId, Post post);
        Task DeletePost(int postId);
        Task<int> LikePost(int postId);
        Task<List<Comment>> ListComment(int postId);
        Task<int> AddComent(int postId, Comment comment);
        Task UpdateComment(int postId, int commentId, Comment comment);
        Task DeleteComment(int postId, int commentId);
    }
}
