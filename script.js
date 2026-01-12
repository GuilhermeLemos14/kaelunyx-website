function copyPrevious(el) {
	let previousElement = el.previousElementSibling;
	navigator.clipboard.writeText(previousElement.textContent);
	alert("Copied. Copiado.");
}

document.querySelectorAll(".copy-email").forEach((el) => {
	el.onclick = function () {
		copyPrevious(this);
	};
});
