import React, { useState, useEffect } from 'react';
import { variables } from './variables';

export const TimeSlot = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [tsCode, setTsCode] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [tsId, setTsId] = useState(0);

  const refreshList = () => {
    fetch(`${variables.API_URL}api/TimeSlots/`)
      .then(response => response.json())
      .then(data => setTimeSlots(data))
      .catch(error => console.error('Fetch Error:', error));
  };

  useEffect(() => {
    refreshList();
  }, []);

  const addClick = () => {
    setModalTitle('Add TimeSlot');
    setTsId(0);
    setTsCode("");
    setStartTime("");
    setEndTime("");
  };

  const editClick = (ts) => {
    setModalTitle('Edit TimeSlot');
    setTsId(ts.timeSlotId);
    setTsCode(ts.timeSlotCode);
    setStartTime(ts.startTime);
    setEndTime(ts.endTime);
  };

  const createClick = () => {
    fetch(`${variables.API_URL}api/TimeSlots/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tsCode,
        startTime,
        endTime,
      }),
    })
      .then(response => response.json())
      .then(result => {
        alert(result.message);
        refreshList();
      })
      .catch(() => alert('Failed to create time slot'));
  };

  const updateClick = () => {
    fetch(`${variables.API_URL}api/TimeSlots/${tsId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tsCode,
        startTime,
        endTime,
      }),
    })
      .then(response => response.json())
      .then(result => {
        alert(result.message);
        refreshList();
      })
      .catch(() => alert('Failed to update time slot'));
  };

  const deleteClick = (ts) => {
    if (window.confirm('Are you Sure to Delete?')) {
      fetch(`${variables.API_URL}api/TimeSlots/`, {
        method: 'DELETE',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tsId: ts.timeSlotId }),
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
        type='button'
        className='btn btn-primary m-2 float-end'
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={addClick}
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
          {timeSlots.map(ts => (
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
                  onClick={() => editClick(ts)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => deleteClick(ts)}
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
