// Course.js

import React from 'react';
import { variables } from './variables';

export class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      modalTitle: '',
      courseId: 0,
      courseCode: '',
      courseName: '',
      creditHours: null,
    };
  }

  refreshList() {
    fetch(variables.API_URL + 'courses')
      .then(response => response.json())
      .then(data => {
        this.setState({ courses: data });
      })
      .catch(error => {
        console.error('Fetch Error:', error);
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeCourseCode = (e) => {
    this.setState({ courseCode: e.target.value });
  };

  changeCourseName = (e) => {
    this.setState({ courseName: e.target.value });
  };

  changeCreditHours = (e) => {
    this.setState({ creditHours: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: 'Add Course',
      courseId: 0,
      courseCode: '',
      courseName: '',
      creditHours: null,
    });
  }

  editClick(course) {
    this.setState({
      modalTitle: 'Edit Course',
      courseId: course.courseId,
      courseCode: course.courseCode,
      courseName: course.courseName,
      creditHours: course.creditHours,
    });
  }

  createClick() {
    fetch(variables.API_URL + 'courses', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseCode: this.state.courseCode,
        courseName: this.state.courseName,
        creditHours: this.state.creditHours,
      }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert('Failed');
        }
      );
  }

  updateClick() {
    fetch(variables.API_URL + 'courses/' + this.state.courseId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        courseId: this.state.courseId,
        courseCode: this.state.courseCode,
        courseName: this.state.courseName,
        creditHours: this.state.creditHours,
      }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert('Failed');
        }
      );
  }

  deleteClick(course) {
    if (window.confirm('Are you Sure to Delete?')) {
      fetch(variables.API_URL + 'courses/' + course.courseId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert('Failed');
          }
        );
    }
  }

  render() {
    const {
      courses,
      modalTitle,
      courseId,
      courseCode,
      courseName,
      creditHours,
    } = this.state;

    return (
      <div>
        <button
          type='button'
          className='btn btn-primary m-2 float-end'
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
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
            {courses.map(course => (
              <tr key={course.courseId}>
                <td>{course.courseId}</td>
                <td>{course.courseCode}</td>
                <td>{course.courseName}</td>
                <td>{course.creditHours}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(course)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(course)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Course Code</span>
                <input type="text" className="form-control" value={courseCode} onChange={this.changeCourseCode} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Course Name</span>
                <input type="text" className="form-control" value={courseName} onChange={this.changeCourseName} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Credit Hours</span>
                <input type="number" className="form-control" value={creditHours} onChange={this.changeCreditHours} />
              </div>

              {courseId === 0 ? (
                <button type="button" className="btn btn-primary float-start" onClick={() => this.createClick()}>
                  Create
                </button>
              ) : null}

              {courseId !== 0 ? (
                <button type="button" className="btn btn-primary float-start" onClick={() => this.updateClick()}>
                  Update
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
