const router = require("express").Router(); 
let User = require("../model/User"); 


router.get("/getAllReminder", (req, res) => {
    User.find().then(ReminderList => res.json(ReminderList))
    .catch(err => res.status(400).json('Error: ' + err));
 })


router.post("/addReminder", (req, res) => {
    const { reminderMsg, remindAt } = req.body
    const reminder = new User({
        reminderMsg,
        remindAt,
        isReminded: false
    }) 
     reminder.save().then(() => res.json('reminder added!'))
    .catch(err => res.status(400).json('Error: ' + err));
     });

router.delete('/:id' , (req, res) =>{ 
        User.findByIdAndRemove(req.params.id).then(() => res.json('Reminder Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
    }); 


module.exports = router ; 