import express from "express"

const app = express();

import "./database/connection.js"

import employeeRouter from "./Routes/employee.js"
import dotenv from "dotenv"

dotenv.config()


// Middleware to parse JSON data from incoming requests
app.use(express.json());


app.use('/api', employeeRouter);





// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
