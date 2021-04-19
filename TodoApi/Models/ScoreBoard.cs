using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public class ScoreBoard
    {
        [Key]
        public long PlayerId { get; set; }
        public string PlayerName { get; set; }
        public string FramesData { get; set; }
        public int TotalScore { get; set; }

    }
}
