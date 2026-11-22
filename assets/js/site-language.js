(() => {
    const key = 'pausatre-language';
    const supports = value => value === 'ja' || value === 'en';

    document.addEventListener('click', event => {
        const link = event.target.closest('[data-site-language]');
        if (!link || !supports(link.dataset.siteLanguage)) return;
        try { localStorage.setItem(key, link.dataset.siteLanguage); } catch {}
    });

    // Only the homepage entry URL negotiates language. Explicit page URLs stay stable.
    if (!document.currentScript.hasAttribute('data-home-entry') || !location.pathname.endsWith('/')) return;
    let preferred;
    try { preferred = localStorage.getItem(key); } catch {}
    if (!supports(preferred)) {
        const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
        preferred = languages.find(supportsLanguage)?.slice(0, 2).toLowerCase() || 'en';
    }
    if (preferred === 'en') {
        const destination = new URL('en.html', location.href);
        destination.search = location.search;
        destination.hash = location.hash;
        location.replace(destination.href);
    }

    function supportsLanguage(language) {
        return supports(language?.split('-')[0].toLowerCase());
    }
})();
