import fetch from 'node-fetch';

async function createTestBlog() {
    try {
        const response = await fetch('http://localhost:8000/api/blogs/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Test Blog Post',
                content: '<p>This is a test blog post content.</p>',
                authorName: 'Test Author',
                authorEmail: 'test@example.com'
            })
        });

        const data = await response.json();
        console.log('Submission result:', data);

        // Now let's check if the blog post was created by fetching the public blogs
        const publicResponse = await fetch('http://localhost:8000/api/blogs');
        const publicData = await publicResponse.json();
        console.log('Public blogs:', publicData);
    } catch (error) {
        console.error('Error submitting blog:', error);
    }
}

createTestBlog(); 