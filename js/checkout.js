
function incarcareDateCos() {
  const cartItems = JSON.parse(localStorage.getItem("cos")) || [];
  const container = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  if (!cartItems.length) {
    alert("Coșul este gol. Vei fi redirecționat către produse.");
    window.location.href = "produse.html";
    return;
  }

  let total = 0;
  container.innerHTML = "";

  cartItems.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.className = "order-item";
    itemElement.innerHTML = `
      <span>${item.titlu} x${item.cantitate}</span>
      <span>${item.pret * item.cantitate} MDL</span>
    `;
    total += item.pret * item.cantitate;
    container.appendChild(itemElement);
  });

  totalDisplay.textContent = total + " MDL";
}

function finalizeazaComanda() {
  const nume = document.getElementById("nume").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefon = document.getElementById("telefon").value.trim();
  const adresa = document.getElementById("adresa").value.trim();
  const plata = document.getElementById("plata").value;
  const livrare = document.getElementById("livrare").value;
  const promo = document.getElementById("promo").value.trim();

  if (!nume || !email || !telefon || !adresa) {
    alert("Te rugăm să completezi toate câmpurile.");
    return;
  }

  const cos = JSON.parse(localStorage.getItem("cos")) || [];
  let total = cos.reduce((acc, item) => acc + item.pret * item.cantitate, 0);
  let discount = 0;
  let taxaLivrare = 0;

  // Reducere promoțională
  if (promo.toUpperCase() === "CLUCD2025") {
    discount = total * 0.025;
    total -= discount;
  }

  // Taxa de livrare
  if (livrare === "domiciliu") {
    if (total < 2000) {
      taxaLivrare = 100;
      total += taxaLivrare;
    }
  }

  const dateComanda = {
    nume, email, telefon, adresa, plata, livrare,
    produse: cos,
    discount: discount.toFixed(2),
    taxaLivrare: taxaLivrare.toFixed(2),
    total: total.toFixed(2)
  };

  descarcaComandaCaTxt(dateComanda);

  localStorage.removeItem("cos");
  window.location.href = "comanda-finalizata.html";
}

function descarcaComandaCaTxt(date) {
  const acum = new Date();
  const zi = String(acum.getDate()).padStart(2, '0');
  const luna = String(acum.getMonth() + 1).padStart(2, '0');
  const an = acum.getFullYear();
  const ora = String(acum.getHours()).padStart(2, '0');
  const minut = String(acum.getMinutes()).padStart(2, '0');

  const dataStr = `${zi}.${luna}.${an}`;
  const oraStr = `${ora}:${minut}`;
  const numeFisier = `comanda_${an}-${luna}-${zi}_${ora}-${minut}.txt`;

  const continut = `
Comandă CLUCD
Data: ${dataStr}, Ora: ${oraStr}

Nume: ${date.nume}
Email: ${date.email}
Telefon: ${date.telefon}
Adresă: ${date.adresa}
Metodă plată: ${date.plata}
Livrare: ${date.livrare}

Produse:
${date.produse.map(p => `- ${p.titlu} x${p.cantitate} (${p.pret} MDL)`).join('\n')}

Reducere aplicată: ${date.discount} MDL
Taxă livrare: ${date.taxaLivrare} MDL
Total final: ${date.total} MDL
`;

  const blob = new Blob([continut], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = numeFisier;
  link.click();
}

window.onload = incarcareDateCos;


function actualizeazaTotalLive() {
  const cos = JSON.parse(localStorage.getItem("cos")) || [];
  let subtotal = cos.reduce((acc, item) => acc + item.pret * item.cantitate, 0);
  let total = subtotal;
  let discount = 0;
  let taxaLivrare = 0;

  const promo = document.getElementById("promo").value.trim();
  const livrare = document.getElementById("livrare").value;
  const mesajLivrare = document.getElementById("mesaj-livrare");
  const mesajReducere = document.getElementById("mesaj-reducere");

  if (promo.toUpperCase() === "CLUCD2025") {
    discount = total * 0.025;
    total -= discount;
    if (mesajReducere) mesajReducere.textContent = "Reducere aplicată: -" + discount.toFixed(2) + " MDL";
  } else {
    if (mesajReducere) mesajReducere.textContent = "";
  }

  if (livrare === "domiciliu") {
    if (total < 2000) {
      taxaLivrare = 100;
      if (mesajLivrare) mesajLivrare.textContent = "Livrare la domiciliu: 100 MDL";
    } else {
      taxaLivrare = 0;
      if (mesajLivrare) mesajLivrare.textContent = "Livrare gratuită (comandă peste 2000 MDL)";
    }
  } else {
    taxaLivrare = 0;
    if (mesajLivrare) mesajLivrare.textContent = "Ridicare din magazin: 0 MDL";
  }

  total += taxaLivrare;

  const totalDisplay = document.getElementById("cart-total");
  totalDisplay.textContent = total.toFixed(2) + " MDL";
}

document.addEventListener("DOMContentLoaded", () => {
  const promoInput = document.getElementById("promo");
  const livrareSelect = document.getElementById("livrare");

  if (promoInput && livrareSelect) {
    promoInput.addEventListener("input", actualizeazaTotalLive);
    livrareSelect.addEventListener("change", actualizeazaTotalLive);
  }

  actualizeazaTotalLive(); // rulează imediat la încărcare
});
