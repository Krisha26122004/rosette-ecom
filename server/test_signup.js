import fetch from 'node-fetch';

async function test() {
    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: "Test",
            lastName: "User",
            email: "test" + Date.now() + "@example.com",
            password: "password123",
            dob: "2000-01-01",
            address: "123 St",
            country: "India",
            city: "Mumbai",
            phone: "1234567890",
            gender: "Male"
        })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(data, null, 2));
}

test().catch(console.error);
