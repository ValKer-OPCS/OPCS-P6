/**
 * Fetches data from the specified API resource.
 *
 * @async
 * @param {string} resource - The API resource endpoint to fetch data from.
 * @returns {Promise<any>} The data returned from the API.
 */
export async function getFrom(resource) {
    const baseUrl = 'http://127.0.0.1:5678/api/';
    try {
        const response = await fetch(baseUrl + resource);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}