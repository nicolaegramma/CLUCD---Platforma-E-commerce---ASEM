function renderProduse() {
  const container = document.getElementById('product-list');
  const pret = document.getElementById('filter-pret').value;
  const producator = document.getElementById('filter-producator').value;
  const tip = document.getElementById('filter-tip').value;

  let list = [...produse];

  if (producator) list = list.filter(p => p.producator === producator);
  if (tip) list = list.filter(p => p.tip === tip);
  if (pret === "asc") list.sort((a, b) => a.pret - b.pret);
  if (pret === "desc") list.sort((a, b) => b.pret - a.pret);

container.innerHTML = list.map(p => `
  <div class="product-card">
    <img src="${p.img}" alt="${p.titlu}">
    <div class="product-card-content">
      <h3>${p.titlu}</h3>
      <p>${p.pret} MDL</p>
      <button onclick="adaugaInCos(${p.id})">
  <i class="fas fa-shopping-cart"></i> Adaugă în coș
</button>
      <button onclick="deschideDetalii(${p.id})">
  <i class="fas fa-eye"></i> Vezi detalii
</button>

    </div>
  </div>
`).join('');

}

function deschideDetalii(id) {
  const p = produse.find(p => p.id === id);
  if (!p) return;
   
  document.getElementById('modal-title').textContent = p.titlu;
  document.getElementById('modal-img').src = p.img;
  document.getElementById('modal-desc').textContent = p.descriere;
  document.getElementById('product-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('product-modal').style.display = 'none';
}


document.querySelectorAll('.filters select').forEach(el => el.addEventListener('change', renderProduse));
window.onload = renderProduse;