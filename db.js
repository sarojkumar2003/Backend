// First install Mongoose 
 
import mongoose from 'mongoose';
// require('dotenv').config(); //.env file required where we used 


// Define the mongoose URL
const mongooseURL = "mongodb://localhost:27017/Test"  // Replace Test with your database name

// For connecton the mongoodb 
mongoose.connect(mongooseURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}); 


// Get the default connection
// Mongoose maintains a default connections object representing the MongoDB connection.
const db  = mongoose.connection;

// Define event Listneers for database connection

db.on('connected', () =>{
    console.log("Connected To MongoDb Server!!");
    
})
db.on('error', (err) => {
    console.log("MongoDB Connection Error:", err);
});
db.on('disconnected', ()=>{
    console.log("MongoDb Disconnected Now!!"); // Note-> If we Need to Close the server Then we open cmd as administrator and run this command -> "net start MongoDB" or "net stop MongoDB"


    
})

// Export the Dtabase Connection
export default db;



