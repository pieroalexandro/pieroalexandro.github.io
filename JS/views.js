const FartGymViews = (function () {

  function renderProductos(productos, contenedor) {
    if (!contenedor) return;
    contenedor.innerHTML = '';
    productos.forEach(function (p) {
      const card = document.createElement('div');
      card.className = 'producto-card';
      card.setAttribute('data-cat', p.cat);
      card.setAttribute('data-id', p.id);
      card.innerHTML = `
        <div class="producto-img">
          <img src="${p.imgs[0]}" alt="${p.nombre}" onerror="this.parentElement.classList.add('sin-img');this.style.display='none'"/>
          <span class="producto-badge ${p.cat}">${p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}</span>
          <div class="producto-img-overlay"><span>Ver detalle →</span></div>
        </div>
        <div class="producto-info">
          <h4 class="producto-nombre">${p.nombre}</h4>
          <p class="producto-desc">${p.desc}</p>
          <div class="producto-footer">
            <span class="producto-precio">S/ ${p.precio}</span>
            <button class="producto-btn" data-id="${p.id}" data-nombre="${p.nombre}" data-precio="${p.precio}">Añadir al carrito →</button>
          </div>
        </div>`;
      contenedor.appendChild(card);
    });
  }

  function renderModalProducto(producto, carruselIdx) {
    const modal = document.getElementById('producto-modal');
    if (!modal) return;
    document.getElementById('modal-nombre').textContent = producto.nombre;
    document.getElementById('modal-desc').textContent = producto.desc;
    document.getElementById('modal-precio').textContent = 'S/ ' + producto.precio;

    const badge = document.getElementById('modal-badge');
    badge.textContent = producto.cat.charAt(0).toUpperCase() + producto.cat.slice(1);
    badge.className = 'modal-badge ' + producto.cat;

    const track = document.getElementById('modal-carousel-track');
    const dots = document.getElementById('modal-dots');
    if (track) {
      track.innerHTML = '';
      dots.innerHTML = '';
      producto.imgs.forEach(function (src, i) {
        const slide = document.createElement('div');
        slide.className = 'modal-carousel-slide';
        const img = document.createElement('img');
        img.src = src;
        img.alt = producto.nombre + ' ' + (i + 1);
        img.onerror = function () { slide.classList.add('no-img'); img.style.display = 'none'; };
        slide.appendChild(img);
        track.appendChild(slide);

        const dot = document.createElement('button');
        dot.className = 'modal-dot' + (i === 0 ? ' activo' : '');
        dot.setAttribute('data-idx', i);
        dots.appendChild(dot);
      });
    }

    const featuresEl = document.getElementById('modal-features');
    if (featuresEl) {
      featuresEl.innerHTML = '';
      producto.features.forEach(function (f, i) {
        const item = document.createElement('div');
        item.className = 'modal-feature-item';
        item.textContent = f;
        item.style.animationDelay = (i * 0.06) + 's';
        featuresEl.appendChild(item);
      });
    }

    actualizarCarruselModal(0, producto.imgs.length);
    document.getElementById('producto-modal-overlay').classList.add('activo');
    modal.classList.add('abierto');
    document.body.style.overflow = 'hidden';
  }

  function actualizarCarruselModal(idx, total) {
    const track = document.getElementById('modal-carousel-track');
    const counter = document.getElementById('modal-counter');
    if (track) track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    if (counter) counter.textContent = (idx + 1) + ' / ' + total;
    document.querySelectorAll('.modal-dot').forEach(function (d, i) {
      d.classList.toggle('activo', i === idx);
    });
  }

  function construirFuentesVideo(src) {
    if (!src) return [];
    const base = src.replace(/\.(mp4|webm|mov|ogg)$/i, '');
    return [base + '.mp4', base + '.webm', base + '.mov', base + '.ogg'].filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  }

  function getGaleriaPlaceholder(item) {
    const categoria = (item.categoria || 'galeria').toLowerCase();
    const palette = {
      trabajadores: ['#22c55e', '#052e16'],
      equipos: ['#f59e0b', '#1f2937'],
      areas: ['#38bdf8', '#0f172a'],
      clases: ['#a78bfa', '#312e81'],
      comunidad: ['#fb7185', '#4c0519']
    };
    const [colorA, colorB] = palette[categoria] || ['#22c55e', '#111827'];
    const titulo = (item.titulo || 'Fart Gym').toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const etiqueta = (item.tag || categoria || 'Galería').toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
        <rect width="1200" height="900" fill="#070b10"/>
        <rect x="36" y="36" width="1128" height="828" rx="36" fill="url(#grad)" stroke="rgba(255,255,255,0.16)" stroke-width="4"/>
        <circle cx="950" cy="260" r="180" fill="rgba(255,255,255,0.10)"/>
        <circle cx="280" cy="680" r="140" fill="rgba(255,255,255,0.08)"/>
        <path d="M130 720c140-140 280-200 420-120 120 70 200 80 320 40" stroke="rgba(255,255,255,0.14)" stroke-width="8" fill="none" stroke-linecap="round"/>
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${colorA}"/>
            <stop offset="100%" stop-color="${colorB}"/>
          </linearGradient>
        </defs>
        <text x="600" y="360" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="700" fill="white">${titulo}</text>
        <text x="600" y="440" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="500" fill="rgba(255,255,255,0.82)">${etiqueta}</text>
        <text x="600" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.70)">Vista previa de ejemplo · Fart Gym</text>
      </svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  function renderGaleria(items, contenedor) {
    if (!contenedor) return;
    contenedor.innerHTML = '';
    const btn = document.getElementById('galeria-ver-mas');
    let mostrados = 0;
    let expandida = false;

    function limpiarGaleria() {
      contenedor.innerHTML = '';
    }

    function agregarItems(cantidad) {
      const lote = items.slice(mostrados, mostrados + cantidad);
      lote.forEach(function (item) {
        const div = document.createElement('div');
        div.className = 'galeria-item' + (item.grande ? ' grande' : '');
        div.setAttribute('data-categoria', item.categoria);
        div.setAttribute('data-titulo', item.titulo);
        div.setAttribute('data-tipo', item.tipo);

        if (item.tipo !== 'video') {
          const img = document.createElement('img');
          img.src = item.src || getGaleriaPlaceholder(item);
          img.alt = item.titulo;
          img.loading = 'lazy';
          img.onerror = function () {
            this.src = getGaleriaPlaceholder(item);
          };
          div.appendChild(img);
        }

        const overlay = document.createElement('div');
        overlay.className = 'galeria-overlay';
        overlay.innerHTML = `<span class="galeria-tag">${item.tag}</span><span class="galeria-nombre">${item.titulo}</span>`;
        div.appendChild(overlay);
        contenedor.appendChild(div);
      });
      mostrados += lote.length;
    }

    function actualizarBoton() {
      if (!btn) return;
      if (!items.length || items.length <= 4) {
        btn.style.display = 'none';
        return;
      }
      btn.style.display = 'inline-flex';
      btn.textContent = expandida ? 'Ver menos' : 'Ver más';
    }

    function mostrarInicial() {
      limpiarGaleria();
      mostrados = 0;
      expandida = false;
      agregarItems(4);
      actualizarBoton();
    }

    function alternarVista() {
      if (!expandida) {
        agregarItems(4);
        expandida = true;
      } else {
        mostrarInicial();
      }
      actualizarBoton();
      if (FartGymController && FartGymController.initLightbox) {
        FartGymController.initLightbox();
      }
    }

    mostrarInicial();

    if (btn) {
      btn.onclick = function () {
        alternarVista();
      };
    }
  }

  function renderPlanes(planes, contenedor) {
    if (!contenedor) return;
    contenedor.innerHTML = '';
    planes.forEach(function (plan) {
      const card = document.createElement('div');
      card.className = 'plan-card' + (plan.popular ? ' popular' : '');
      card.setAttribute('data-plan-id', plan.id);

      let html = '';
      if (plan.popular) html += `<div class="popular-badge">⚡ Más popular</div>`;
      html += `
        <div class="plan-top">
          <div class="plan-icono ${plan.iconoClass}">${plan.icono}</div>
          <h3 class="plan-nombre">${plan.nombre}</h3>
          <div class="plan-precio">
            <span class="moneda">S/</span>
            <span class="monto">${plan.precio}</span>
            <span class="periodo">${plan.periodo}</span>
          </div>
        </div>
        <ul class="plan-beneficios">
          ${plan.beneficios.map(function (b) { return `<li><span class="${b.ok ? 'check' : 'cruz'}">${b.ok ? '✓' : '✗'}</span> ${b.texto}</li>`; }).join('')}
        </ul>
        <a href="#contacto" class="plan-btn${plan.popular ? ' popular-btn' : ''}">Elegir plan</a>`;
      card.innerHTML = html;
      contenedor.appendChild(card);
    });
  }

  function renderCarritoTabla(carrito, contenedor) {
    if (!contenedor) return;
    if (carrito.length === 0) {
      contenedor.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío 🛒</p>';
      return;
    }
    const total = carrito.reduce(function (acc, p) { return acc + (p.precio * p.cantidad); }, 0);
    const tabla = document.createElement('table');
    tabla.className = 'carrito-tabla';
    tabla.innerHTML = `
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cant.</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${carrito.map(function (p) {
          return `<tr>
            <td class="carrito-nombre">${p.nombre}</td>
            <td>S/ ${p.precio}</td>
            <td>${p.cantidad}</td>
            <td>S/ ${p.precio * p.cantidad}</td>
            <td><button class="carrito-quitar" data-id="${p.id}">✕</button></td>
          </tr>`;
        }).join('')}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="carrito-total-label">Total</td>
          <td colspan="2" class="carrito-total">S/ ${total}</td>
        </tr>
      </tfoot>`;
    contenedor.innerHTML = '';
    contenedor.appendChild(tabla);
  }

  function renderNotificacion(msg, tipo) {
    const notif = document.createElement('div');
    notif.className = 'notif notif-' + (tipo || 'ok');
    notif.textContent = msg;
    document.body.appendChild(notif);
    requestAnimationFrame(function () { notif.classList.add('notif-visible'); });
    setTimeout(function () {
      notif.classList.remove('notif-visible');
      setTimeout(function () { notif.remove(); }, 400);
    }, 2800);
  }

  function renderContadorCarrito(cantidad) {
    const badge = document.querySelector('.carrito-badge');
    if (badge) {
      badge.textContent = cantidad;
      badge.style.display = cantidad > 0 ? 'flex' : 'none';
    }
  }

  function renderResumenCarrito(total) {
    const resumen = document.querySelector('.carrito-resumen-total');
    if (resumen) resumen.textContent = 'Total: S/ ' + total;
  }

  function sacudirCampo(campo) {
    campo.style.borderColor = '#ff4444';
    campo.style.animation = 'shake 0.4s ease';
    campo.focus();
    setTimeout(function () {
      campo.style.borderColor = '';
      campo.style.animation = '';
    }, 1200);
  }

  return {
    renderProductos,
    renderModalProducto,
    actualizarCarruselModal,
    renderGaleria,
    renderPlanes,
    renderCarritoTabla,
    renderNotificacion,
    renderContadorCarrito,
    renderResumenCarrito,
    sacudirCampo
  };
})();