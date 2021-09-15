using AngularApplicationTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularApplicationTest.Repositories
{
    public class StudentRepository: IStudentRepository
    {
        private List<Student> students;

        public StudentRepository()
        {
            students = new List<Student>();
        }

        public List<Student> ListStudents()
        {
            return students;
        }

        public Student GetStudentByRollNo(int rollNo)
        {
            return students.FirstOrDefault(x => x.RollNo == rollNo);
        }

        public bool AddStudent(Student student)
        {
            var duplicateStudent = GetStudentByRollNo(student.RollNo);
            if (duplicateStudent != null)
            {
                return false;
            }

            students.Add(student);
            return true;
        }

        public bool UpdateStudent(int rollNo, Student student)
        {
            var studentToUpdate = GetStudentByRollNo(rollNo);
            if (studentToUpdate == null)
            {
                return false;
            }

            studentToUpdate.Name = student.Name;
            studentToUpdate.IQ = student.IQ;
            return true;
        }

        public bool DeleteStudent(int rollNo)
        {
            var studentToDelete = GetStudentByRollNo(rollNo);
            if (studentToDelete == null)
            {
                return false;
            }

            students.Remove(studentToDelete);
            return true;
        }
    }
}
