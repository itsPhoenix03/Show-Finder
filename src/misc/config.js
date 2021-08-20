const API_BASE_URL = 'https://api.tvmaze.com';

export async function apiGet(query) {
  const response = fetch(`${API_BASE_URL}${query}`).then(r => r.json());
  return response;
}
