using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public class ScoreBoardContext : DbContext
    {

        public ScoreBoardContext(DbContextOptions<ScoreBoardContext> options) : base(options)
        {
        }

        public DbSet<ScoreBoard> ScoreBoardList { get; set; }

    }
}
