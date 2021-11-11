using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ChatRoom.Data.Repositories
{
    public abstract class GenericRepository<T> : IRepository<T> where T : class
    {
        private readonly ApplicationContext _context;

        public GenericRepository(ApplicationContext context) => _context = context;
        public virtual void Create(T entity)
        {
            _context.Set<T>().Add(entity);
        }
 
        public virtual IEnumerable<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }
        public void SaveChanges() => _context.SaveChanges();
    }
}
