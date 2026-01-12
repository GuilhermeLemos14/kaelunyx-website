function copyPrevious(el) {
	let previousElement = el.previousElementSibling;
	navigator.clipboard.writeText(previousElement.textContent);
	alert("Copied with sucess. Check your clipboard.");
}

document.querySelectorAll(".copy-email").forEach((el) => {
	el.onclick = function () {
		copyPrevious(this);
	};
});
