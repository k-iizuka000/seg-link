import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Strava API base URL
const stravaApiClient = axios.create({
  baseURL: 'https://www.strava.com/api/v3',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle Strava OAuth authentication
export const authenticateStrava = async (
  clientId: string,
  clientSecret: string,
  code: string
) => {
  try {
    const response = await stravaApiClient.post('/oauth/token', {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      grant_type: 'authorization_code',
    });
    return response.data;
  } catch (error) {
    console.error('Strava OAuth authentication failed:', error);
    throw error;
  }
};

// Function to fetch activities from Strava API
export const fetchActivities = async (accessToken: string) => {
  try {
    const response = await stravaApiClient.get('/athlete/activities', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch activities:', error);
    throw error;
  }
};

// Function to fetch segment information from Strava API
export const fetchSegments = async (accessToken: string) => {
  try {
    const response = await stravaApiClient.get('/segments/starred', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch segments:', error);
    throw error;
  }
};

// Function to fetch template information from the API
export const fetchTemplates = async (accessToken: string) => {
  try {
    const response = await apiClient.get('/templates', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch templates:', error);
    throw error;
  }
};

// Function to update profile information in the API
export const updateProfile = async (accessToken: string, profileData: { weight: number }) => {
  try {
    const response = await apiClient.put('/profile', profileData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error;
  }
};

// Export the Strava API client
export { stravaApiClient };

export default apiClient;
