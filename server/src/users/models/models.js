let mongoose = require('mongoose');
let bcrypt = require('bcrypt');


var userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type:email,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  userSchema.statics.updateProfile = function(query, update, callback) {
    this.findOneAndUpdate(query, update).exec(callback);
  }

  userSchema.statics.findUser = function(query, callback) {
    this.findOne(query,function(err,data)
  {
    if(err)callback(err,null)
    else {
      callback(null,data);
    }
  })
  }
  userSchema.statics.createUser = function(data,callback)
  {
      var newUser = new this();
      // set the user's local credentials
      newUser.userId = newUser._id
      newUser.userName = data.username;
      newUser.local.email = data.email;
      newUser.local.password = this.generateHash(data.password);

      // save the user
      newUser.save(function(err) {
        if (err)
          callback(err,null)
        else {
          callback(null,'done');
        }

      });

  }