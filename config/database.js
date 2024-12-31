const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, `../data/database.json`);
console.log(`Database database running in ${dbPath}`);

const readDatabase = () => {
    try{
        const data = fs.readFileSync(dbPath, 'utf8');
        const parseData = JSON.parse(data);

        if(!Array.isArray(parseData)){
            throw new Error('Database file is not an array')
        }
        return parseData;
    }catch(err){
        console.error('Error reading database:', err);
        throw new Error('Failed to read database');
    }
}

const writeDatabase = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

module.exports = {readDatabase, writeDatabase};