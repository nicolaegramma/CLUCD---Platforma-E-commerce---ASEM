
let slides = document.querySelectorAll('.slide');
let current = 0;

function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
}

setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
}, 5000);


function adaugaInCos(id) {
  let cos = JSON.parse(localStorage.getItem('cos')) || [];
  const produs = produse.find(p => p.id === id);

  const index = cos.findIndex(p => p.id === id);
  if (index > -1) {
    cos[index].cantitate += 1;
  } else {
    cos.push({ ...produs, cantitate: 1 });
  }

  localStorage.setItem('cos', JSON.stringify(cos));
  actualizeazaCos();
}

function actualizeazaCos() {
  const cos = JSON.parse(localStorage.getItem('cos')) || [];
  document.getElementById('cart-count').textContent = cos.reduce((sum, p) => sum + p.cantitate, 0);

  const lista = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  lista.innerHTML = "";
  let suma = 0;

  cos.forEach((p, index) => {
    suma += p.pret * p.cantitate;
    lista.innerHTML += `
      <li>
        <span>${p.titlu} - ${p.pret * p.cantitate} MDL</span>
        <div class="cart-item-controls">
          <button onclick="modificaCantitate(${index}, -1)">-</button>
          <input type="text" value="${p.cantitate}" onchange="schimbaCantitate(${index}, this.value)">
          <button onclick="modificaCantitate(${index}, 1)">+</button>
          <button class="cart-item-remove" onclick="stergeProdus(${index})">×</button>
        </div>
      </li>
    `;
  });

  total.textContent = suma;
  localStorage.setItem('cos', JSON.stringify(cos));
}


function toggleCart() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = 'flex';
  actualizeazaCos();
}

function closeCartModal() {
  document.getElementById('cart-modal').style.display = 'none';
}

function modificaCantitate(index, delta) {
  let cos = JSON.parse(localStorage.getItem('cos')) || [];
  cos[index].cantitate += delta;
  if (cos[index].cantitate < 1) cos[index].cantitate = 1;
  localStorage.setItem('cos', JSON.stringify(cos));
  actualizeazaCos();
}

function schimbaCantitate(index, valoare) {
  let cos = JSON.parse(localStorage.getItem('cos')) || [];
  let nr = parseInt(valoare);
  if (isNaN(nr) || nr < 1) nr = 1;
  cos[index].cantitate = nr;
  localStorage.setItem('cos', JSON.stringify(cos));
  actualizeazaCos();
}

function stergeProdus(index) {
  let cos = JSON.parse(localStorage.getItem('cos')) || [];
  cos.splice(index, 1);
  localStorage.setItem('cos', JSON.stringify(cos));
  actualizeazaCos();
}

function golesteCos() {
  if (confirm("Ești sigur că vrei să golești coșul?")) {
    localStorage.removeItem('cos');
    actualizeazaCos();
    closeCartModal();
  }
}


function finalizeazaComanda() {
  window.location.href = "checkout.html";
}
  
document.addEventListener("DOMContentLoaded", function () {
  actualizeazaCos();
});



  window.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".header-fixed"); // clasa ta pentru navbar
    const main = document.querySelector("main");
    if (navbar && main) {
      const height = navbar.offsetHeight;
      main.style.marginTop = height + "px";
    }
  });


window.addEventListener("scroll", () => {
  const btn = document.getElementById("scrollTopBtn");
  if (window.scrollY > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
});

document.getElementById("scrollTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


window.addEventListener("load", () => {
  const preloader = document.getElementById("global-preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => preloader.style.display = "none", 600);
    }, 1500);
  }
});

  
  
  document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target.querySelector('.categorie-img');
          const text = entry.target.querySelector('.categorie-text');

          if (entry.target.classList.contains('reverse')) {
            img.classList.add('in-view-right');
            text.classList.add('in-view-left');
          } else {
            img.classList.add('in-view-left');
            text.classList.add('in-view-right');
          }

          observer.unobserve(entry.target); // o singură dată
        }
      });
    }, {
      threshold: 0.3
    });

    document.querySelectorAll('.categorie-bloc').forEach(el => observer.observe(el));
  });
  
  
  function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}
