using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public class BowlingGame
    {
        public bool isSpare(int roll1, int roll2)
        {
            if ((roll1 + roll2) == 10)
                return true;
            else
                return false;
        }

        public bool isStrike(int roll1, int roll2)
        {
            if (roll1 == 10)
                return true;
            else
                return false;
        }

    }
}
