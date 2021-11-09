using System;
using System.Collections.Generic;
using System.Text;

namespace ChatRoom.Data.Repositories
{
    interface IRepository<T>
    {
        void Create(T entity);
         //T Get(T entity);
        IEnumerable<T> GetAll();
    }
}
