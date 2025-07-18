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
// Helper for GET requests
async function getJSON(url) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
    } catch {
      throw new Error("API Error");
    }
    throw new Error(errorData.message || "API Error");
  }

  return res.json(); // ✅ always return parsed JSON if ok
}


export function getMatches(job_description) {
  const query = encodeURIComponent(job_description);
  return getJSON(`${apiUrl}compare_job_description?job_description=${query}`);
}

export function historyMatches() {
  return getJSON(`${apiUrl}compare_job_description`) 
}

