import fetch from 'node-fetch';

async function testAdminAPI() {
    try {
        // Step 1: Login with admin credentials
        const loginResponse = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'suraj',
                password: 'suraj123'
            })
        });

        const loginData = await loginResponse.json();
        console.log('Login result:', loginData);

        if (!loginData.success) {
            console.error('Login failed');
            return;
        }

        const token = loginData.data.token;

        // Step 2: Fetch admin stats
        const statsResponse = await fetch('http://localhost:8000/api/admin/stats', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const statsData = await statsResponse.json();
        console.log('Admin stats:', statsData);

        // Step 3: Fetch pending blogs
        const pendingResponse = await fetch('http://localhost:8000/api/admin/blogs?status=pending', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const pendingData = await pendingResponse.json();
        console.log('Pending blogs:', pendingData);

    } catch (error) {
        console.error('Error testing admin API:', error);
    }
}

testAdminAPI(); 