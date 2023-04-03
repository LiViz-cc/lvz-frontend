export async function get(url: string) {
  const token = localStorage.getItem('lvz-token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  }

  throw new Error(json.message);
}

export async function post<Request>(
  url: string,
  { arg }: { arg?: Request }
) {
  const token = localStorage.getItem('lvz-token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    method: 'POST',
    headers,
    ...(arg && { body: JSON.stringify(arg) }),
  });

  const json = await response.json();

  if (response.ok) {
    return json;
  }

  throw new Error(json.message);
}
