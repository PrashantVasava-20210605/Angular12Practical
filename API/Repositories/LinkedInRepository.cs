using AngularApplicationTest.DataAccess;
using AngularApplicationTest.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplicationTest.Repositories
{
    
    public class LinkedInRepository: ILinkedInRepository
    {
        private Context _context;

        public LinkedInRepository(Context context)
        {
            _context = context;
        }
        
        public async Task<List<PostView>> ListPost()
        {
            var query = _context.Posts
                .OrderByDescending(post => post.PostedOn)
                .Select(post => new PostView()
                {
                    Id = post.Id,
                    Content = post.Content,
                    ImageFileName = post.ImageFileName,
                    PostedOn = post.PostedOn,
                    CommentCount = _context.Comments.Where(comment => comment.PostId == post.Id).Count(),
                    LikeCount = _context.PostLikes.Where(like => like.PostId == post.Id).Count()
                });

            return await query.ToListAsync();
        }

        public Task<Post> GetPostById(int postId)
        {
            return _context.Posts.FirstOrDefaultAsync(x => x.Id == postId);
        }
        
        public async Task<int> AddPost(Post post)
        {
            post.PostedOn = DateTime.Now;
            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();
            return post.Id;
        }

        public async Task UpdatePost(int postId, Post post)
        {
            var postDB = await _context.Posts.FirstOrDefaultAsync(x => x.Id == postId);
            postDB.Content = post.Content;
            postDB.ImageFileName = post.ImageFileName;
            _context.Entry<Post>(postDB).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeletePost(int postId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Remove Comments
                var commentsDB = await _context.Comments.Where(x => x.PostId == postId).ToListAsync();
                foreach (var comment in commentsDB)
                {
                    _context.Comments.Remove(comment);
                }

                // Remove Likes
                var likesDB = await _context.PostLikes.Where(x => x.PostId == postId).ToListAsync();
                foreach (var like in likesDB)
                {
                    _context.PostLikes.Remove(like);
                }

                await _context.SaveChangesAsync();

                // Remove Post
                var post = await _context.Posts.FirstOrDefaultAsync(x => x.Id == postId);
                _context.Posts.Remove(post);

                await _context.SaveChangesAsync();

                transaction.Commit();

            }
            catch(Exception ex)
            {
                transaction.Rollback();
                throw ex;
            }
            
        }

        public async Task<int> LikePost(int postId)
        {
            PostLike postLike = new PostLike();
            postLike.PostId = postId;
            postLike.LikedOn = DateTime.Now;
            await _context.PostLikes.AddAsync(postLike);
            await _context.SaveChangesAsync();
            return postLike.Id;
        }



        public async Task<List<Comment>> ListComment(int postId)
        {
            return await _context.Comments.Where(x => x.PostId == postId).OrderByDescending(x => x.PostedOn).ToListAsync();
        }

        public async Task<Comment> GetCommentById(int postId, int commentId)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(x => x.PostId == postId && x.Id == commentId);
            return comment;
        }

        public async Task<int> AddComent(int postId, Comment comment)
        {
            comment.PostId = postId;
            comment.PostedOn = DateTime.Now;
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment.Id;
        }

        public async Task UpdateComment(int postId, int commentId, Comment comment)
        {
            var commentDB = await _context.Comments.FirstOrDefaultAsync(x => x.PostId == postId && x.Id == commentId);
            if (commentDB==null)
            {
                return;
            }
            commentDB.Content = comment.Content;
            _context.Entry<Comment>(commentDB).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteComment(int postId, int commentId)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(x => x.PostId == postId && x.Id == commentId);
            if (comment==null)
            {
                return;
            }
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
        }
    }
}
