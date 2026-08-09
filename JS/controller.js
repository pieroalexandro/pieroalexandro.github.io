const FartGymController = (function () {

  let carruselActual = 0;
  let carruselTotal = 0;
  let productoActualId = null;
  let carruselTimer = null;
  let periodoActual = 'mensual';
  let catTiendaActual = 'todos';
  let filtroGaleria = 'todos';

  function initNav() {
    const nav = document.querySelector('nav');
    const navUl = document.querySelector('nav ul');
    if (!nav || !navUl) return;

    const hamburguesa = document.createElement('button');
    hamburguesa.className = 'hamburguesa';
    hamburguesa.setAttribute('aria-label', 'Abrir menú');
    hamburguesa.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(hamburguesa);

    hamburguesa.addEventListener('click', function () {
      navUl.classList.toggle('abierto');
      hamburguesa.classList.toggle('activo');
    });

    document.querySelectorAll('nav ul a').forEach(function (a) {
      a.addEventListener('click', function () {
        navUl.classList.remove('abierto');
        hamburguesa.classList.remove('activo');
      });
    });

    const secciones = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul a[href^="#"]');

    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
      let actual = '';
      secciones.forEach(function (s) {
        if (s.getBoundingClientRect().top <= 120) actual = s.id;
      });
      navLinks.forEach(function (l) {
        l.classList.toggle('nav-activo', l.getAttribute('href') === '#' + actual);
      });
    }, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#tienda') return;
        const dest = document.querySelector(href);
        if (dest) {
          e.preventDefault();
          dest.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function initGaleria() {
    const contenedor = document.querySelector('.galeria-grid');
    if (!contenedor) return;

    filtroGaleria = FartGymModels.getFiltroGaleria();
    FartGymViews.renderGaleria(FartGymModels.getGaleriaItems(filtroGaleria), contenedor);

    const filtros = document.querySelectorAll('.filtro');
    filtros.forEach(function (f) {
      f.classList.toggle('activo', f.getAttribute('data-filtro') === filtroGaleria);
    });

    filtros.forEach(function (filtro) {
      filtro.addEventListener('click', function () {
        filtros.forEach(function (f) { f.classList.remove('activo'); });
        filtro.classList.add('activo');
        filtroGaleria = filtro.getAttribute('data-filtro');
        FartGymModels.guardarFiltroGaleria(filtroGaleria);
        FartGymViews.renderGaleria(FartGymModels.getGaleriaItems(filtroGaleria), contenedor);
        initLightbox();
      });
    });

    initLightbox();
  }

  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTag = document.getElementById('lightbox-tag');
    const lightboxTit = document.getElementById('lightbox-titulo');
    let itemsVisibles = [];
    let indiceActual = 0;

    function abrirLightbox(item) {
      itemsVisibles = Array.from(document.querySelectorAll('.galeria-item')).filter(function (i) {
        return i.querySelector('img') && i.getAttribute('data-tipo') !== 'video';
      });
      indiceActual = itemsVisibles.indexOf(item);
      if (indiceActual === -1) indiceActual = 0;
      mostrar(indiceActual);
      lightbox.classList.add('abierto');
      document.body.style.overflow = 'hidden';
    }

    function mostrar(idx) {
      const item = itemsVisibles[idx];
      if (!item) return;
      const img = item.querySelector('img');
      if (!img) return;
      lightboxImg.style.opacity = '0';
      setTimeout(function () {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightboxImg.style.opacity = '1';
        const tagEl = item.querySelector('.galeria-tag');
        lightboxTag.textContent = tagEl ? tagEl.textContent : '';
        lightboxTit.textContent = item.getAttribute('data-titulo') || '';
      }, 80);
    }

    function cerrar() {
      lightbox.classList.remove('abierto');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.galeria-item').forEach(function (item) {
      item.addEventListener('click', function () {
        if (item.getAttribute('data-tipo') === 'video') return;
        if (item.querySelector('img')) abrirLightbox(item);
      });
    });

    document.getElementById('lightbox-cerrar').onclick = cerrar;
    document.getElementById('lightbox-prev').onclick = function () {
      indiceActual = (indiceActual - 1 + itemsVisibles.length) % itemsVisibles.length;
      mostrar(indiceActual);
    };
    document.getElementById('lightbox-next').onclick = function () {
      indiceActual = (indiceActual + 1) % itemsVisibles.length;
      mostrar(indiceActual);
    };
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) cerrar(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('abierto')) return;
      if (e.key === 'Escape') cerrar();
      if (e.key === 'ArrowLeft') { indiceActual = (indiceActual - 1 + itemsVisibles.length) % itemsVisibles.length; mostrar(indiceActual); }
      if (e.key === 'ArrowRight') { indiceActual = (indiceActual + 1) % itemsVisibles.length; mostrar(indiceActual); }
    });
  }

  function initPlanes() {
    const contenedor = document.querySelector('.planes-grid');
    if (!contenedor) return;

    const planFavorito = FartGymModels.getPlanFavorito();
    FartGymViews.renderPlanes(FartGymModels.getPlanes(periodoActual), contenedor);

    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        toggleBtns.forEach(function (b) { b.classList.remove('activo'); });
        btn.classList.add('activo');
        periodoActual = btn.getAttribute('data-periodo');
        FartGymViews.renderPlanes(FartGymModels.getPlanes(periodoActual), contenedor);
        initScrollReveal();

        contenedor.querySelectorAll('.plan-btn').forEach(function (btnPlan) {
          btnPlan.addEventListener('click', function (e) {
            e.preventDefault();
            const card = btnPlan.closest('.plan-card');
            const planId = card ? card.getAttribute('data-plan-id') : '';
            FartGymModels.guardarPlanFavorito(planId);
            FartGymViews.renderNotificacion('Plan guardado. ¡Te redirigimos!', 'ok');
            setTimeout(function () {
              document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
            }, 800);
          });
        });
      });
    });

    contenedor.querySelectorAll('.plan-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const card = btn.closest('.plan-card');
        const planId = card ? card.getAttribute('data-plan-id') : '';
        FartGymModels.guardarPlanFavorito(planId);
        FartGymViews.renderNotificacion('Plan guardado. ¡Te redirigimos!', 'ok');
        setTimeout(function () {
          document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
        }, 800);
      });
    });

    if (planFavorito) {
      const card = contenedor.querySelector('[data-plan-id="' + planFavorito + '"]');
      if (card) card.classList.add('plan-favorito');
    }
  }

  function initTienda() {
    const tiendaFab = document.getElementById('tienda-fab');
    const tiendaDrawer = document.getElementById('tienda-drawer');
    const tiendaOverlay = document.getElementById('tienda-overlay');
    const tiendaCerrar = document.getElementById('tienda-cerrar');
    const tiendaGrid = document.getElementById('tienda-grid');
    if (!tiendaDrawer || !tiendaGrid) return;

    FartGymViews.renderProductos(FartGymModels.getProductos(), tiendaGrid);
    bindProductoCards();

    const navTienda = document.querySelector('a[href="#tienda"]');
    function abrir() { tiendaDrawer.classList.add('abierto'); tiendaOverlay.classList.add('activo'); document.body.style.overflow = 'hidden'; }
    function cerrar() {
      tiendaDrawer.classList.remove('abierto');
      tiendaOverlay.classList.remove('activo');
      if (!document.getElementById('producto-modal').classList.contains('abierto')) document.body.style.overflow = '';
    }

    if (tiendaFab) tiendaFab.addEventListener('click', abrir);
    if (tiendaCerrar) tiendaCerrar.addEventListener('click', cerrar);
    if (tiendaOverlay) tiendaOverlay.addEventListener('click', cerrar);
    if (navTienda) navTienda.addEventListener('click', function (e) { e.preventDefault(); abrir(); });

    document.querySelectorAll('.tienda-filtro').forEach(function (f) {
      f.addEventListener('click', function () {
        document.querySelectorAll('.tienda-filtro').forEach(function (x) { x.classList.remove('activo'); });
        f.classList.add('activo');
        catTiendaActual = f.getAttribute('data-cat');
        FartGymViews.renderProductos(FartGymModels.getProductos(catTiendaActual), tiendaGrid);
        bindProductoCards();
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        const modal = document.getElementById('producto-modal');
        if (modal && modal.classList.contains('abierto')) { cerrarModalProducto(); }
        else if (tiendaDrawer.classList.contains('abierto')) { cerrar(); }
      }
    });
  }

  function bindProductoCards() {
    const tiendaGrid = document.getElementById('tienda-grid');
    if (!tiendaGrid) return;

    tiendaGrid.querySelectorAll('.producto-card').forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (e.target.closest('.producto-btn')) return;
        const id = parseInt(card.getAttribute('data-id'));
        const prod = FartGymModels.getProductoPorId(id);
        if (prod) {
          productoActualId = id;
          carruselTotal = prod.imgs.length;
          carruselActual = 0;
          FartGymViews.renderModalProducto(prod, 0);
          iniciarAutoCarrusel();
          bindModalDots();
        }
      });
    });

    tiendaGrid.querySelectorAll('.producto-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        const prod = FartGymModels.getProductoPorId(id);
        if (prod) {
          FartGymModels.agregarAlCarrito(prod);
          actualizarCarritoBadge();
          FartGymViews.renderNotificacion(prod.nombre + ' agregado al carrito ✓', 'ok');
        }
      });
    });
  }

  function bindModalDots() {
    document.querySelectorAll('.modal-dot').forEach(function (dot) {
      dot.addEventListener('click', function () {
        const idx = parseInt(dot.getAttribute('data-idx'));
        carruselActual = idx;
        FartGymViews.actualizarCarruselModal(carruselActual, carruselTotal);
      });
    });
  }

  function iniciarAutoCarrusel() {
    clearInterval(carruselTimer);
    carruselTimer = setInterval(function () {
      const modal = document.getElementById('producto-modal');
      if (modal && modal.classList.contains('abierto')) {
        carruselActual = (carruselActual + 1) % carruselTotal;
        FartGymViews.actualizarCarruselModal(carruselActual, carruselTotal);
      }
    }, 3500);
  }

  function cerrarModalProducto() {
    const modal = document.getElementById('producto-modal');
    const overlay = document.getElementById('producto-modal-overlay');
    if (modal) modal.classList.remove('abierto');
    if (overlay) overlay.classList.remove('activo');
    clearInterval(carruselTimer);
    const tiendaDrawer = document.getElementById('tienda-drawer');
    if (!tiendaDrawer || !tiendaDrawer.classList.contains('abierto')) document.body.style.overflow = '';
  }

  function initModalProducto() {
    const modalCerrarX = document.getElementById('producto-modal-cerrar');
    const modalCerrarBtn = document.getElementById('modal-cerrar-btn');
    const modalPedirBtn = document.getElementById('modal-pedir-btn');
    const modalOverlay = document.getElementById('producto-modal-overlay');
    const btnPrev = document.getElementById('modal-prev');
    const btnNext = document.getElementById('modal-next');
    const track = document.getElementById('modal-carousel-track');

    if (modalCerrarX) modalCerrarX.addEventListener('click', cerrarModalProducto);
    if (modalCerrarBtn) modalCerrarBtn.addEventListener('click', cerrarModalProducto);
    if (modalOverlay) modalOverlay.addEventListener('click', cerrarModalProducto);

    if (btnPrev) btnPrev.addEventListener('click', function () {
      carruselActual = (carruselActual - 1 + carruselTotal) % carruselTotal;
      FartGymViews.actualizarCarruselModal(carruselActual, carruselTotal);
    });
    if (btnNext) btnNext.addEventListener('click', function () {
      carruselActual = (carruselActual + 1) % carruselTotal;
      FartGymViews.actualizarCarruselModal(carruselActual, carruselTotal);
    });

    if (track) {
      let tx = 0;
      track.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
      track.addEventListener('touchend', function (e) {
        const diff = tx - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
          carruselActual = (carruselActual + (diff > 0 ? 1 : -1) + carruselTotal) % carruselTotal;
          FartGymViews.actualizarCarruselModal(carruselActual, carruselTotal);
        }
      });
    }

    if (modalPedirBtn) {
      modalPedirBtn.addEventListener('click', function () {
        const prod = FartGymModels.getProductoPorId(productoActualId);
        if (!prod) return;
        FartGymModels.agregarAlCarrito(prod);
        actualizarCarritoBadge();
        FartGymViews.renderNotificacion(prod.nombre + ' agregado al carrito ✓', 'ok');
      });
    }
  }

  function actualizarCarritoBadge() {
    const carrito = FartGymModels.getCarrito();
    const total = carrito.reduce(function (acc, p) { return acc + p.cantidad; }, 0);
    FartGymViews.renderContadorCarrito(total);
  }

  function initCarrito() {
    const btn = document.getElementById('carrito-toggle');
    const panel = document.getElementById('carrito-panel');
    const overlay = document.getElementById('carrito-overlay');
    const cerrar = document.getElementById('carrito-cerrar');
    const contenidoTabla = document.getElementById('carrito-tabla-contenedor');
    const btnLimpiar = document.getElementById('carrito-limpiar');
    const btnEnviar = document.getElementById('carrito-enviar-wa');

    function abrirCarrito() {
      panel.classList.add('abierto');
      if (overlay) overlay.classList.add('activo');
      FartGymViews.renderCarritoTabla(FartGymModels.getCarrito(), contenidoTabla);
      FartGymViews.renderResumenCarrito(FartGymModels.getTotalCarrito());
      bindQuitarCarrito(contenidoTabla);
    }

    function cerrarCarrito() {
      panel.classList.remove('abierto');
      if (overlay) overlay.classList.remove('activo');
    }

    actualizarCarritoBadge();

    if (btn) btn.addEventListener('click', function () {
      if (panel.classList.contains('abierto')) {
        cerrarCarrito();
      } else {
        abrirCarrito();
      }
    });

    if (cerrar) cerrar.addEventListener('click', cerrarCarrito);
    if (overlay) overlay.addEventListener('click', cerrarCarrito);

    if (btnLimpiar) btnLimpiar.addEventListener('click', function () {
      FartGymModels.limpiarCarrito();
      FartGymViews.renderCarritoTabla([], contenidoTabla);
      FartGymViews.renderResumenCarrito(0);
      actualizarCarritoBadge();
    });

    if (btnEnviar) btnEnviar.addEventListener('click', function () {
      const carrito = FartGymModels.getCarrito();
      if (!carrito.length) { FartGymViews.renderNotificacion('Tu carrito está vacío', 'error'); return; }
      let txt = '¡Hola, Fart Gym! 👋\nQuiero hacer el siguiente pedido:';
      carrito.forEach(function (p) { txt += '\n- ' + p.nombre + ' x' + p.cantidad; });
      txt += '\n\nTotal estimado: S/ ' + FartGymModels.getTotalCarrito() + '\nEstoy interesado(a) en confirmar los detalles y el envío.';
      window.open('https://wa.me/51963288675?text=' + encodeURIComponent(txt), '_blank');
    });
  }

  function bindQuitarCarrito(contenedor) {
    if (!contenedor) return;
    contenedor.querySelectorAll('.carrito-quitar').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = parseInt(btn.getAttribute('data-id'));
        FartGymModels.eliminarDelCarrito(id);
        FartGymViews.renderCarritoTabla(FartGymModels.getCarrito(), contenedor);
        FartGymViews.renderResumenCarrito(FartGymModels.getTotalCarrito());
        actualizarCarritoBadge();
        bindQuitarCarrito(contenedor);
      });
    });
  }

  function initFormulario() {
    const btnEnviar = document.getElementById('enviar-whatsapp');
    if (!btnEnviar) return;

    const draft = FartGymModels.getFormDraft();
    const campos = ['nombre', 'telefono', 'mensaje'];
    campos.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && draft[id]) el.value = draft[id];
      if (el) el.addEventListener('input', guardarDraft);
    });

    const planFav = FartGymModels.getPlanFavorito();
    if (planFav) {
      const sel = document.getElementById('plan-interes');
      if (sel) {
        for (let i = 0; i < sel.options.length; i++) {
          if (sel.options[i].value === planFav) { sel.selectedIndex = i; break; }
        }
      }
    }

    function guardarDraft() {
      FartGymModels.guardarFormDraft({
        nombre: document.getElementById('nombre') ? document.getElementById('nombre').value : '',
        telefono: document.getElementById('telefono') ? document.getElementById('telefono').value : '',
        mensaje: document.getElementById('mensaje') ? document.getElementById('mensaje').value : ''
      });
    }

    btnEnviar.addEventListener('click', function () {
      const nombre = document.getElementById('nombre').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const plan = document.getElementById('plan-interes').value;
      const mensaje = document.getElementById('mensaje').value.trim();
      if (!nombre) { FartGymViews.sacudirCampo(document.getElementById('nombre')); return; }
      const planTexto = {
        'mensual-basico': 'Membresia 1 Mes — S/ 129.99 SOLES',
        'mensual-plus': 'Membresia 3 Meses — S/ 299.99 SOLES',
        'mensual-pro': 'Membresia 6 Meses — S/ 499.99 SOLES',
        'mensual-elite': 'Membresia 12 Meses — S/ 799.99 SOLES',
        'promo-inicio': 'Promo Estudiantil 1 Meses — S/ 80.00 SOLES',
        'promo-fuerza': 'Promo Estudiantil 3 Meses — S/ 150.00 SOLES',
        'promo-energia': 'Promo Estudiantes Duo - S/ 70.00/mes/c/u',
        'promo-dupla': 'Promo Ahorrador 3 Meses - S/ 200.00 SOLES',
        'promo-ritmo': 'Promo Duo 3 Meses - S/ 360.00 SOLES',
        fullDay: 'Full Day - S/ 10 SOLES'
      };
      let txt = '¡Hola, Fart Gym! 👋\nMi nombre es *' + nombre + '* y me gustaría recibir más información sobre sus membresías.\n';
      if (telefono) txt += 'Mi teléfono: ' + telefono + '\n';
      if (plan) txt += 'Estoy interesado(a) en: *' + (planTexto[plan] || plan) + '*\n';
      if (mensaje) txt += 'Mensaje: ' + mensaje + '\n';
      txt += 'Gracias por su apoyo y por la atención.';
      FartGymModels.limpiarFormDraft();
      window.open('https://wa.me/51963288675?text=' + encodeURIComponent(txt), '_blank');
    });
  }

  function initLibroReclamaciones() {
    const btn = document.getElementById('lr-enviar');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const nombre = document.getElementById('lr-nombre').value.trim();
      const dni = document.getElementById('lr-dni').value.trim();
      const telefono = document.getElementById('lr-telefono').value.trim();
      const correo = document.getElementById('lr-correo').value.trim();
      const domicilio = document.getElementById('lr-domicilio').value.trim();
      const tipoBien = document.getElementById('lr-tipo-bien').value;
      const monto = document.getElementById('lr-monto').value.trim();
      const desc = document.getElementById('lr-descripcion').value.trim();
      const tipoRec = document.getElementById('lr-tipo-reclamo').value;
      const detalle = document.getElementById('lr-detalle').value.trim();
      const pedido = document.getElementById('lr-pedido').value.trim();
      if (!nombre || !dni || !telefono || !correo || !domicilio || !tipoBien || !desc || !tipoRec || !detalle || !pedido) {
        FartGymViews.renderNotificacion('Completa todos los campos obligatorios (*)', 'error');
        return;
      }
      let txt = '📋 *LIBRO DE RECLAMACIONES — FART GYM*\n\n';
      txt += '*Nombre:* ' + nombre + '\n*DNI/CE:* ' + dni + '\n*Teléfono:* ' + telefono + '\n*Correo:* ' + correo + '\n*Domicilio:* ' + domicilio + '\n\n';
      txt += '*Bien:* ' + desc + ' (' + tipoBien + ')';
      if (monto) txt += ' — S/ ' + monto;
      txt += '\n\n*Tipo:* ' + (tipoRec === 'reclamo' ? 'Reclamo' : 'Queja') + '\n*Detalle:* ' + detalle + '\n*Pedido:* ' + pedido + '\n\nGracias por comunicarte con nosotros.';
      window.open('https://wa.me/51963288675?text=' + encodeURIComponent(txt), '_blank');
    });
  }

  function initScrollReveal() {
    const elementos = document.querySelectorAll('.plan-card, .dato, .whatsapp-btn, .red-btn, .colab-card');
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    elementos.forEach(function (el) { el.classList.add('oculto-scroll'); obs.observe(el); });
  }

  function initParallax() {
    const heroBg = document.querySelector('.hero-bg');
    const heroLines = document.querySelector('.hero-lines');
    window.addEventListener('scroll', function () {
      const s = window.scrollY;
      if (s < window.innerHeight) {
        if (heroBg) heroBg.style.transform = 'translateY(' + (s * 0.15) + 'px)';
        if (heroLines) heroLines.style.transform = 'translateY(' + (s * 0.08) + 'px)';
      }
    }, { passive: true });
  }

  function initContadores() {
    const stats = document.querySelectorAll('.stat-num');
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const span = el.querySelector('span');
        const sufijo = span ? span.textContent : '';
        const objetivo = parseInt(el.textContent.replace(sufijo, '').trim());
        if (isNaN(objetivo)) return;
        obs.unobserve(el);
        let n = 0;
        const paso = 1200 / objetivo;
        const t = setInterval(function () {
          n += Math.ceil(objetivo / 40);
          if (n >= objetivo) { n = objetivo; clearInterval(t); }
          el.textContent = n;
          if (span) { const s2 = document.createElement('span'); s2.textContent = sufijo; el.appendChild(s2); }
        }, paso);
      });
    }, { threshold: 0.5 });
    stats.forEach(function (s) { obs.observe(s); });
  }

  function initRipple() {
    document.querySelectorAll('.btn-primary, .plan-btn, .formulario-btn, .producto-btn, .modal-pedir-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.22);pointer-events:none;transform:scale(0);animation:rippleAnim 0.5s ease;width:100px;height:100px;left:' + (e.clientX - rect.left - 50) + 'px;top:' + (e.clientY - rect.top - 50) + 'px;';
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 600);
      });
    });
  }

  return {
    initNav,
    initGaleria,
    initLightbox,
    initPlanes,
    initTienda,
    initModalProducto,
    initCarrito,
    initFormulario,
    initLibroReclamaciones,
    initScrollReveal,
    initParallax,
    initContadores,
    initRipple,
    actualizarCarritoBadge
  };
})();