using AngularApplicationTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplicationTest.Repositories
{
    public interface IStudentRepository
    {
        List<Student> ListStudents();
        Student GetStudentByRollNo(int rollNo);
        bool AddStudent(Student student);
        bool UpdateStudent(int RollNo, Student student);
        bool DeleteStudent(int RollNo);
    }
}
