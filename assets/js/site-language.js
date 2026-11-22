(() => {
    const key = 'pausatre-language';
    const supports = value => value === 'ja' || value === 'en';

    document.addEventListener('click', event => {
        const link = event.target.closest('[data-site-language]');
        if (!link || !supports(link.dataset.siteLanguage)) return;
        try { localStorage.setItem(key, link.dataset.siteLanguage); } catch {}
    });

    // Match language only at the site entry or an explicitly automatic menu link.
    const homeEntry = document.currentScript.hasAttribute('data-home-entry') && location.pathname.endsWith('/');
    const menuEntry = location.pathname.endsWith('/menu.html') && new URLSearchParams(location.search).get('lang') === 'auto';
    if (!homeEntry && !menuEntry) return;
    let preferred;
    try { preferred = localStorage.getItem(key); } catch {}
    if (!supports(preferred)) {
        const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
        preferred = languages.find(supportsLanguage)?.slice(0, 2).toLowerCase() || 'en';
    }
    if (preferred === 'en') {
        const destination = new URL(menuEntry ? 'menu-en.html' : 'en.html', location.href);
        destination.search = location.search;
        if (menuEntry) destination.searchParams.delete('lang');
        destination.hash = location.hash;
        location.replace(destination.href);
    }

    function supportsLanguage(language) {
        return supports(language?.split('-')[0].toLowerCase());
    }
})();
