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

export async function login({email , password}){
    return postJSON(`${apiUrl}login` , {email,password})
}

export async function register({name , email , password}){
    return postJSON(`${apiUrl}newuser`, { name , email , password })
}


