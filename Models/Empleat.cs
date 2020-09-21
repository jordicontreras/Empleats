using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Empleats.Models
{
    public class Empleat
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public double Salary { get; set; }
        public string Role { get; set; }
    }
}
