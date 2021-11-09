using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ChatRoom.Data.Repositories
{
    public abstract class GenericRepository<T> : IRepository<T> where T : class
    {
        private readonly IdentityDbContext _context;

        public GenericRepository(IdentityDbContext context) => _context = context;
        public void Create(T entity)
        {
            _context.Set<T>().Add(entity);
        }
 
        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }
    }
}
