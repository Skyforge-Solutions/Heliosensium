// This file needs to be placed in public/check-localstorage.js
// Then opened in the browser directly to examine localStorage

// Self-executing function to check localStorage for admin token
(function () {
    // Check for admin token in localStorage
    const adminToken = localStorage.getItem('helia_admin_token');

    // Create a UI to display the findings
    const report = document.createElement('div');
    report.style.fontFamily = 'sans-serif';
    report.style.maxWidth = '800px';
    report.style.margin = '40px auto';
    report.style.padding = '20px';
    report.style.border = '1px solid #ddd';
    report.style.borderRadius = '8px';
    report.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';

    // Set the title
    const title = document.createElement('h1');
    title.textContent = 'LocalStorage Debug Report';
    title.style.borderBottom = '1px solid #eee';
    title.style.paddingBottom = '10px';
    title.style.marginTop = '0';
    report.appendChild(title);

    // Login Section
    const loginSection = document.createElement('div');
    loginSection.style.margin = '20px 0';
    loginSection.style.padding = '15px';
    loginSection.style.backgroundColor = '#e9ecef';
    loginSection.style.borderRadius = '4px';

    const loginTitle = document.createElement('h2');
    loginTitle.textContent = 'Test Login';
    loginTitle.style.marginTop = '0';
    loginSection.appendChild(loginTitle);

    // Username input
    const usernameLabel = document.createElement('label');
    usernameLabel.textContent = 'Username:';
    usernameLabel.style.display = 'block';
    usernameLabel.style.marginBottom = '5px';
    loginSection.appendChild(usernameLabel);

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.value = 'suraj'; // Default username
    usernameInput.style.width = '100%';
    usernameInput.style.padding = '8px';
    usernameInput.style.marginBottom = '10px';
    usernameInput.style.boxSizing = 'border-box';
    loginSection.appendChild(usernameInput);

    // Password input
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password:';
    passwordLabel.style.display = 'block';
    passwordLabel.style.marginBottom = '5px';
    loginSection.appendChild(passwordLabel);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.value = 'suraj123'; // Default password
    passwordInput.style.width = '100%';
    passwordInput.style.padding = '8px';
    passwordInput.style.marginBottom = '15px';
    passwordInput.style.boxSizing = 'border-box';
    loginSection.appendChild(passwordInput);

    // Login button
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login';
    loginButton.style.padding = '8px 16px';
    loginButton.style.backgroundColor = '#28a745';
    loginButton.style.color = 'white';
    loginButton.style.border = 'none';
    loginButton.style.borderRadius = '4px';
    loginButton.style.cursor = 'pointer';

    // Response display area
    const responseArea = document.createElement('pre');
    responseArea.style.marginTop = '15px';
    responseArea.style.padding = '10px';
    responseArea.style.backgroundColor = '#f8f9fa';
    responseArea.style.border = '1px solid #dee2e6';
    responseArea.style.borderRadius = '4px';
    responseArea.style.whiteSpace = 'pre-wrap';
    responseArea.style.display = 'none';

    loginButton.onclick = async function () {
        try {
            responseArea.style.display = 'block';
            responseArea.textContent = 'Logging in...';

            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value
                })
            });

            const data = await response.json();
            responseArea.textContent = JSON.stringify(data, null, 2);

            if (data.success && data.data && data.data.token) {
                localStorage.setItem('helia_admin_token', data.data.token);
                alert('Login successful! Token saved to localStorage. Refresh the page to see the update.');
            }
        } catch (error) {
            responseArea.textContent = 'Error: ' + error.message;
        }
    };

    loginSection.appendChild(loginButton);
    loginSection.appendChild(responseArea);
    report.appendChild(loginSection);

    // Admin token section
    const tokenSection = document.createElement('div');
    tokenSection.style.margin = '20px 0';

    const tokenTitle = document.createElement('h2');
    tokenTitle.textContent = 'Admin Token';
    tokenSection.appendChild(tokenTitle);

    const tokenStatus = document.createElement('div');
    tokenStatus.style.padding = '10px';
    tokenStatus.style.borderRadius = '4px';

    if (adminToken) {
        tokenStatus.style.backgroundColor = '#d4edda';
        tokenStatus.style.color = '#155724';
        tokenStatus.style.border = '1px solid #c3e6cb';
        tokenStatus.innerHTML = '<strong>Found:</strong> ' + adminToken;

        // Add JWT details if possible
        try {
            const parts = adminToken.split('.');
            if (parts.length === 3) {
                const payload = JSON.parse(atob(parts[1]));

                const tokenDetails = document.createElement('div');
                tokenDetails.style.marginTop = '10px';
                tokenDetails.style.padding = '10px';
                tokenDetails.style.backgroundColor = '#f8f9fa';
                tokenDetails.style.border = '1px solid #dee2e6';
                tokenDetails.style.borderRadius = '4px';

                tokenDetails.innerHTML = '<strong>Token Details:</strong><br>' +
                    'Username: ' + payload.username + '<br>' +
                    'ID: ' + payload.id + '<br>' +
                    'Issued at: ' + new Date(payload.iat * 1000).toLocaleString() + '<br>' +
                    'Expires at: ' + new Date(payload.exp * 1000).toLocaleString() + '<br>' +
                    'Token lifetime: ' + Math.round((payload.exp - payload.iat) / 60) + ' minutes<br>' +
                    'Current time: ' + new Date().toLocaleString() + '<br>' +
                    'Token expired: ' + (payload.exp * 1000 < Date.now() ? 'Yes' : 'No');

                tokenSection.appendChild(tokenDetails);
            }
        } catch (e) {
            console.error('Error parsing JWT token', e);
        }
    } else {
        tokenStatus.style.backgroundColor = '#f8d7da';
        tokenStatus.style.color = '#721c24';
        tokenStatus.style.border = '1px solid #f5c6cb';
        tokenStatus.textContent = 'Not found in localStorage';
    }

    tokenSection.appendChild(tokenStatus);
    report.appendChild(tokenSection);

    // All localStorage keys
    const allKeysSection = document.createElement('div');
    allKeysSection.style.margin = '20px 0';

    const allKeysTitle = document.createElement('h2');
    allKeysTitle.textContent = 'All localStorage Keys';
    allKeysSection.appendChild(allKeysTitle);

    const allKeysList = document.createElement('ul');

    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);

            const item = document.createElement('li');
            item.style.margin = '5px 0';
            item.innerHTML = '<strong>' + key + ':</strong> ' +
                (value.length > 100 ? value.substring(0, 100) + '...' : value);

            allKeysList.appendChild(item);
        }
    } else {
        const emptyItem = document.createElement('li');
        emptyItem.textContent = 'No items in localStorage';
        allKeysList.appendChild(emptyItem);
    }

    allKeysSection.appendChild(allKeysList);
    report.appendChild(allKeysSection);

    // Add "Set Token" section
    const setTokenSection = document.createElement('div');
    setTokenSection.style.margin = '20px 0';
    setTokenSection.style.padding = '15px';
    setTokenSection.style.backgroundColor = '#e9ecef';
    setTokenSection.style.borderRadius = '4px';

    const setTokenTitle = document.createElement('h2');
    setTokenTitle.textContent = 'Manage Token';
    setTokenTitle.style.marginTop = '0';
    setTokenSection.appendChild(setTokenTitle);

    const tokenInput = document.createElement('input');
    tokenInput.type = 'text';
    tokenInput.placeholder = 'Paste JWT token here';
    tokenInput.style.width = '100%';
    tokenInput.style.padding = '8px';
    tokenInput.style.marginBottom = '10px';
    tokenInput.style.boxSizing = 'border-box';
    setTokenSection.appendChild(tokenInput);

    const setButton = document.createElement('button');
    setButton.textContent = 'Set Token';
    setButton.style.padding = '8px 16px';
    setButton.style.backgroundColor = '#007bff';
    setButton.style.color = 'white';
    setButton.style.border = 'none';
    setButton.style.borderRadius = '4px';
    setButton.style.cursor = 'pointer';
    setButton.onclick = function () {
        if (tokenInput.value) {
            localStorage.setItem('helia_admin_token', tokenInput.value);
            alert('Token set! Refresh the page to see the update.');
        } else {
            alert('Please enter a token first.');
        }
    };
    setTokenSection.appendChild(setButton);

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Token';
    clearButton.style.padding = '8px 16px';
    clearButton.style.backgroundColor = '#dc3545';
    clearButton.style.color = 'white';
    clearButton.style.border = 'none';
    clearButton.style.borderRadius = '4px';
    clearButton.style.cursor = 'pointer';
    clearButton.style.marginLeft = '10px';
    clearButton.onclick = function () {
        localStorage.removeItem('helia_admin_token');
        alert('Token cleared! Refresh the page to see the update.');
    };
    setTokenSection.appendChild(clearButton);

    report.appendChild(setTokenSection);

    // Add API testing section
    const apiTestSection = document.createElement('div');
    apiTestSection.style.margin = '20px 0';
    apiTestSection.style.padding = '15px';
    apiTestSection.style.backgroundColor = '#e9ecef';
    apiTestSection.style.borderRadius = '4px';

    const apiTestTitle = document.createElement('h2');
    apiTestTitle.textContent = 'Test Admin API';
    apiTestTitle.style.marginTop = '0';
    apiTestSection.appendChild(apiTestTitle);

    const apiEndpointLabel = document.createElement('label');
    apiEndpointLabel.textContent = 'Endpoint:';
    apiEndpointLabel.style.display = 'block';
    apiEndpointLabel.style.marginBottom = '5px';
    apiTestSection.appendChild(apiEndpointLabel);

    const apiEndpointInput = document.createElement('select');
    apiEndpointInput.style.width = '100%';
    apiEndpointInput.style.padding = '8px';
    apiEndpointInput.style.marginBottom = '15px';

    const endpoints = [
        '/api/admin/stats',
        '/api/admin/blogs?status=pending',
        '/api/admin/blogs?status=approved',
        '/api/admin/blogs?status=rejected'
    ];

    endpoints.forEach(endpoint => {
        const option = document.createElement('option');
        option.value = endpoint;
        option.textContent = endpoint;
        apiEndpointInput.appendChild(option);
    });

    apiTestSection.appendChild(apiEndpointInput);

    const apiTestButton = document.createElement('button');
    apiTestButton.textContent = 'Test API Call';
    apiTestButton.style.padding = '8px 16px';
    apiTestButton.style.backgroundColor = '#17a2b8';
    apiTestButton.style.color = 'white';
    apiTestButton.style.border = 'none';
    apiTestButton.style.borderRadius = '4px';
    apiTestButton.style.cursor = 'pointer';

    const apiResponseArea = document.createElement('pre');
    apiResponseArea.style.marginTop = '15px';
    apiResponseArea.style.padding = '10px';
    apiResponseArea.style.backgroundColor = '#f8f9fa';
    apiResponseArea.style.border = '1px solid #dee2e6';
    apiResponseArea.style.borderRadius = '4px';
    apiResponseArea.style.whiteSpace = 'pre-wrap';
    apiResponseArea.style.display = 'none';

    apiTestButton.onclick = async function () {
        try {
            const currentToken = localStorage.getItem('helia_admin_token');

            if (!currentToken) {
                alert('No token found in localStorage. Please login or set a token first.');
                return;
            }

            apiResponseArea.style.display = 'block';
            apiResponseArea.textContent = 'Fetching data...';

            const response = await fetch('http://localhost:8000' + apiEndpointInput.value, {
                headers: {
                    'Authorization': `Bearer ${currentToken}`
                }
            });

            const data = await response.json();
            apiResponseArea.textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            apiResponseArea.textContent = 'Error: ' + error.message;
        }
    };

    apiTestSection.appendChild(apiTestButton);
    apiTestSection.appendChild(apiResponseArea);
    report.appendChild(apiTestSection);

    // Add to the body
    document.body.appendChild(report);
})(); 