const sampleForm = document.getElementById("sample-form");
const confirmation = document.getElementById("confirmation");
const submitButton = sampleForm.querySelector("button[type=submit]");

sampleForm.addEventListener("submit", async event => {
  event.preventDefault();
  confirmation.textContent = "";
  submitButton.disabled = true;

  try {
    const response = await fetch("/form", {
      method: "POST",
      body: new URLSearchParams(new FormData(sampleForm))
    });
    const message = await response.text();
    if (!response.ok) throw new Error(message);
    confirmation.textContent = message;
  } catch (error) {
    confirmation.textContent = `Unable to submit the form: ${error.message}`;
    console.error(error);
  } finally {
    submitButton.disabled = false;
  }
});

sampleForm.addEventListener("reset", () => {
  confirmation.textContent = "";
});
