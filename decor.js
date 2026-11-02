/* decor.js - injects flowers, butterflies and sparkles. Does not touch existing content. */
(function () {
    var pinks = ['#f4aabb', '#f7cbd6', '#e58ca3', '#fbd5dd', '#f2b6c9'];

    function flower(color, center) {
        var petals = '';
        for (var i = 0; i < 5; i++) {
            petals += '<ellipse cx="50" cy="27" rx="14" ry="22" transform="rotate(' + (i * 72) + ' 50 50)"/>';
        }
        return '<svg viewBox="0 0 100 100" aria-hidden="true">' +
            '<g fill="' + color + '" stroke="#e58ca3" stroke-width="1.5" stroke-opacity=".5">' + petals + '</g>' +
            '<circle cx="50" cy="50" r="10" fill="' + (center || '#ffd9a0') + '" stroke="#e0a45f" stroke-opacity=".5"/>' +
            '</svg>';
    }

    function butterfly(c1, c2) {
        var wing = '<path d="M50 40 C30 0 0 5 8 32 C12 48 35 48 50 40Z" fill="' + c1 + '"/>' +
                   '<path d="M50 42 C35 48 15 55 22 72 C30 80 48 60 50 42Z" fill="' + c2 + '"/>' +
                   '<circle cx="24" cy="28" r="5" fill="#fff" fill-opacity=".55"/>';
        return '<svg viewBox="0 0 100 80" aria-hidden="true">' +
            '<g class="wings">' + wing +
            '<g transform="translate(100 0) scale(-1 1)">' + wing + '</g></g>' +
            '<ellipse cx="50" cy="42" rx="3" ry="16" fill="#7d243b"/>' +
            '<path d="M49 27 C45 16 40 14 38 12 M51 27 C55 16 60 14 62 12" stroke="#7d243b" stroke-width="1.5" fill="none" stroke-linecap="round"/>' +
            '</svg>';
    }

    function pick(i) { return pinks[i % pinks.length]; }

    function el(html, cls) {
        var d = document.createElement('div');
        d.className = cls;
        d.innerHTML = html;
        return d;
    }

    function init() {
        /* butterflies */
        var layer = document.createElement('div');
        layer.className = 'butterfly-layer';
        layer.setAttribute('aria-hidden', 'true');
        var sets = [['#f4aabb', '#f7cbd6'], ['#d7b7d3', '#f7d8e0'], ['#f6aebe', '#fff0c9'], ['#e58ca3', '#fbd5dd']];
        sets.forEach(function (s, i) {
            layer.appendChild(el(butterfly(s[0], s[1]), 'butterfly b' + (i + 1)));
        });
        document.body.appendChild(layer);

        /* flower corners + divider + sparkles on each section page */
        var pages = document.querySelectorAll('.section-page, #Birthday, #memorable-message');
        pages.forEach(function (p, i) {
            ['tl', 'br', 'tr', 'bl'].forEach(function (pos, j) {
                p.appendChild(el(flower(pick(i + j), j % 2 ? '#fff0c9' : '#ffd9a0'), 'corner-flower ' + pos));
            });
            for (var k = 0; k < 4; k++) {
                var s = document.createElement('span');
                s.className = 'sparkle';
                s.textContent = k % 2 ? '✦' : '✧';
                s.style.left = (8 + Math.random() * 84) + '%';
                s.style.top = (5 + Math.random() * 88) + '%';
                s.style.fontSize = (10 + Math.random() * 12) + 'px';
                s.style.animationDelay = (-Math.random() * 3) + 's';
                p.appendChild(s);
            }
            var h = p.querySelector('.section-heading h2, .birthday-letter h1, .message-card h2');
            if (h && h.parentNode) {
                var div = el(flower('#f4aabb') + flower('#e58ca3', '#fff0c9') + flower('#f4aabb'), 'flower-divider');
                h.parentNode.insertBefore(div, h.nextSibling);
            }
        });

        /* home page flowers */
        var hero = document.querySelector('#home');
        if (hero) {
            hero.appendChild(el(flower('#f4aabb') , 'hero-flowers left'));
            hero.appendChild(el(flower('#fbd5dd', '#fff0c9'), 'hero-flowers right'));
            hero.appendChild(el(flower('#e58ca3'), 'hero-flowers mid'));
        }

        /* final page sparkles/flowers */
        var fin = document.querySelector('#final');
        if (fin) {
            fin.appendChild(el(flower('#fbe3e8', '#fff0c9'), 'corner-flower tl'));
            fin.appendChild(el(flower('#fbe3e8', '#fff0c9'), 'corner-flower br'));
        }

        /* footer flower row */
        var footer = document.querySelector('footer');
        if (footer && footer.parentNode) {
            var row = el(pinks.concat(pinks).map(function (c) { return flower(c); }).join(''), 'footer-flowers');
            footer.parentNode.insertBefore(row, footer);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

/* ===================== MORE DECOR ===================== */
(function () {
    function el(html, cls) { var d = document.createElement('div'); d.className = cls; d.innerHTML = html; return d; }

    function tulip(c) {
        return '<svg viewBox="0 0 60 120" aria-hidden="true">' +
            '<path d="M30 55 C30 85 28 105 30 120" stroke="#8fb996" stroke-width="3" fill="none" stroke-linecap="round"/>' +
            '<path d="M30 100 C14 96 8 82 10 74 C22 78 28 90 30 100Z" fill="#a8cfae"/>' +
            '<path d="M30 92 C46 88 52 76 50 68 C38 72 32 82 30 92Z" fill="#8fb996"/>' +
            '<path d="M14 24 C12 44 20 58 30 58 C40 58 48 44 46 24 C40 32 36 22 30 14 C24 22 20 32 14 24Z" fill="' + c + '" stroke="#e58ca3" stroke-opacity=".5"/>' +
            '</svg>';
    }

    function miniFlower(c) {
        var p = '';
        for (var i = 0; i < 5; i++) p += '<ellipse cx="50" cy="27" rx="14" ry="22" transform="rotate(' + (i * 72) + ' 50 50)"/>';
        return '<svg viewBox="0 0 100 100"><g fill="' + c + '" stroke="#e58ca3" stroke-opacity=".5">' + p + '</g><circle cx="50" cy="50" r="10" fill="#ffd9a0"/></svg>';
    }

    function bee() {
        return '<svg viewBox="0 0 60 50" aria-hidden="true">' +
            '<g class="bw"><ellipse cx="22" cy="14" rx="11" ry="7" fill="#fff" fill-opacity=".8" stroke="#cfe3f5"/>' +
            '<ellipse cx="38" cy="14" rx="11" ry="7" fill="#fff" fill-opacity=".8" stroke="#cfe3f5"/></g>' +
            '<ellipse cx="30" cy="30" rx="17" ry="12" fill="#ffd36b"/>' +
            '<path d="M24 19 V41 M32 18 V42 M40 21 V39" stroke="#5b3a3a" stroke-width="4"/>' +
            '<circle cx="46" cy="28" r="2" fill="#5b3a3a"/></svg>';
    }

    function init() {
        /* floating hearts */
        var hl = document.createElement('div');
        hl.className = 'heart-layer'; hl.setAttribute('aria-hidden', 'true');
        for (var i = 0; i < 9; i++) {
            var h = document.createElement('span');
            h.className = 'float-heart';
            h.textContent = i % 3 ? '♡' : '♥';
            h.style.left = (Math.random() * 96) + '%';
            h.style.fontSize = (12 + Math.random() * 16) + 'px';
            h.style.animationDuration = (14 + Math.random() * 14) + 's';
            h.style.animationDelay = (-Math.random() * 20) + 's';
            hl.appendChild(h);
        }
        document.body.appendChild(hl);

        /* bee */
        document.body.appendChild(el(bee(), 'bee'));

        /* tulip garden on home */
        var home = document.querySelector('#home');
        if (home) {
            var cols = ['#f4aabb', '#e58ca3', '#fbd5dd', '#f2b6c9', '#f7cbd6', '#e58ca3', '#f4aabb', '#fbd5dd', '#f2b6c9'];
            home.appendChild(el(cols.map(tulip).join(''), 'tulip-garden'));
        }

        /* washi tape + flower stickers */
        document.querySelectorAll('.polaroid, .letter-paper, .court-paper, .birthday-letter, .message-card').forEach(function (n, i) {
            n.appendChild(el('', 'washi'));
            if (n.classList.contains('polaroid') || i % 2 === 0) {
                n.appendChild(el(miniFlower(['#f4aabb', '#e58ca3', '#fbd5dd'][i % 3]), 'sticker-flower'));
            }
        });

        /* tap / click sparkle burst */
        function burst(x, y) {
            var syms = ['♡', '✿', '✦', '❀', '♥'];
            for (var k = 0; k < 6; k++) {
                var s = document.createElement('span');
                s.className = 'tap-pop';
                s.textContent = syms[Math.floor(Math.random() * syms.length)];
                s.style.left = x + 'px'; s.style.top = y + 'px';
                s.style.color = ['#e58ca3', '#f4aabb', '#9c344d'][k % 3];
                var a = Math.random() * Math.PI * 2, d = 25 + Math.random() * 40;
                s.style.setProperty('--dx', Math.cos(a) * d + 'px');
                s.style.setProperty('--dy', Math.sin(a) * d - 20 + 'px');
                document.body.appendChild(s);
                setTimeout(function (n) { return function () { n.remove(); }; }(s), 950);
            }
        }
        document.addEventListener('click', function (e) { burst(e.clientX, e.clientY); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
