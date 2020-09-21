using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Empleats.Models
{
    public class EmpleatsContext : DbContext
    {
        public EmpleatsContext(DbContextOptions<EmpleatsContext> options)
            : base(options)
        {
        }

        public DbSet<Empleat> Empleats { get; set; }
    }
}
