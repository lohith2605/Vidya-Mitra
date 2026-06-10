const API_BASE = "http://localhost:5000/api";

export const fetchCollegeFilters = async () => {
  const response = await fetch(`${API_BASE}/colleges/filters`);
  if (!response.ok) throw new Error("Failed to load college filters.");
  return response.json();
};

export const fetchColleges = async ({ search, districts, types }) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  districts?.forEach((district) => params.append("district", district));
  types?.forEach((type) => params.append("type", type));

  const response = await fetch(`${API_BASE}/colleges?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to load colleges.");
  return response.json();
};

export const fetchCollegeById = async (id) => {
  const response = await fetch(`${API_BASE}/colleges/${id}`);
  if (!response.ok) throw new Error("Failed to load college details.");
  return response.json();
};
