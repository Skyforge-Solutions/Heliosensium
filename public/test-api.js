/**
 * Heliosensium Backend API Test (Browser Version)
 * 
 * Instructions:
 * 1. Open your browser console on any page (F12 or Right-click > Inspect > Console)
 * 2. Copy and paste this entire script into the console and press Enter
 * 3. Look at the results to determine if the backend is responding properly
 */

(async function () {
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
        console.log(`%c Testing backend URL: ${baseUrl}`, 'font-weight:bold;font-size:14px;color:blue');
        console.log('==================================');

        const results = {};

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

                console.log(`%c ➡️ Status: ${response.status} ${response.statusText}`,
                    response.ok ? 'color:green' : 'color:red');
                console.log(`➡️ Response time: ${endTime - startTime}ms`);

                results[endpoint.name] = {
                    url,
                    status: response.status,
                    success: response.ok,
                    time: endTime - startTime
                };

                // Try to parse and log the response
                try {
                    const data = await response.json();
                    console.log('➡️ Response data:');
                    if (data.data && Array.isArray(data.data)) {
                        console.log(`  - Found ${data.data.length} items`);
                        results[endpoint.name].items = data.data.length;

                        if (data.data.length > 0) {
                            console.log('  - First item sample:');
                            const sample = data.data[0];
                            console.log(sample);
                            results[endpoint.name].sample = sample;
                        }
                    } else {
                        console.log(data);
                        results[endpoint.name].data = data;
                    }
                } catch (parseError) {
                    console.log(`%c ➡️ Could not parse response as JSON: ${parseError.message}`, 'color:orange');
                    results[endpoint.name].parseError = parseError.message;
                }
            } catch (error) {
                console.error(`%c ❌ Connection error: ${error.message}`, 'color:red;font-weight:bold');
                results[endpoint.name] = {
                    url,
                    error: error.message,
                    success: false
                };
            }
        }

        return results;
    }

    // Main function to run all tests
    async function runTests() {
        console.clear();
        console.log('%c 🔌 HELIOSENSIUM BACKEND API TEST (BROWSER VERSION)', 'font-weight:bold;font-size:16px;color:blue');
        console.log('================================================================');
        console.log('Testing both development and production URLs...');

        try {
            // Test development URL
            const devResults = await testBackendUrl(DEVELOPMENT_URL);

            // Test production URL
            const prodResults = await testBackendUrl(PRODUCTION_URL);

            // Summary
            console.log('\n%c ✅ Test Summary', 'font-weight:bold;font-size:14px;color:green');
            console.log('==================');

            const summary = {
                development: {
                    url: DEVELOPMENT_URL,
                    results: devResults
                },
                production: {
                    url: PRODUCTION_URL,
                    results: prodResults
                }
            };

            console.table(summary);
            console.log('\nDetailed results available in the "summary" object:');
            console.log(summary);

            // Add to window for easy access
            window.apiTestResults = summary;
            console.log('\nTip: Access full results with window.apiTestResults');

            // Check if any endpoint is working
            const devWorking = Object.values(devResults).some(r => r.success);
            const prodWorking = Object.values(prodResults).some(r => r.success);

            if (!devWorking && !prodWorking) {
                console.log('%c ❌ Both development and production APIs appear to be offline or inaccessible',
                    'color:red;font-weight:bold');
            } else if (devWorking && !prodWorking) {
                console.log('%c ⚠️ Development API is working but production API is not accessible',
                    'color:orange;font-weight:bold');
            } else if (!devWorking && prodWorking) {
                console.log('%c ℹ️ Production API is working but development API is not accessible',
                    'color:blue;font-weight:bold');
                console.log('Consider updating your API_BASE_URL in src/lib/api.ts to use the production URL');
            } else {
                console.log('%c ✅ Both APIs appear to be working', 'color:green;font-weight:bold');
            }

            // Check if blog data exists
            const devHasBlogs = devResults['Public Blogs']?.items > 0;
            const prodHasBlogs = prodResults['Public Blogs']?.items > 0;

            if (!devHasBlogs && !prodHasBlogs) {
                console.log('%c ⚠️ No approved blogs found on either API', 'color:orange;font-weight:bold');
                console.log('You may need to approve some blogs via the admin interface');
            }
        } catch (error) {
            console.error('%c ❌ Tests failed with error:', 'color:red;font-weight:bold', error);
        }
    }

    // Run the tests
    await runTests();

    return 'API test completed. Check console for results.';
})(); 