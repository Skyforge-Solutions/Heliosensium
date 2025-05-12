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
    setTokenTitle.textContent = 'Test: Set Admin Token';
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

    // Add to the body
    document.body.appendChild(report);
})(); 