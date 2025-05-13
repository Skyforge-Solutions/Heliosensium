/**
 * Fix API URL Script
 * 
 * This script tests both development and production API endpoints,
 * then updates src/lib/api.ts with the working URL.
 * 
 * Run with: node fix-api-url.js
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Define the URLs to test
const DEVELOPMENT_URL = 'http://localhost:8000/api';
const PRODUCTION_URL = 'https://heliosensium-blog-backend.onrender.com/api';

// API file path
const API_FILE_PATH = path.join(__dirname, 'src', 'lib', 'api.ts');

// Function to test if a URL is working
async function testUrl(url) {
    try {
        console.log(`Testing ${url}...`);
        const response = await fetch(`${url}/blogs?limit=1`);

        if (response.ok) {
            const data = await response.json();
            console.log(`✅ ${url} is working!`);
            return { success: true, hasBlog: data.data && data.data.length > 0 };
        } else {
            console.log(`❌ ${url} returned status ${response.status}`);
            return { success: false, hasBlog: false };
        }
    } catch (error) {
        console.log(`❌ ${url} failed: ${error.message}`);
        return { success: false, hasBlog: false };
    }
}

// Function to update the API file
function updateApiFile(url) {
    try {
        if (!fs.existsSync(API_FILE_PATH)) {
            console.error(`❌ API file not found at ${API_FILE_PATH}`);
            return false;
        }

        const content = fs.readFileSync(API_FILE_PATH, 'utf8');

        // Simple version - replace the API URL with hardcoded value
        const updatedContent = content.replace(
            /const API_BASE_URL = .*?;/s,
            `const API_BASE_URL = "${url}";`
        );

        fs.writeFileSync(API_FILE_PATH, updatedContent, 'utf8');

        console.log(`✅ Updated API_BASE_URL in ${API_FILE_PATH} to ${url}`);
        return true;
    } catch (error) {
        console.error(`❌ Failed to update API file: ${error.message}`);
        return false;
    }
}

// Main function
async function main() {
    console.log('🔧 HELIOSENSIUM API URL FIXER');
    console.log('============================');
    console.log('Testing API endpoints to find a working URL...\n');

    const devResult = await testUrl(DEVELOPMENT_URL);
    const prodResult = await testUrl(PRODUCTION_URL);

    console.log('\nTest Results:');
    console.log(`Development API: ${devResult.success ? '✅ Working' : '❌ Not working'}`);
    console.log(`Production API: ${prodResult.success ? '✅ Working' : '❌ Not working'}`);

    let urlToUse;

    if (devResult.success && prodResult.success) {
        console.log('\nBoth APIs are working!');

        // Prefer the one with blog data
        if (devResult.hasBlog && !prodResult.hasBlog) {
            console.log('Development API has blog data, using it.');
            urlToUse = DEVELOPMENT_URL;
        } else if (!devResult.hasBlog && prodResult.hasBlog) {
            console.log('Production API has blog data, using it.');
            urlToUse = PRODUCTION_URL;
        } else {
            // If both or neither have blog data, prefer development for local work
            console.log('Using development API for local development ease.');
            urlToUse = DEVELOPMENT_URL;
        }
    } else if (devResult.success) {
        console.log('\nOnly development API is working, using it.');
        urlToUse = DEVELOPMENT_URL;
    } else if (prodResult.success) {
        console.log('\nOnly production API is working, using it.');
        urlToUse = PRODUCTION_URL;
    } else {
        console.log('\n❌ Neither API is working! Please check your backend servers.');
        process.exit(1);
    }

    // Update the API file
    console.log(`\nUpdating API file to use: ${urlToUse}`);
    const updated = updateApiFile(urlToUse);

    if (updated) {
        console.log('\n✅ Successfully updated the API URL!');
        console.log('Now restart your development server for changes to take effect.');

        // Ask if the user wants to restart the dev server
        console.log('\nWould you like to restart the development server now? (y/n)');
        process.stdin.once('data', (data) => {
            const input = data.toString().trim().toLowerCase();

            if (input === 'y' || input === 'yes') {
                console.log('\nRestarting development server...');

                // Kill any running server and start a new one
                exec('npm run dev', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`❌ Failed to start dev server: ${error.message}`);
                        return;
                    }

                    console.log(stdout);
                });
            } else {
                console.log('\nPlease restart the development server manually.');
            }
        });
    }
}

// Run the script
main().catch(error => {
    console.error(`\n❌ Script failed: ${error.message}`);
    process.exit(1);
}); 