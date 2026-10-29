const articleForm = document.getElementById("article-form");
const confirmation = document.getElementById("confirmation");
const addButton = articleForm.querySelector("button[type=submit]");

articleForm.addEventListener("submit", async event => {
  event.preventDefault();
  confirmation.textContent = "";
  addButton.disabled = true;

  try {
    const response = await fetch("/articles", {
      method: "POST",
      body: new URLSearchParams(new FormData(articleForm))
    });
    const message = await response.text();
    if (!response.ok) throw new Error(message);
    confirmation.textContent = message;
    articleForm.reset();
  } catch (error) {
    confirmation.textContent = `Unable to add the article: ${error.message}`;
    console.error(error);
  } finally {
    addButton.disabled = false;
  }
});
