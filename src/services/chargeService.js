const chargeServise = (action) => {
    
  const chargies = JSON.stringify(localStorage.getItem("chargies") || "{}");

  return chargies[action]?.price ?? 1;
};

export default chargeServise;
