import axios from "axios";

export async function handleMatchDownload (apiUrl, job_id, jobTitle){
  try {
    console.log(job_id)
    const res = await axios.get(`${apiUrl}download_matches`, {
      params: {
        match_id: job_id,
      },
      responseType: "blob",
    });
    console.log(res)
    const blob = new Blob([res.data], { type: "application/zip" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `matches_job_${jobTitle}.zip`);
    document.body.appendChild(link);

    console.log("Starting download...");    

    link.click();
    link.remove();
    
  } catch (error) {
    console.log(error);
  }
};
