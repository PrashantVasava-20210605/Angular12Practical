using AngularApplicationTest.Models;
using AngularApplicationTest.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularApplicationTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {

        private IStudentRepository _studentRepository;

        public StudentController(IStudentRepository studentRepository)
        {
            _studentRepository = studentRepository;
        }

        [HttpGet]
        public IEnumerable<Student> Get()
        {
            return _studentRepository.ListStudents();
        }

        [HttpGet("{rollNo}")]
        public Student Get(int rollNo)
        {
            return _studentRepository.GetStudentByRollNo(rollNo);
        }

        [HttpPost]
        public bool Post([FromBody] Student student)
        {
            return _studentRepository.AddStudent(student);
        }

        // PUT api/<ValuesController1>/5
        [HttpPut("{rollNo}")]
        public bool Put(int rollNo, [FromBody] Student student)
        {
            return _studentRepository.UpdateStudent(rollNo, student);
        }

        // DELETE api/<ValuesController1>/5
        [HttpDelete("{rollNo}")]
        public bool Delete(int rollNo)
        {
            return _studentRepository.DeleteStudent(rollNo);
        }
    }
}
