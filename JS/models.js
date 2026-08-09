const FartGymModels = (function () {

  const STORAGE_KEYS = {
    CARRITO: 'fartgym_carrito',
    FORM_DRAFT: 'fartgym_form_draft',
    GALERIA_FILTER: 'fartgym_galeria_filter',
    VISITAS: 'fartgym_visitas',
    PLAN_FAVORITO: 'fartgym_plan_favorito'
  };

  const PRODUCTOS = [
    {
      id: 1,
      nombre: 'Proteína Whey 1kg',
      precio: 120,
      cat: 'suplementos',
      desc: 'Proteína de suero de alta pureza. Sabor chocolate.',
      imgs: [
        'img/productos/proteinas/Whey1.png',
        'img/productos/proteinas/protene.png',
        'img/productos/proteinas/prote2.png'
      ],
      features: ['⚡ 24g proteína por porción', '🍫 Sabor chocolate premium', '💪 Ideal post-entrenamiento', '📦 1 kg — ~33 porciones', '✅ Sin azúcar añadida']
    },
    {
      id: 2,
      nombre: 'Creatina 300g',
      precio: 80,
      cat: 'suplementos',
      desc: 'Creatina monohidrato pura. Aumenta fuerza y rendimiento.',
      imgs: [
        'img/productos/creatinas/Creatine1.png',
        'img/productos/creatinas/Creatine2.png',
        'img/productos/creatinas/Creatine3.png'
      ],
      features: ['💥 Creatina monohidrato 100%', '⚡ +Fuerza y explosividad', '🔬 Fórmula micronizada', '📦 300g — ~60 porciones', '✅ Sin saborizantes']
    },
    {
      id: 3,
      nombre: 'Pre-entreno 300g',
      precio: 95,
      cat: 'suplementos',
      desc: 'Energía y enfoque máximo para tus sesiones.',
      imgs: [
        'img/productos/preEntreno/Pre1.png',
        'img/productos/preEntreno/Pre2.png',
        'img/productos/preEntreno/Pre3.png'
      ],
      features: ['⚡ Energía inmediata', '🧠 Enfoque mental total', '💊 Con cafeína + beta-alanina', '📦 300g — ~30 porciones', '🔥 Activación en 15 min']
    },
    {
      id: 4,
      nombre: 'Polo Fart Gym',
      precio: 45,
      cat: 'ropa',
      desc: '100% algodón. Disponible en S, M, L, XL. (Proximamente)',
      imgs: [
        'img/ropa/polos/polPort.png',
        'img/ropa/polos/pol2.png',
        'img/ropa/polos/pol3.png'
      ],
      features: ['👕 100% algodón premium', '🎨 Logo bordado FartGym', '📐 Tallas: S / M / L / XL', '🌡️ Transpirable y cómodo', '🖤 Color negro exclusivo']
    },
    {
      id: 5,
      nombre: 'Short deportivo',
      precio: 55,
      cat: 'ropa',
      desc: 'Tela transpirable. Logo Fart Gym bordado. (Proximamente)',
      imgs: [
        'img/ropa/shorts/Sh1.png',
        'img/ropa/shorts/Sh2.png',
        'img/ropa/shorts/Sh3.png'
      ],
      features: ['🩳 Tela dry-fit transpirable', '🏋️ Diseño ergonómico', '🎨 Logo bordado FartGym', '📐 Tallas: S / M / L / XL', '💪 Para entrenamiento intenso']
    },
    {
      id: 6,
      nombre: 'Guantes de gym',
      precio: 35,
      cat: 'accesorios',
      desc: 'Cuero sintético. Protección y agarre máximo.',
      imgs: [
        'img/accesorios/guantes/GPort.png',
        'img/accesorios/guantes/G2.png',
        'img/accesorios/guantes/G3.png'
      ],
      features: ['🧤 Cuero sintético resistente', '✊ Agarre antideslizante', '🛡️ Protección palma total', '📐 Tallas: S / M / L', '💦 Fácil de limpiar']
    },
    {
      id: 7,
      nombre: 'Cinturón lumbar',
      precio: 65,
      cat: 'accesorios',
      desc: 'Soporte lumbar profesional para levantamientos.',
      imgs: [
        'img/accesorios/cinturon/CinPort.png',
        'img/accesorios/cinturon/Cin2.png',
        'img/accesorios/cinturon/Cin3.png'
      ],
      features: ['🏋️ Soporte lumbar profesional', '🔒 Cierre de velcro reforzado', '📐 Ancho 10cm — Talla única', '💪 Para levantamientos pesados', '🎨 Diseño FartGym exclusivo']
    },
    {
      id: 8,
      nombre: 'Shaker Fart Gym',
      precio: 25,
      cat: 'accesorios',
      desc: '700ml. Libre de BPA. Logo Fart Gym.',
      imgs: [
        'img/accesorios/shaker/SkPort.png',
        'img/accesorios/shaker/Sk2.png',
        'img/accesorios/shaker/Sk3.png'
      ],
      features: ['🥤 Capacidad 700ml', '✅ Libre de BPA', '🔩 Tapa rosca hermética', '🎨 Logo FartGym grabado', '🧼 Apto lavavajillas']
    }
  ];

  const GALERIA_ITEMS = [
    { categoria: 'trabajadores', titulo: 'Cristhian Pacheco', tag: 'Entrenador', src: 'img/galeria/equipos/Pri1.jpg', tipo: 'img' },
    { categoria: 'equipos', titulo: 'Zona de torso superior', tag: 'Equipos', src: 'img/galeria/area/imagen2.jpeg', tipo: 'img' },
    { categoria: 'equipos', titulo: 'Zona de torso superior', tag: 'Equipos', src: 'img/galeria/area/imagen3.jpeg', tipo: 'img' },
    { categoria: 'equipos', titulo: 'Zona de torso inferior', tag: 'Equipos', src: 'img/galeria/area/imagen6.jpeg', tipo: 'img' },
    { categoria: 'equipos', titulo: 'Zona de torso inferior', tag: 'Equipos', src: 'img/galeria/area/imagen5.jpeg', tipo: 'img' },
    { categoria: 'equipos', titulo: 'Zona de torso inferior', tag: 'Equipos', src: 'img/galeria/area/imagen8.jpeg', tipo: 'img' },
    { categoria: 'equipos', titulo: 'Zona de pesas libres', tag: 'Equipos', src: 'img/galeria/area/imagen12.jpeg', tipo: 'img', grande: true },
    { categoria: 'clases', titulo: 'Entrenamiento funcional', tag: 'Clases', src: 'img/funcional.png', tipo: 'img' },
    { categoria: 'trabajadores', titulo: 'Adriana', tag: 'Entrenadora', src: 'img/galeria/entrenadores/Adriana.jpg', tipo: 'img' },
    { categoria: 'areas', titulo: 'Sala principal', tag: 'Áreas', src: 'img/galeria/area/imagen10.jpeg', tipo: 'img' },
    { categoria: 'trabajadores', titulo: 'Rosa', tag: 'Entrenadora', src: 'img/galeria/entrenadores/Rosa.jpg', tipo: 'img' },
    { categoria: 'comunidad', titulo: 'Nuestra comunidad', tag: 'Comunidad', src: 'img/galeria/comunidad/com1.jpg', tipo: 'img' },
    { categoria: 'comunidad', titulo: 'Nuestra familia', tag: 'Comunidad', src: 'img/galeria/comunidad/comunidad2.jpg', tipo: 'img' },
    { categoria: 'equipos', titulo: 'Zona de estiramiento', tag: 'Equipos', src: 'img/Presentacion.png', tipo: 'img' },
    { categoria: 'clases', titulo: 'Clase grupal', tag: 'Clases', src: 'img/grupal.png', tipo: 'img', grande: true },
    { categoria: 'trabajadores', titulo: 'Miguel', tag: 'Entrenador', src: 'img/galeria/entrenadores/Miguel.jpg', tipo: 'img' },
    { categoria: 'areas', titulo: 'Cafetin', tag: 'Áreas', src: 'img/galeria/area/imagen14.jpeg', tipo: 'img' },
    { categoria: 'areas', titulo: 'Vestuarios', tag: 'Áreas', src: 'img/galeria/area/imagen4.jpeg', tipo: 'img' },
    { categoria: 'trabajadores', titulo: 'Staff', tag: 'Entrenador', src: 'img/galeria/entrenadores/DESCONOCIDO.jpg', tipo: 'img' },
    { categoria: 'areas', titulo: 'Tour instalaciones', tag: 'Áreas', src: 'VID/vid1.mp4', tipo: 'video', poster: 'IMG/galeria/port2.jpg' },
    { categoria: 'clases', titulo: 'Sesión funcional', tag: 'Clases', src: 'VID/vid2.mp4', tipo: 'video', poster: 'IMG/galeria/videport1.jpg' },
    { categoria: 'equipos', titulo: 'Zona de pesas', tag: 'Equipos', src: 'VID/vid3.mp4', tipo: 'video', poster: 'IMG/galeria/port3.jpg' }
  ];

  const PLANES = {
    mensual: [
      { id: 'mensual-basico', nombre: 'Membresia 1 Mes', icono: '🌿', iconoClass: 'oro', precio: 129.99, periodo: '/mes', beneficios: [{ ok: true, texto: 'Acceso total al gimnasio, tu espacio para crecer' }, { ok: true, texto: 'Ambiente limpio, cómodo y lleno de energía' }, { ok: true, texto: 'Ideal para empezar con constancia' }, { ok: true, texto: 'Horario flexible para tu rutina diaria' }] },
      { id: 'mensual-plus', nombre: 'Membresia 3 Meses', icono: '⚡', iconoClass: 'diamond', precio: 299.99, periodo: '/mes', popular: true, beneficios: [{ ok: true, texto: 'Acceso total al gimnasio sin límites de zona' }, { ok: true, texto: 'Perfecto para avanzar con más frecuencia' }, { ok: true, texto: 'Más libertad para entrenar a tu ritmo' }, { ok: true, texto: 'Vibración motivadora todos los días' }] },
      { id: 'mensual-pro', nombre: 'Membresia 6 Meses', icono: '🏋️', iconoClass: 'bros', precio: 499.99, periodo: '/mes', beneficios: [{ ok: true, texto: 'Acceso total al gimnasio con energía premium' }, { ok: true, texto: 'Ideal para quienes entrenan con propósito' }, { ok: true, texto: 'Espacio pensado para fuerza y resistencia' }, { ok: true, texto: 'Tu rutina, tu horario, tu modo' }] },
      { id: 'mensual-elite', nombre: 'Membresia 12 Meses', icono: '👑', iconoClass: 'vip', precio: 799.99, periodo: '/mes', beneficios: [{ ok: true, texto: 'Acceso total al gimnasio con experiencia exclusiva' }, { ok: true, texto: 'Ambiente premium para entrenar con calma' }, { ok: true, texto: 'Ideal para metas más ambiciosas' }, { ok: true, texto: 'Una membresía pensada para destacar' }] }
    ],
    promos: [
      { id: 'promo-inicio', nombre: 'Promo Estudiantil 1 mes', icono: '🔥', iconoClass: 'promo-icono', precio: 80.00, periodo: '/mes', beneficios: [{ ok: true, texto: 'Acceso total al gimnasio con una bienvenida especial' }, { ok: true, texto: 'Perfecta para arrancar con fuerza' }, { ok: true, texto: 'Ideal para explorar tu nueva rutina' }, { ok: true, texto: 'Energía y movimiento desde el primer día' }] },
      { id: 'promo-fuerza', nombre: 'Promo Estudiantil 3 meses', icono: '💥', iconoClass: 'promo-icono', precio: 150.00, periodo: '/mes', popular: true, beneficios: [{ ok: true, texto: 'Acceso total al gimnasio con impulso extra' }, { ok: true, texto: 'Pensada para quienes entrenan con intensidad' }, { ok: true, texto: 'Más motivación en cada sesión' }, { ok: true, texto: 'Tu mejor versión en movimiento' }] },
      { id: 'promo-energia', nombre: 'Promo Estudiantes Duo c/u', icono: '☀️', iconoClass: 'promo-icono', precio: 70.00, periodo: '/mes', beneficios: [{ ok: true, texto: 'Acceso total al gimnasio con vibes de alto rendimiento' }, { ok: true, texto: 'Ideal para mantener el ritmo diario' }, { ok: true, texto: 'Diseñada para quienes aman sentirse vivos' }, { ok: true, texto: 'Entrena con más alegría y foco' }] },
      { id: 'promo-dupla', nombre: 'Promo Ahorrador 3 Meses', icono: '🤝', iconoClass: 'promo-icono', precio: 200.00, periodo: '/mes · 2 personas', beneficios: [{ ok: true, texto: 'Acceso total al gimnasio para dos personas' }, { ok: true, texto: 'Perfecta para entrenar juntos' }, { ok: true, texto: 'Más compañía, más compromiso' }, { ok: true, texto: 'Una propuesta ideal para compartir objetivos' }] },
      { id: 'promo-ritmo', nombre: 'Promo Duo 3 Meses', icono: '🎯', iconoClass: 'promo-icono', precio: 360.00, periodo: '/mes', beneficios: [{ ok: true, texto: 'Acceso total al gimnasio con una energía especial' }, { ok: true, texto: 'Perfecta para quienes quieren empezar hoy' }, { ok: true, texto: 'Más disciplina con menos compromiso' }, { ok: true, texto: 'Una opción fresca y motivadora' }] }
    ],
    fullDay: [
      { id: 'fullDay', nombre: 'Full Day', icono: '🗓️', iconoClass: 'oro', precio: 10, periodo: '/día', beneficios: [{ ok: true, texto: 'Acceso total al gimnasio por un día completo' }, { ok: true, texto: 'Ideal para probar la energía del lugar' }, { ok: true, texto: 'Entrena a tu ritmo sin compromisos' }, { ok: true, texto: 'Una opción práctica para una experiencia única' }] }
    ]
  };

  function getCarrito() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CARRITO)) || [];
    } catch (e) { return []; }
  }

  function setCarrito(carrito) {
    localStorage.setItem(STORAGE_KEYS.CARRITO, JSON.stringify(carrito));
  }

  function agregarAlCarrito(producto) {
    const carrito = getCarrito();
    const existente = carrito.find(function (p) { return p.id === producto.id; });
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    setCarrito(carrito);
    return carrito;
  }

  function eliminarDelCarrito(id) {
    const carrito = getCarrito().filter(function (p) { return p.id !== id; });
    setCarrito(carrito);
    return carrito;
  }

  function limpiarCarrito() {
    localStorage.removeItem(STORAGE_KEYS.CARRITO);
    return [];
  }

  function getTotalCarrito() {
    return getCarrito().reduce(function (acc, p) { return acc + (p.precio * p.cantidad); }, 0);
  }

  function guardarFormDraft(data) {
    localStorage.setItem(STORAGE_KEYS.FORM_DRAFT, JSON.stringify(data));
  }

  function getFormDraft() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.FORM_DRAFT)) || {};
    } catch (e) { return {}; }
  }

  function limpiarFormDraft() {
    localStorage.removeItem(STORAGE_KEYS.FORM_DRAFT);
  }

  function guardarFiltroGaleria(filtro) {
    localStorage.setItem(STORAGE_KEYS.GALERIA_FILTER, filtro);
  }

  function getFiltroGaleria() {
    return localStorage.getItem(STORAGE_KEYS.GALERIA_FILTER) || 'todos';
  }

  function guardarPlanFavorito(plan) {
    localStorage.setItem(STORAGE_KEYS.PLAN_FAVORITO, plan);
  }

  function getPlanFavorito() {
    return localStorage.getItem(STORAGE_KEYS.PLAN_FAVORITO) || '';
  }

  function incrementarVisitas() {
    const visitas = parseInt(localStorage.getItem(STORAGE_KEYS.VISITAS) || '0') + 1;
    localStorage.setItem(STORAGE_KEYS.VISITAS, visitas);
    return visitas;
  }

  function getVisitas() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.VISITAS) || '0');
  }

  function getProductos(cat) {
    if (!cat || cat === 'todos') return PRODUCTOS;
    return PRODUCTOS.filter(function (p) { return p.cat === cat; });
  }

  function getProductoPorId(id) {
    return PRODUCTOS.find(function (p) { return p.id === id; }) || null;
  }

  function getGaleriaItems(filtro) {
    if (!filtro || filtro === 'todos') return GALERIA_ITEMS;
    return GALERIA_ITEMS.filter(function (i) { return i.categoria === filtro; });
  }

  function getPlanes(periodo) {
    return PLANES[periodo] || PLANES.mensual;
  }

  return {
    STORAGE_KEYS,
    PRODUCTOS,
    GALERIA_ITEMS,
    PLANES,
    getCarrito,
    setCarrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    limpiarCarrito,
    getTotalCarrito,
    guardarFormDraft,
    getFormDraft,
    limpiarFormDraft,
    guardarFiltroGaleria,
    getFiltroGaleria,
    guardarPlanFavorito,
    getPlanFavorito,
    incrementarVisitas,
    getVisitas,
    getProductos,
    getProductoPorId,
    getGaleriaItems,
    getPlanes
  };
})();