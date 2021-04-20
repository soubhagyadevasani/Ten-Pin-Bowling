using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public class Frames
    {
        public List<Frame> frames { get; set; }

    }

    public class Frame
    {
        public int Roll_1 { get; set; }

        public int Roll_2 { get; set; }
    }
}
