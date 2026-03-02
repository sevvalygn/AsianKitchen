// Menü verisi: id, title, category, price, img, desc
const menu = [
  {
    id: 1,
    title: 'Tteokbokki',
    category: 'Korea',
    price: 10.99,
    img: 'https://images.unsplash.com/photo-1569718212165-3a2854114a6e?w=400&h=400&fit=crop',
    desc: 'Spicy rice cakes, serving with fish cake.'
  },
  {
    id: 2,
    title: 'Chicken Ramen',
    category: 'Japan',
    price: 7.99,
    img: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&h=400&fit=crop',
    desc: 'Chicken noodle soup, serving with vegetables such as soy bean, green onion. In an optional you can ask for egg.'
  },
  {
    id: 3,
    title: 'Bibimbap',
    category: 'Korea',
    price: 8.99,
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
    desc: 'Boiling vegetables, serving with special hot sauce'
  },
  {
    id: 4,
    title: 'Dan Dan Mian',
    category: 'China',
    price: 5.99,
    img: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&h=400&fit=crop',
    desc: 'Dan dan noodle, serving with green onion'
  },
  {
    id: 5,
    title: 'Yangzhou Fried Rice',
    category: 'China',
    price: 12.99,
    img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=400&fit=crop',
    desc: 'Yangzhou style fried rice, serving with bean and pickles'
  },
  {
    id: 6,
    title: 'Onigiri',
    category: 'Japan',
    price: 9.99,
    img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=400&fit=crop',
    desc: 'Rice Sandwich, serving with soy sauce'
  }
];

const btnContainer = document.getElementById('btnContainer');
const menuGrid = document.getElementById('menuGrid');

// reduce: menüden benzersiz kategorileri çıkar (["Korea", "Japan", "China"])
const categories = menu.reduce(
  (acc, item) => {
    if (!acc.includes(item.category)) acc.push(item.category);
    return acc;
  },
  []
);

// "All" + kategorileri birleştir, map ile buton oluştur
const filterNames = ['All', ...categories];

const buttons = filterNames.map((name) => {
  const btn = document.createElement('button');
  btn.className = 'filter-btn' + (name === 'All' ? ' active' : '');
  btn.textContent = name;
  btn.dataset.category = name;
  return btn;
});

buttons.forEach((btn) => btnContainer.appendChild(btn));

// map: menü listesini HTML string listesine çevir
function renderMenu(items) {
  const html = items
    .map(
      (item) => `
    <article class="menu-item" data-id="${item.id}">
      <img src="${item.img}" alt="${item.title}" />
      <div class="info">
        <div class="header">
          <h3>${item.title}</h3>
          <span class="price">${item.price}</span>
        </div>
        <p class="desc">${item.desc}</p>
      </div>
    </article>
  `
    )
    .join('');
  menuGrid.innerHTML = html;
}

// Tıklanınca filtrele ve render et
function filterMenu(category) {
  const filtered =
    category === 'All'
      ? menu
      : menu.filter((item) => item.category === category);
  renderMenu(filtered);
}

btnContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  filterMenu(btn.dataset.category);
});

// İlk yüklemede tüm menüyü göster
renderMenu(menu);
