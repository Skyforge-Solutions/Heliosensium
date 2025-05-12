import fetch from 'node-fetch';

// Check if a blog post with pending status exists in the database
async function checkAdminStats() {
    try {
        // Try public endpoint first
        const publicResponse = await fetch('http://localhost:8000/api/blogs');
        const publicData = await publicResponse.json();
        console.log("Public API response:", publicData);

        // Now try to get a token
        const loginResponse = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'admin', // Replace with actual admin username
                password: 'admin123' // Replace with actual admin password
            })
        });

        const loginData = await loginResponse.json();
        console.log("Login response:", loginData);

        if (loginData.success && loginData.data && loginData.data.token) {
            const token = loginData.data.token;

            // Now make an authenticated request to get admin stats
            const statsResponse = await fetch('http://localhost:8000/api/admin/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const statsData = await statsResponse.json();
            console.log("Admin stats response:", statsData);

            // Try to get pending blogs too
            const blogsResponse = await fetch('http://localhost:8000/api/admin/blogs?status=pending', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const blogsData = await blogsResponse.json();
            console.log("Admin blogs (pending) response:", blogsData);

            return {
                stats: statsData,
                blogs: blogsData
            };
        } else {
            console.error("Failed to login");
            return null;
        }
    } catch (error) {
        console.error("Error checking admin stats:", error);
        return null;
    }
}

checkAdminStats(); 