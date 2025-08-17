// console.log("server file is running");

// function add (a, b){
//     return a+b;
// }


// ### SECOND TYPE OF FUCTIN ###
// let add = function(a, b){
//     return a+b
// }

// #### THIRD TYPE OF FUNCTON ###
// var add = (a,b) =>{
//     return a+b
// }

// #### FOUR TYPE OF FUNCTION ###
// var add = (a,b) => a+b;
// let result  = add(2,3)
// console.log(result);



// ------------ ****** Server Create ****** ------------

const express = require('express')
const app = express()
const port = 3000
const db = require('./db');
// const Person = require('./module/Person');
// const Menu = require('./module/Menu');
const bodyParser = require('body-parser'); // ✅ Node.js module names are case-sensitive.
app.use(bodyParser.json());

// GET request (Read data)
// app.get('/person', async (req, res) => {
//   try{
//     const data = await Person.find();
//     console.log('data Fetched!!');
//     res.status(200).json(data);
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error: 'Internal Server Error!!'})
    
//   }
// })


// // POST request (Create Data)
// app.post('/person', async (req, res) => {
//   try {
//     const data = req.body;
//     const newPerson = new Person(data); // use model name
//     const response = await newPerson.save(); // correct spelling
//     console.log('Data Saved!!');
//     res.status(200).json(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error!!' });
//   }
// });

// Import the file from the Routes File for person
const personRoutes = require('./Routes/personRoutes');

// use the routes
app.use('/person', personRoutes);





// Get Method for Menu
// app.get('/menu', async (req, res) => {
//   try {
//     const MenuData = await Menu.find();
//     console.log('Menu Find');
//     res.status(200).json(MenuData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error!!' });
//   }
// })

// // POST Mehod for Menu
// app.post('/menu', async (req, res) => {
//   try {
//     const data = req.body; // ✅ use different variable name
//     const newMenu = new Menu(data); // ✅ keep model Menu
//     const response = await newMenu.save(); // ✅ save to DB
//     console.log('Menu Data Saved!!');
//     res.status(201).json(response); // ✅ success code
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'Internal Server Error!!' });
//   }
// });

// Import the file from the Routes File
const menuRoutes = require('./Routes/menuRouter');

// use the routes
app.use('/menu', menuRoutes);





// ------- This is the Routs who we can writ in the code but this is not a good practice 
// app.get('/person/:workType', async(req, res) => {
//     try {
//         const workType = req.params.workType; // Extract the work type from the URL parameter
//         if(workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            
//             const response = await Person.find({work: workType});
//             console.log('response fetched');
//             res.status(200).json(response);
//         } else {
//             res.status(404).json({error: 'Invalid work type'});
//         }
//     } catch(err) {
//         console.log(err);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// });



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})




 