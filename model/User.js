const mongoose  = require("mongoose"); 

const Schema = mongoose.Schema; 

const UserSchema = new Schema({ 
    reminderMsg :  { 
           type : String,
           required : true,
           trim : true,
           minlength : 3
    },
    remindAt: {
        type : String,
        required : true,
    },
    isReminded: {
        type : Boolean,
    },
},
{
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema); 

module.exports = User; 