using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplicationTest.Models
{
    public class PostLike
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public DateTime? LikedOn { get; set; }
    }
}
