export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

const API_BASE = '/api';

export async function testConnection() {
  try {
    await fetch(`${API_BASE}/pages/test`);
  } catch (error) {
    console.error("Please check your API configuration.");
  }
}

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  const json = await res.json();
  return json.url;
}

// Generic Content CMS
export async function getPageContent(pageId: string) {
  try {
    const res = await fetch(`${API_BASE}/pages/${pageId}?_t=${Date.now()}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updatePageContent(pageId: string, data: any) {
  const res = await fetch(`${API_BASE}/pages/${pageId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("保存失败: " + await res.text());
}

// Dramas
export async function getDramas() {
  const res = await fetch(`${API_BASE}/dramas?_t=${Date.now()}`);
  return await res.json();
}

export async function updateDrama(id: string, data: any) {
  const res = await fetch(`${API_BASE}/dramas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
}

export async function addDrama(data: any) {
  const res = await fetch(`${API_BASE}/dramas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json.id;
}

export async function deleteDrama(id: string) {
  await fetch(`${API_BASE}/dramas/${id}`, { method: 'DELETE' });
}

// Bases
export async function getBases() {
  const res = await fetch(`${API_BASE}/bases?_t=${Date.now()}`);
  return await res.json();
}

export async function updateBase(id: string, data: any) {
  const res = await fetch(`${API_BASE}/bases/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
}

export async function addBase(data: any) {
  const res = await fetch(`${API_BASE}/bases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json.id;
}

export async function deleteBase(id: string) {
  await fetch(`${API_BASE}/bases/${id}`, { method: 'DELETE' });
}

export async function getLiveStreams() {
  const res = await fetch(`${API_BASE}/liveStreams`);
  if (!res.ok) return null;
  return await res.json();
}

export async function addLiveStream(data: any) {
  const res = await fetch(`${API_BASE}/liveStreams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
}

export async function updateLiveStream(id: string, data: any) {
  const res = await fetch(`${API_BASE}/liveStreams/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
}

export async function deleteLiveStream(id: string) {
  const res = await fetch(`${API_BASE}/liveStreams/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(await res.text());
}

export async function getFeedbacks() {
  const res = await fetch(`${API_BASE}/feedbacks`);
  if (!res.ok) return null;
  return await res.json();
}

export async function addFeedback(data: any) {
  const res = await fetch(`${API_BASE}/feedbacks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
}

export async function getCourseRegistrations() {
  const res = await fetch(`${API_BASE}/course_registrations`);
  if (!res.ok) return null;
  return await res.json();
}

export async function addCourseRegistration(data: any) {
  const res = await fetch(`${API_BASE}/course_registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
}

export async function getUsers() {
  const res = await fetch(`${API_BASE}/users`);
  if (!res.ok) return null;
  return await res.json();
}

// Products
export async function getProducts() {
  const res = await fetch(`${API_BASE}/products?_t=${Date.now()}`);
  return await res.json();
}

export async function updateProduct(id: string, data: any) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
}

export async function addProduct(data: any) {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();
  return json.id;
}

export async function deleteProduct(id: string) {
  await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
}

export async function isAdmin() {
  // Simulating an admin context without Firebase
  // Always true for local editing now or use simple local storage
  return localStorage.getItem('isAdmin') === 'true';
}
