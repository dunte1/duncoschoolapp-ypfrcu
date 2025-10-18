
const API_BASE_URL = 'https://multischool.duncowebsolutions.co.ke/api';

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
  token?: string
) {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log('API Request Error:', error);
    throw error;
  }
}

export const api = {
  login: (email: string, password: string) =>
    apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: (token: string) =>
    apiRequest('/logout', { method: 'POST' }, token),

  getAttendance: (token: string) =>
    apiRequest('/attendance', {}, token),

  getExams: (token: string) =>
    apiRequest('/exams', {}, token),

  getLibraryBooks: (token: string) =>
    apiRequest('/library/books', {}, token),

  getInvoices: (token: string) =>
    apiRequest('/finance/invoices', {}, token),

  getNotifications: (token: string) =>
    apiRequest('/notifications', {}, token),

  getMessages: (token: string) =>
    apiRequest('/messages', {}, token),

  getUserProfile: (token: string) =>
    apiRequest('/profile', {}, token),
};
