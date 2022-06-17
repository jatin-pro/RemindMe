const express = require("express"); 
const mongoose = require("mongoose"); 
const cors  = require("cors"); 
const app = express(); 
require("dotenv").config();
const path = require("path");
const usersRouter = require("./routes/user"); 
let User = require("./model/User"); 
const PORT = process.env.PORT || 5000; 
 
app.use(cors()); 
app.use(express.json()); 


mongoose.connect(process.env.MONGODB_CONNECTION_STRING, 
{useNewUrlParser : true}).then(() => console.log("Database is Connected"))
    .catch(err => console.log("error occcured"));
    
setInterval(() => {
      User.find({}, (err, reminderList) => {
          if(err) {
              console.log(err)
          }
          if(reminderList){
              reminderList.forEach(reminder => {
                  if(!reminder.isReminded){
                      const now = new Date()
                      if((new Date(reminder.remindAt) - now) < 0) {
                          User.findByIdAndUpdate(reminder._id, {isReminded: true}, (err, remindObj)=>{
                              if(err){
                                  console.log(err)
                              }
                              const accountSid = process.env.ACCOUNT_SID 
                              const authToken = process.env.AUTH_TOKEN
                              var client = require('twilio')(accountSid, authToken); 
                              client.messages 
                                  .create({ 
                                      body: reminder.reminderMsg, 
                                      from: 'whatsapp:+14155238886',       
                                      to: 'whatsapp:+91999999999' 
                                  }) 
                                  .then(message => console.log(message.sid)) 
                                  .done()
                          })
                      }
                  }
              })
          }
      })
  },1000)
  ;


app.use("/users", usersRouter); 

app.listen(PORT , () => { 
  console.log(`app is running on localhost:${PORT}`); 
}); 