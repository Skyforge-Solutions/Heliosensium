/**
 * Backend API Testing Script
 * 
 * Tests connectivity to the Heliosensium blog backend
 * Run with: node test-backend.js
 */

// Define the URLs to test
const DEVELOPMENT_URL = 'http://localhost:8000/api';
const PRODUCTION_URL = 'https://heliosensium-blog-backend.onrender.com/api';

// Endpoints to test
const ENDPOINTS = [
    { name: 'Public Blogs', path: '/blogs?limit=10&status=approved' },
    { name: 'Health Check', path: '/health' },
    { name: 'Auth Status', path: '/auth/validate', credentials: true }
];

// Test a single URL with all endpoints
async function testBackendUrl(baseUrl) {
    console.log(`\n🔍 Testing backend URL: ${baseUrl}`);
    console.log('==================================');

    for (const endpoint of ENDPOINTS) {
        const url = `${baseUrl}${endpoint.path}`;
        console.log(`\nTesting endpoint: ${endpoint.name} (${url})`);

        try {
            const options = {};
            if (endpoint.credentials) {
                options.credentials = 'include';
            }

            const startTime = Date.now();
            const response = await fetch(url, options);
            const endTime = Date.now();

            console.log(`➡️ Status: ${response.status} ${response.statusText}`);
            console.log(`➡️ Response time: ${endTime - startTime}ms`);

            // Try to parse and log the response
            try {
                const data = await response.json();
                console.log('➡️ Response data:');
                if (data.data && Array.isArray(data.data)) {
                    console.log(`  - Found ${data.data.length} items`);

                    if (data.data.length > 0) {
                        console.log('  - First item sample:');
                        const sample = data.data[0];
                        console.log(`    Title: ${sample.title || 'N/A'}`);
                        console.log(`    Status: ${sample.status || 'N/A'}`);
                        console.log(`    ID: ${sample.id || 'N/A'}`);
                    }
                } else {
                    console.log(JSON.stringify(data, null, 2).substring(0, 200) + '...');
                }
            } catch (parseError) {
                console.log(`➡️ Could not parse response as JSON: ${parseError.message}`);
            }
        } catch (error) {
            console.error(`❌ Connection error: ${error.message}`);
        }
    }
}

// Main function to run all tests
async function runTests() {
    console.log('🔌 HELIOSENSIUM BACKEND API TEST');
    console.log('================================');
    console.log('Testing both development and production URLs...');

    try {
        // Test development URL
        await testBackendUrl(DEVELOPMENT_URL);

        // Test production URL
        await testBackendUrl(PRODUCTION_URL);

        console.log('\n✅ All tests completed!');
        console.log('\nIf you see connection errors on both URLs, the backend may be offline.');
        console.log('If one URL works but the other doesn\'t, check your environment configuration.');
        console.log('To use a working URL in development, update the API_BASE_URL in src/lib/api.ts');
    } catch (error) {
        console.error('\n❌ Tests failed with error:', error);
    }
}

// Run the tests
runTests(); 