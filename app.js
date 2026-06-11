const fs = require('fs');
const express = require('express');

const app = express();
// ===================================== //


// ===================================== //
// Middleware Basics;
/*
Middleware: Basically a function that can Modify the incoming request Data
*/

// This express.json() is Middleware
app.use(express.json());
// ===================================== //


// ===================================== //
// Define URL or Routes; get is HTTP Method;

// GET 
// app.get('/', (req, res) => {
//     // res.status(200).send("Hello from Server");
//     res.status(200).json({message: "Hello from Server"});
// });

// POST
// app.post('/', (req, res) => {
//     res.status(200).json({message: "Yes! you can POST in this API EndPoint 😆"})
// })
// ===================================== //


// ===================================== //
// Read the Data;
// JSON.parse -> Convert Auto to Array of JS Object;
const toursData = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));
// ===================================== //


// ===================================== //
// GET
// (req, res) is called route handler;
// Handling GET Request;
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: toursData.length,
        data: {
            tours: toursData
        }
    });

});
// ===================================== //



// ===================================== //
/* Note: 
1: The 'req' Object hold all the data, all the information, about the request that was done!
2: And If that request contains some data that was send, that data should be on the request.

But!!
3: Express does not put that body data on the request.
So, in order to have that data available, we need to use Middleware.😆
*/

// POST
// Handling POST Request;
/*
Note:
1: body: is property that available on req Object.
2: It always need to send back something, In order to finish the so-called req res cycle
*/


app.post('/api/v1/tours', (req, res) => {
    //  console.log(req.body);

    const newId = toursData[toursData.length - 1].id = 1;

    /*
    Object.assign --> Which allows to create a new Object by merging two existing Objects together.
    */
    const newTour = Object.assign({ id: newId }, req.body);

    // Push this tour into the toursData Array.
    toursData.push(newTour);

    // Writing file into...
    fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(toursData), err => {

        // Send Back Newly created Object.
        // 200 = Means Okay; 201 = Means created.
        res.status(201).json({
            status: "succes",
            data: {
                toursData: newTour
            }
        });
    });
});

// ===================================== //



// ===================================== //
const port = 3000;

// Call back function
// Running the Server
app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
// ===================================== //
