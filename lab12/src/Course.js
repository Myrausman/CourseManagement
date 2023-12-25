import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { variables } from './variables';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [courseId, setCourseId] = useState(0);
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [creditHours, setCreditHours] = useState(null);

  const refreshList = () => {
    fetch(`${variables.API_URL}api/Courses/`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => {
        console.error('Fetch Error:', error);
        toast.error('Failed to fetch courses. Please try again.');
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  const addClick = () => {
    setModalTitle('Add Course');
    setCourseId(0);
    setCourseCode('');
    setCourseName('');
    setCreditHours(null);
  };

  const resetModal = () => {
    setCourseCode('');
    setCourseName('');
    setCreditHours(null);
  };

  const editClick = (course) => {
    setModalTitle('Edit Course');
    setCourseId(course.courseId);
    setCourseCode(course.courseCode);
    setCourseName(course.courseName);
    setCreditHours(course.creditHours);
  };

  const createClick = () => {
    fetch(`${variables.API_URL}api/Courses/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseCode,
        courseName,
        creditHours,
      }),
    })
      .then(response => response.json())
      .then(result => {
        alert(result.message);
        refreshList();
        resetModal();
      })
      .catch(() => alert('Failed to create course'));
  };

  const updateClick = () => {
    fetch(`${variables.API_URL}api/Courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseId,
        courseCode,
        courseName,
        creditHours,
      }),
    })
      .then(response => response.json())
      .then(result => {
        alert(result.message);
        refreshList();
        resetModal();
      })
      .catch(() => alert('Failed to update course'));
  };

  const deleteClick = (course) => {
    if (window.confirm('Are you Sure to Delete?')) {
      fetch(`${variables.API_URL}api/Courses/`, {
        method: 'DELETE',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId: course.courseId }),
      })
        .then(() => {
          alert('Deleted successfully');
          refreshList();
        })
        .catch(() => alert('Failed to delete'));
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary m-2 float-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={addClick}
      >
        Add Course
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Course Id</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Credit Hours</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.courseId}>
              <td>{course.courseId}</td>
              <td>{course.courseCode}</td>
              <td>{course.courseName}</td>
              <td>{course.creditHours}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => editClick(course)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => deleteClick(course)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
        {/* Modal content here */}
      </div>
    </div>
  );
};

export default Course;
