using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplicationTest.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime PostedOn { get; set; }
        public string ImageFileName { get; set; }
    }

    public class PostView: Post
    {
        public int LikeCount { get; set; }
        public int CommentCount { get; set; }
    }

}
