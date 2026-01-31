document.addEventListener("DOMContentLoaded", () => {
	function copyPrevious(el) {
		let previousElement = el.previousElementSibling;
		if (previousElement && previousElement.textContent) {
			navigator.clipboard
				.writeText(previousElement.textContent)
				.catch(() => {
					alert("Copied. Copiado.");
				});
		}
	}

	document.querySelectorAll(".copy-email").forEach((el) => {
		el.onclick = function () {
			copyPrevious(this);
		};
	});
});
