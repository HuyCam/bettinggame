const mongoose = require('mongoose');

console.log('connecting to DB');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,

});

module.exports = mongoose;

// mongodb+srv://admin:<password>@bettinggamedb.tdq5m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// password with adminpassword, myFirstDatabase with database name