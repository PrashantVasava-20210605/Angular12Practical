using AngularApplicationTest.Models;
using AngularApplicationTest.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplicationTest.ServiceLayer
{
    public class LinkedInService: ILinkedInService
    {
        private ILinkedInRepository _linkedInRepository;
        private IWebHostEnvironment _environment;

        public LinkedInService(ILinkedInRepository linkedInRepository, IWebHostEnvironment environment)
        {
            _linkedInRepository = linkedInRepository;
            _environment = environment;
        }

        public async Task<List<PostView>> ListPost()
        {
            return await _linkedInRepository.ListPost();
        }

        public async Task<Post> GetPostById(int postId)
        {
            return await _linkedInRepository.GetPostById(postId);
        }


        public async Task<int> AddPost(Post post, IFormFile file)
        {
            // Save File
            if (file!=null && !string.IsNullOrWhiteSpace(file.FileName))
            {
                string fileName = SaveFile(file);
                post.ImageFileName = fileName;
            }

            // Save record
            return await _linkedInRepository.AddPost(post);
        }

        public async Task UpdatePost(int postId, Post post, IFormFile file)
        {
            // Save File
            if (file != null && !string.IsNullOrWhiteSpace(file.FileName))
            {
                string fileName = SaveFile(file);
                post.ImageFileName = fileName;
            }

            // Check need to delete old file
            string fileToDelete = null;
            if ((file != null && !string.IsNullOrWhiteSpace(file.FileName)) || string.IsNullOrWhiteSpace(post.ImageFileName))
            {
                var postDB = await _linkedInRepository.GetPostById(postId);
                fileToDelete = postDB.ImageFileName;
            }

            // Edit record
            await _linkedInRepository.UpdatePost(postId, post);

            // Delete file
            if (!string.IsNullOrWhiteSpace(fileToDelete))
            {
                deleteFile(fileToDelete);
            }
        }

        public async Task DeletePost(int postId)
        {
            var post = await _linkedInRepository.GetPostById(postId);
            await _linkedInRepository.DeletePost(postId);

            // delete image
            if (!string.IsNullOrWhiteSpace(post.ImageFileName))
            {
                deleteFile(post.ImageFileName);
            }

        }

        public async Task<int> LikePost(int postId)
        {
            return await _linkedInRepository.LikePost(postId);
        }

        public async Task<List<Comment>> ListComment(int postId)
        {
            return await _linkedInRepository.ListComment(postId);
        }

        public async Task<Comment> GetCommentById(int postId, int commentId)
        {
            return await _linkedInRepository.GetCommentById(postId, commentId);
        }

        public async Task<int> AddComent(int postId, Comment comment)
        {
            return await _linkedInRepository.AddComent(postId, comment);
        }

        public async Task UpdateComment(int postId, int commentId, Comment comment)
        {
            await _linkedInRepository.UpdateComment(postId, commentId, comment);
        }
        public async Task DeleteComment(int postId, int commentId)
        {
            await _linkedInRepository.DeleteComment(postId, commentId);
        }

        private string SaveFile(IFormFile file)
        {
            string wwwPath = _environment.WebRootPath;
            
            string path = Path.Combine(wwwPath, "images");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            string ext = Path.GetExtension(file.FileName);
            string fileName = Path.GetRandomFileName() + ext;
            using(FileStream stream = new FileStream(Path.Combine(path, fileName), FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return fileName;
        }

        private void deleteFile(string fileName)
        {
            
            string wwwPath = _environment.WebRootPath;

            string path = Path.Combine(wwwPath, "images", fileName);
            if (File.Exists(path))
            {
                File.Delete(path);
            }
        }

    }
}
