// Test script for JWT-based admin login
const API_BASE_URL = "https://heliosensium-blog-backend.onrender.com/api";

// Admin credentials
const username = "suraj";
const password = "suraj123";

// Storage for the JWT token
let authToken = null;

console.log("Starting JWT-based admin login test...");

// Function to attempt login and store token
async function testJwtLogin() {
    try {
        console.log(`Attempting login with username: ${username}`);

        const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        console.log("Login response status:", loginResponse.status);

        if (!loginResponse.ok) {
            console.error("Login failed with status:", loginResponse.status);
            try {
                const errorData = await loginResponse.json();
                console.error("Error details:", errorData);
            } catch (e) {
                console.error("Could not parse error response");
            }
            return;
        }

        const loginResult = await loginResponse.json();
        console.log("Login successful, token received");

        if (!loginResult.token) {
            console.error("No token in response:", loginResult);
            return;
        }

        // Store token
        authToken = loginResult.token;
        console.log("Token stored:", authToken.substring(0, 20) + "...");

        // Test auth validation with token
        console.log("\nTesting validation with token...");
        const validationResponse = await fetch(`${API_BASE_URL}/auth/validate`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        console.log("Validation status:", validationResponse.status);

        if (validationResponse.ok) {
            console.log("✅ Authentication is valid with JWT token");
            const validationData = await validationResponse.json();
            console.log("Validation data:", validationData);

            // Test admin endpoints
            await testAdminEndpoints();
        } else {
            console.error("❌ Authentication validation failed with JWT token");
        }
    } catch (error) {
        console.error("Error during login test:", error);
    }
}

// Function to test admin endpoints with the token
async function testAdminEndpoints() {
    if (!authToken) {
        console.error("No auth token available for testing admin endpoints");
        return;
    }

    console.log("\nTesting admin stats endpoint...");
    try {
        const statsResponse = await fetch(`${API_BASE_URL}/admin/stats`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        console.log("Stats response status:", statsResponse.status);

        if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            console.log("✅ Admin stats endpoint success:", statsData);
        } else {
            console.error("❌ Admin stats endpoint failed");
        }
    } catch (error) {
        console.error("Error testing admin stats:", error);
    }

    console.log("\nTesting admin blogs endpoint...");
    try {
        const blogsResponse = await fetch(`${API_BASE_URL}/admin/blogs?status=pending`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        console.log("Blogs response status:", blogsResponse.status);

        if (blogsResponse.ok) {
            const blogsData = await blogsResponse.json();
            console.log("✅ Admin blogs endpoint success. Blog count:", blogsData.data?.length || 0);
        } else {
            console.error("❌ Admin blogs endpoint failed");
        }
    } catch (error) {
        console.error("Error testing admin blogs:", error);
    }
}

// Run the test
testJwtLogin(); 