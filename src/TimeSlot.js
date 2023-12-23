import React from 'react';
import { variables } from './variables';
// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());
export class TimeSlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TimeSlots: [],
      modalTitle: "",
      TSCode: "",
      StartTime: "",
      EndTime: "",
      TSId: 0,
    };
  }

  refreshList() {
    console.log('API URL:', variables.API_URL);
    fetch("https://localhost:7064/api/TimeSlots/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then(response => {
      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      this.setState({ TimeSlots: data });
    })
    .catch(error => {
      console.error('Fetch Error:', error);
    });
  }

  componentDidMount() {
    this.refreshList();
  }

  // changeTSCode = (e) => {
  //   this.setState({ TSCode: e.target.value });
  // };

  // changeStartTime = (e) => {
  //   this.setState({ StartTime: e.target.value });
  // };

  // changeEndTime = (e) => {
  //   this.setState({ EndTime: e.target.value });
  // };

  // addClick() {
  //   this.setState({
  //     modalTitle: 'Add TimeSlot',
  //     TSId: 0,
  //     TSCode: "",
  //     StartTime: "",
  //     EndTime: "",
  //   });
  // }

  // editClick(ts) {
  //   this.setState({
  //     modalTitle: 'Edit TimeSlot',
  //     TSId: ts.TSId,
  //     TSCode: ts.TSCode,
  //     StartTime: ts.StartTime,
  //     EndTime: ts.EndTime,
  //   });
  // }

  // createClick() {
  //   fetch("https://localhost:7064/api/TimeSlots/", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       TSCode: this.state.TSCode,
  //       StartTime: this.state.StartTime,
  //       EndTime: this.state.EndTime,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(
  //       (result) => {
  //         alert(result.message); // Assuming your API returns an object with a message property
  //         this.refreshList();
  //       },
  //       (error) => {
  //         alert('Failed to create time slot');
  //       }
  //     );
  // }

  // updateClick() {
  //   fetch(`https://localhost:7064/api/TimeSlots/${this.state.TSId}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       TSCode: this.state.TSCode,
  //       StartTime: this.state.StartTime,
  //       EndTime: this.state.EndTime,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(
  //       (result) => {
  //         alert(result.message); // Assuming your API returns an object with a message property
  //         this.refreshList();
  //       },
  //       (error) => {
  //         alert('Failed to update time slot');
  //       }
  //     );
  // }


  // deleteClick(ts) {
  //   if (window.confirm('Are you Sure to Delete?')) {
  //     fetch("https://localhost:7064/api/TimeSlots/", {
  //       method: 'DELETE',
  //       mode: 'no-cors',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ TSId: ts.TSId }),
  //     })
  //       .then(res => res.json())
  //       .then(
  //         (result) => {
  //           alert(result);
  //           this.refreshList();
  //         },
  //         (error) => {
  //           alert('Failed');
  //         }
  //       );
  //   }
  // }

  render() {
    const {
      TimeSlots,
      modalTitle,
      TSId,
      TSCode,
      StartTime,
      EndTime,
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
          Add TimeSlot
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Time Slot Id</th>
              <th>Time Slot Code</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {TimeSlots.map(ts => (
              <tr key={ts.timeSlotId}>
                <td>{ts.timeSlotId}</td>
                <td>{ts.timeSlotCode}</td>
                <td>{ts.startTime}</td>
                <td>{ts.endTime}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(ts)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      {/* SVG path content */}
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(ts)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      {/* SVG path content */}
                    </svg>
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
                <span className="input-group-text">Time Slot Code</span>
                <input type="text" className="form-control" value={TSCode} onChange={this.changeTSCode} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Start Time</span>
                <input type="text" className="form-control" value={StartTime} onChange={this.changeStartTime} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">End Time</span>
                <input type="text" className="form-control" value={EndTime} onChange={this.changeEndTime} />
              </div>

              {TSId === 0 ? (
                <button type="button" className="btn btn-primary float-start" onClick={() => this.createClick()}>
                  Create
                </button>
              ) : null}

              {TSId !== 0 ? (
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
