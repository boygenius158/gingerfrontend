import axios from 'axios';

// Access the server URL from environment variables
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

const instance = axios.create({
    baseURL: baseURL,  // Set the baseURL dynamically
    // You can also set other defaults like headers, timeouts, etc.
});

export default instance;
