/* ==========================================================================
   MAGYK CLEAN — comportamento da página
   Carregado com `defer`, então o DOM já está pronto quando este script roda.
   --------------------------------------------------------------------------
   01. Menu mobile
   02. Link ativo na navegação
   03. Comparadores antes/depois
   04. Vídeo do hero (som)
   05. Animações de entrada
   ========================================================================== */

(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ======================================================================
       01. MENU MOBILE
       ====================================================================== */
    (function initNav() {
        var toggle = document.getElementById('navToggle');
        var menu = document.getElementById('navMenu');
        if (!toggle || !menu) return;

        function setOpen(open) {
            menu.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        }

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });

        // Fecha ao clicar em um link do menu
        menu.addEventListener('click', function (e) {
            if (e.target.closest('a')) setOpen(false);
        });

        // Fecha com Esc
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setOpen(false);
        });

        // Fecha ao voltar para o layout desktop
        window.matchMedia('(min-width: 901px)').addEventListener('change', function (e) {
            if (e.matches) setOpen(false);
        });
    })();


    /* ======================================================================
       02. LINK ATIVO NA NAVEGAÇÃO
       ====================================================================== */
    (function initActiveLink() {
        var links = Array.prototype.slice.call(
            document.querySelectorAll('.site-nav ul a[href^="#"]')
        );
        if (!links.length || !('IntersectionObserver' in window)) return;

        var byId = {};
        var sections = [];

        links.forEach(function (link) {
            var section = document.querySelector(link.getAttribute('href'));
            if (!section) return;
            byId[section.id] = link;
            sections.push(section);
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (l) { l.classList.remove('is-active'); });
                if (byId[entry.target.id]) byId[entry.target.id].classList.add('is-active');
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

        sections.forEach(function (s) { observer.observe(s); });
    })();


    /* ======================================================================
       03. COMPARADORES ANTES/DEPOIS
       O <input type="range"> invisível cobre todo o comparador: ele já
       entrega arraste no mouse, no toque e controle pelo teclado. Só
       repassamos o valor para a variável CSS --pos.
       ====================================================================== */
    (function initCompare() {
        var containers = document.querySelectorAll('[data-compare]');

        Array.prototype.forEach.call(containers, function (container) {
            var range = container.querySelector('.compare-range');
            if (!range) return;

            function sync() {
                container.style.setProperty('--pos', range.value + '%');
            }

            // Navegadores restauram o valor de inputs ao recarregar a página;
            // aqui queremos sempre começar na posição definida no HTML.
            range.value = range.getAttribute('value') || '50';

            range.addEventListener('input', sync);
            sync();
        });
    })();


    /* ======================================================================
       04. VÍDEO DO HERO
       Toca mudo em loop (estilo Reels). O botão libera o som.
       ====================================================================== */
    (function initVideo() {
        var video = document.getElementById('heroVideo');
        var button = document.getElementById('soundToggle');
        if (!video || !button) return;

        var icon = button.querySelector('use');

        // Alguns navegadores bloqueiam o autoplay mesmo mudo; tentamos de novo.
        var attempt = video.play();
        if (attempt && typeof attempt.catch === 'function') {
            attempt.catch(function () { /* usuário dá play manualmente */ });
        }

        button.addEventListener('click', function () {
            video.muted = !video.muted;
            var on = !video.muted;

            button.setAttribute('aria-pressed', String(on));
            button.setAttribute('aria-label', on ? 'Silenciar vídeo' : 'Ativar som do vídeo');
            if (icon) icon.setAttribute('href', on ? '#i-sound' : '#i-muted');

            if (on) video.play();
        });
    })();


    /* ======================================================================
       05. ANIMAÇÕES DE ENTRADA
       Anima uma única vez por elemento — reanimar a cada rolagem distrai.
       ====================================================================== */
    (function initReveal() {
        var items = document.querySelectorAll('.reveal');

        if (reduceMotion || !('IntersectionObserver' in window)) {
            Array.prototype.forEach.call(items, function (el) {
                el.classList.add('is-visible');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        Array.prototype.forEach.call(items, function (el) { observer.observe(el); });
    })();

})();
