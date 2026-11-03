(function () {
	var fab = document.getElementById('wa-fab');
	var panel = document.getElementById('wa-panel');
	if (fab && panel) {
		var setOpen = function (open) {
			panel.hidden = !open;
			fab.setAttribute('aria-expanded', String(open));
		};
		fab.addEventListener('click', function () { setOpen(panel.hidden); });
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && !panel.hidden) { setOpen(false); fab.focus(); }
		});
		document.addEventListener('click', function (e) {
			if (!panel.hidden && !panel.contains(e.target) && !fab.contains(e.target)) setOpen(false);
		});
	}

	var form = document.getElementById('contact-form');
	if (form) {
		form.addEventListener('submit', function (e) {
			e.preventDefault();
			var d = new FormData(form);
			var texto = 'Hola, soy ' + d.get('nombre').trim() + ' (' + d.get('email').trim() + ').\n\n' + d.get('mensaje').trim();
			window.open('https://wa.me/' + d.get('destino') + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
		});
	}
	var convenios = document.getElementById('convenios');
	var card = document.getElementById('convenios-card');
	if (convenios) {
		var label = card && card.querySelector('.toggle-label');
		var arrow = card && card.querySelector('.toggle-arrow');
		var mostrar = function (abrir, scroll) {
			convenios.classList.toggle('is-open', abrir);
			convenios.inert = !abrir;
			if (card) {
				card.setAttribute('aria-expanded', String(abrir));
				label.textContent = abrir ? 'Ocultar convenios y proyectos' : 'Ver convenios y proyectos';
				arrow.textContent = abrir ? '↑' : '↓';
			}
			if (abrir && scroll) convenios.scrollIntoView({ behavior: 'smooth', block: 'start' });
		};
		mostrar(location.hash === '#convenios', false);
		if (card) {
			card.addEventListener('click', function () { mostrar(!convenios.classList.contains('is-open'), true); });
			card.addEventListener('keydown', function (e) {
				if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mostrar(!convenios.classList.contains('is-open'), true); }
			});
		}
		var cerrar = document.getElementById('convenios-close');
		if (cerrar) cerrar.addEventListener('click', function () {
			mostrar(false, false);
			if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); card.focus({ preventScroll: true }); }
		});
		document.querySelectorAll('.main-nav a[href="#convenios"]').forEach(function (a) {
			a.addEventListener('click', function (e) { e.preventDefault(); mostrar(true, true); });
		});
	}
})();
