const express = require('express');
const router = express.Router();

const Person = require('./../module/Person');

router.get('/', async (req, res) => {
  try{
    const data = await Person.find();
    console.log('data Fetched!!');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error!!'})
    
  }
})


// POST request (Create Data)
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data); // use model name
    const response = await newPerson.save(); // correct spelling
    console.log('Data Saved!!');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error!!' });
  }
});

router.get('/:workType', async(req, res) => {
    try {
        const workType = req.params.workType; // Extract the work type from the URL parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({error: 'Invalid work type'});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


// Update the Data 
router.put('/:id', async (req, res) =>{
  try {
    const Personid = req.params.id; // Extract the id from the url parameter
    const updatePersonData = req.body; // Updated data for the person

    const response = await Person.findByIdAndUpdate(Personid, updatePersonData, {
      new: true, //Return the update Document
      runValidators: true,
    })

    console.log("Data update");

    if (!response) {
      return res.status(404).json({error: 'Person not found!!'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

// Delete the data 
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person ID from the URL parameter

    // Find and delete the person by ID
    const deletedPerson = await Person.findByIdAndDelete(personId);

    if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found!!' });
    }

    console.log('Data is Deleted');
    res.status(200).json({ message: 'Person Deleted Successfully!!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;