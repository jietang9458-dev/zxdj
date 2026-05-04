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

// Generic Content CMS
export async function getPageContent(pageId: string) {
  try {
    const res = await fetch(`${API_BASE}/pages/${pageId}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updatePageContent(pageId: string, data: any) {
  try {
    await fetch(`${API_BASE}/pages/${pageId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error(error);
  }
}

// Dramas
export async function getDramas() {
  const res = await fetch(`${API_BASE}/dramas`);
  return await res.json();
}

export async function updateDrama(id: string, data: any) {
  await fetch(`${API_BASE}/dramas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function addDrama(data: any) {
  const res = await fetch(`${API_BASE}/dramas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  return json.id;
}

export async function deleteDrama(id: string) {
  await fetch(`${API_BASE}/dramas/${id}`, { method: 'DELETE' });
}

// Bases
export async function getBases() {
  const res = await fetch(`${API_BASE}/bases`);
  return await res.json();
}

export async function updateBase(id: string, data: any) {
  await fetch(`${API_BASE}/bases/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function addBase(data: any) {
  const res = await fetch(`${API_BASE}/bases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  return json.id;
}

export async function deleteBase(id: string) {
  await fetch(`${API_BASE}/bases/${id}`, { method: 'DELETE' });
}

// Products
export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return await res.json();
}

export async function updateProduct(id: string, data: any) {
  await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function addProduct(data: any) {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
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
