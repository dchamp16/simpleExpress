const {readDatabase, writeDatabase} = require('../config/database');

function getAllRecords(req, res) {
    try{
        const data = readDatabase();
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({error: 'Failed to read the database'});
    }
}

function addRecord(req, res) {
    const {name, email} = req.body

    if(!name || !email){
        return res.status(400).json({error: 'Name and Email are required'})
    }

    try{
        const data = readDatabase()
        console.log('Current Database:', data);
        const newRecord = {
            id:Date.now(),
            name,
            email
        }
        data.push(newRecord);
        writeDatabase(newRecord);

        console.log(`${newRecord.name} has been added to the database`);
        res.status(201).json(newRecord);
    }catch(err){
        console.error('Error writing to database:', err);
        res.status(500).json({error: 'Failed to write the database'});
    }
}

function getRecordById(req, res) {
    const id = parseInt(req.params.id);

    try{
        const data = readDatabase();
        const record = data.find(item => item.id === id);

        if(!record){
            return res.status(404).json({error: 'No record found'});
        }
        res.status(200).json(record);
    }catch(err){
        res.status(500).json({error: 'Failed to read the database'});
    }
}

module.exports = {getAllRecords,addRecord,getRecordById};

