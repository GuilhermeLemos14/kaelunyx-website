// Idiomas suportados
const SUPPORTED_LANGS = ["en", "pt", "es", "fr"];

// Idioma padrão
const DEFAULT_LANG = "pt";

// Detecta idioma pelo subdomínio
function getLangFromSubdomain() {
	const sub = window.location.hostname.split(".")[0];
	return SUPPORTED_LANGS.includes(sub) ? sub : null;
}

// Detecta idioma pela query (?lang=xx)
function getLangFromQuery() {
	const params = new URLSearchParams(window.location.search);
	const lang = params.get("lang");
	return SUPPORTED_LANGS.includes(lang) ? lang : null;
}

// Decide o idioma final
function detectLanguage() {
	return getLangFromQuery() || getLangFromSubdomain() || DEFAULT_LANG;
}

// Remove apenas o parâmetro "lang" e mantém o resto
function cleanURL() {
	const url = window.location.pathname; // ex: /about.html
	const params = new URLSearchParams(window.location.search);

	// Remove apenas o "lang"
	params.delete("lang");

	const queryString = params.toString(); // ex: "stars=off"
	const sub = getLangFromSubdomain();

	// Monta a URL final
	let finalURL = "";

	if (sub) {
		finalURL = `https://${sub}.kaelunyx.space${url}`;
	} else {
		finalURL = `https://kaelunyx.space${url}`;
	}

	// Se ainda houver parâmetros, adiciona
	if (queryString) {
		finalURL += `?${queryString}`;
	}

	history.replaceState({}, "", finalURL);
}

// Lê valores aninhados tipo "about.title"
function getNestedValue(obj, path) {
	return path.split(".").reduce((o, k) => (o || {})[k], obj);
}

// Aplica traduções no HTML
function applyTranslations(data) {
	document.querySelectorAll("[data-i18n]").forEach((el) => {
		const key = el.getAttribute("data-i18n");
		const value = getNestedValue(data, key);
		if (value) el.innerHTML = value;
	});
}

// Carrega o JSON do idioma
async function loadLanguage(lang) {
	try {
		const response = await fetch(`/lang/${lang}.json`);
		const data = await response.json();
		applyTranslations(data);
	} catch (err) {
		console.error("Erro ao carregar idioma:", err);
	}
}

// Inicialização
(async function initI18n() {
	const lang = detectLanguage();

	// Ajusta <html lang="xx">
	document.documentElement.setAttribute("lang", lang);

	await loadLanguage(lang);
	cleanURL();
})();
