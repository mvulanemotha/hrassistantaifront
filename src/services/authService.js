const apiUrl = import.meta.env.VITE_API_URL;

//Helper for Post requests with JSON body
async function postJSON(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "API Error");
  }

  return res.json();
}

//Helper for Get requests with JSON body
async function getJSON(url) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    //Try to parse JSON error if available
    let errorData;

    try {
      errorData = await res.json();
    } catch {
      throw new Error(errorData.message || "API Error");
    }

    return res.json(); // ✅ return the JSON body
  }
}

export async function login({ email, password }) {
  return postJSON(`${apiUrl}login`, { email, password });
}

export async function register({
  name,
  email,
  user,
  password,
  country,
  contact,
  referal_code
}) {
  return postJSON(`${apiUrl}newuser`, {name,email,user,password,country,contact,referal_code
  });
}
