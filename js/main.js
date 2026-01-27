document.addEventListener("DOMContentLoaded", () => {
  const shopGrid = document.getElementById("shopGrid");
  const loadingText = document.getElementById("loadingText");

  const JSON_URL =
    "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/products.json";

  fetch(JSON_URL)
    .then(res => {
      if (!res.ok) throw new Error("JSON blocked");
      return res.json();
    })
    .then(data => {
      shopGrid.innerHTML = "";

      if (!data.products || data.products.length === 0) {
        shopGrid.innerHTML = "<p>No products available.</p>";
        return;
      }

      data.products.forEach(url => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${url}" alt="Product">
          <a href="https://m.me/ExoTropicAquarium" target="_blank" class="buy-btn">
            Buy via Messenger
          </a>
        `;
        shopGrid.appendChild(card);
      });

      loadingText.textContent = "";
    })
    .catch(err => {
      console.error(err);
      loadingText.textContent = "Failed to load products.";
    });
});
