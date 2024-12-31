const baseUrl = 'http://localhost:3000/api/records'

// Fetch all records
async function fetchRecords() {
    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        document.getElementById('all-records').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('all-records').innerText = 'Error fetching records.';
        console.error(error);
    }
}

// Add a new record
async function addRecord() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !email) {
        alert('Please enter both name and email.');
        return;
    }

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Inform server of JSON data
            },
            body: JSON.stringify({ name, email }), // Send JSON stringified data
        });

        // Parse and display the server's response
        const data = await response.json();

        if (response.ok) {
            document.getElementById('add-record-output').innerText = JSON.stringify(data, null, 2);
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
        } else {
            document.getElementById('add-record-output').innerText = data.error || 'Error adding record.';
        }
    } catch (error) {
        document.getElementById('add-record-output').innerText = 'Error adding record.';
        console.error('Fetch error:', error);
    }
}


// Fetch record by ID
async function fetchRecordById() {
    const id = document.getElementById('record-id').value;

    if (!id) {
        alert('Please enter an ID.');
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/${id}`);
        const data = await response.json();
        if (response.ok) {
            document.getElementById('record-by-id').innerText = JSON.stringify(data, null, 2);
        } else {
            document.getElementById('record-by-id').innerText = data.error;
        }
    } catch (error) {
        document.getElementById('record-by-id').innerText = 'Error fetching record.';
        console.error(error);
    }
}