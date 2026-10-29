// The countries and years are fictional exercise data, as in Homework 8.
const traveler = {
  name: "Jean-Pierre Tas",
  countries: [
    { name: "Germany", year: 2025 },
    { name: "France", year: 2024 },
    { name: "United States", year: 2026 }
  ]
};

const callButton = document.getElementById("call-api");
const confirmation = document.getElementById("confirmation");

callButton.addEventListener("click", async () => {
  confirmation.textContent = "";
  callButton.disabled = true;

  try {
    const response = await fetch("/api/countries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(traveler)
    });
    const message = await response.text();
    if (!response.ok) throw new Error(message);
    confirmation.textContent = message;
  } catch (error) {
    confirmation.textContent = `Unable to call the API: ${error.message}`;
    console.error(error);
  } finally {
    callButton.disabled = false;
  }
});
