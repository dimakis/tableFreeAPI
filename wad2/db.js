import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Connect to database
mongoose.connect(process.env.mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,});
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(`Database connection error: ${err}`);
});

db.on('disconnected', () => {
    console.log('Database disconnected');
});

db.once('open', () => {
    console.log(`Database connected to ${db.name} on ${db.host}`);
});

// alternate attempt at connection
// mongoose.connect('mongodb://localhost:27017/AddressBook', {useNewUrlParser: true, useUnifiedTopology: true
// }).then(() => {
//  console.log('connected to db')
// }).catch((error) => {
//  console.log(error)
// })


