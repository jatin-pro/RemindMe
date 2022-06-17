import './App.css';
import * as React from 'react';
import DateTimePicker from 'react-datetime-picker';
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Swal from 'sweetalert2';
import axios from 'axios'; 

function App() {
  const [ reminderMsg, setReminderMsg ] = useState("")
  const [ remindAt, setRemindAt ] = useState(null)
  const [ reminderList, setReminderList ] = useState([])
  
  useEffect(() => {
    axios.get("http://localhost:5000/users/getAllReminder").then( res => setReminderList(res.data))
}, [])
  
  const addReminder = () => {
    
    if(reminderMsg === "" || remindAt === null) {  Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Some Fields Are Empty!',
    })}
    else {
      const user = { 
        reminderMsg : reminderMsg, 
        remindAt : remindAt 
      }
      axios.post("http://localhost:5000/users/addReminder", user)
      .then( console.log(`Successfull`) )
      .catch(error => {
        console.error('There was an error!', error);
      });
      
      setReminderList([...reminderList, user])
   setReminderMsg("");
   setRemindAt(null); 
   Swal.fire({
    icon: 'success',
    title: 'Your Reminder Has Been Saved',
    showConfirmButton: false,
    timer: 1500
  })}
}

const deleteReminder = (id) => {
  axios.delete("http://localhost:5000/users/" + id)
  .then( console.log('Item Deleted'))
  .catch(error => {
    console.error('There was an error!', error);
  });
  
  const del = reminderList.filter((el) => el._id !== id);
  setReminderList(del);
}

  return (
  
    <div className = "div1" >
      <h1 className = "header"> 
       <a href = "/">
       <NotificationsNoneIcon sx={{ fontSize: "36px" }} className = "img" />
       REMIND ME
      </a>
      </h1>
      
          <div className = "div2">
          <div className = "div3">
            <div className="homepage_header" >
            <input type="text" placeholder="Reminder notes here..." value={reminderMsg}  onChange={e => setReminderMsg(e.target.value)}/>
            <DateTimePicker 
           value={remindAt}
            onChange={setRemindAt}
            minDate={new Date()}
            minutePlaceholder="mm"
            hourPlaceholder="hh"
            dayPlaceholder="DD"
            monthPlaceholder="MM"
            yearPlaceholder="YYYY"
           
          />
          <div className="button" onClick={addReminder}>Add Reminder</div>
            </div>
          </div>
</div>
  <div className="homepage_body">
          {
            reminderList.map( reminder => (
              <div className="reminder_card" key={reminder._id}>
                <h2>{reminder.reminderMsg}</h2>
                <h3>Remind Me at:</h3>
                <p>{String(new Date(reminder.remindAt.toLocaleString(undefined, {timezone:"Asia/Kolkata"})))}</p>
             <Button variant="outlined" className="button" onClick={() => deleteReminder(reminder._id)} startIcon={<DeleteIcon />}>
        Delete
      </Button>
              </div>
            ))
          }
           
           
           
        </div>
      
      </div>
      
  );
}

export default App;
