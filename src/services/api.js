const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

// Helper to get auth token
const getToken = () => localStorage.getItem('token');

// Helper for headers
const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
});

const jsonHeaders = () => ({
    'Content-Type': 'application/json',
});

// Generic request handler
const request = async (url, options = {}) => {
    const res = await fetch(`${API_BASE}${url}`, options);

    if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('adminAuth');
        window.location.href = '/admin/login';
        throw new Error('Unauthorized');
    }

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || 'Request failed');
    }

    // DELETE returns no content
    if (res.status === 204 || options.method === 'DELETE') {
        return null;
    }

    return res.json();
};

// ========== AUTH ==========
export const authAPI = {
    login: (username, password) =>
        request('/auth/login', {
            method: 'POST',
            headers: jsonHeaders(),
            body: JSON.stringify({ username, password }),
        }),

    register: (username, password) =>
        request('/auth/register', {
            method: 'POST',
            headers: jsonHeaders(),
            body: JSON.stringify({ username, password }),
        }),
};

// ========== CATEGORIES ==========
export const categoriesAPI = {
    getAll: () =>
        request('/categories', { headers: jsonHeaders() }),

    getOne: (id) =>
        request(`/categories/${id}`, { headers: jsonHeaders() }),

    create: (data) =>
        request('/categories', {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(data),
        }),

    update: (id, data) =>
        request(`/categories/${id}`, {
            method: 'PATCH',
            headers: authHeaders(),
            body: JSON.stringify(data),
        }),

    delete: (id) =>
        request(`/categories/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        }),
};

// ========== ARTICLES ==========
export const articlesAPI = {
    getAll: (params = {}) => {
        const query = new URLSearchParams();
        if (params.status) query.append('status', params.status);
        if (params.category_id) query.append('category_id', params.category_id);
        if (params.search) query.append('search', params.search);
        const qs = query.toString();
        return request(`/articles${qs ? `?${qs}` : ''}`, { headers: jsonHeaders() });
    },

    getOne: (id) =>
        request(`/articles/${id}`, { headers: jsonHeaders() }),

    create: (data) =>
        request('/articles', {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(data),
        }),

    update: (id, data) =>
        request(`/articles/${id}`, {
            method: 'PATCH',
            headers: authHeaders(),
            body: JSON.stringify(data),
        }),

    delete: (id) =>
        request(`/articles/${id}`, {
            method: 'DELETE',
            headers: authHeaders(),
        }),
};

// ========== UPLOAD ==========
export const uploadAPI = {
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return fetch(`${API_BASE}/upload`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${getToken()}` },
            body: formData,
        }).then((res) => {
            if (!res.ok) throw new Error('Upload failed');
            return res.json();
        });
    },
};

export default { authAPI, categoriesAPI, articlesAPI, uploadAPI };
