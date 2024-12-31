const express = require('express');
const router = express.Router();

const {getAllRecords, addRecord, getRecordById} = require('../controllers/recordController');

router.get('/', getAllRecords);

router.post('/', addRecord);

router.get('/:id', getRecordById)

module.exports = router;