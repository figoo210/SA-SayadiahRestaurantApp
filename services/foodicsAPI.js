const apiBaseUrl = 'https://api.foodics.com/v5';
const apiSandboxUrl = 'https://api-sandbox.foodics.com/v5';

export const foodicsAPI = async (url, method, data) => {
    const fullUrl = `${apiBaseUrl}${url}`;
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',
    };

    const body = data ? JSON.stringify(data) : undefined;

    try {
        const response = await fetch(fullUrl, {
            method,
            headers,
            body
        });

        // Check for rate limiting (429 status)
        if (response.status === 429) {
            const retryAfter = response.headers.get('retry-after');
            console.log(`Rate limit reached. Retry after ${retryAfter} seconds.`);
            await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
            return foodicsAPI(url, method, data); // Retry the request
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call error: ', error);
        throw error;
    }
};

export const convertUtcToLocal = (utcDate) => {
    const date = new Date(utcDate);
    return date.toLocaleString(); // converts to local time
};

export const convertLocalToUtc = (localDate) => {
    const date = new Date(localDate);
    return date.toISOString(); // converts to UTC in ISO format
};

