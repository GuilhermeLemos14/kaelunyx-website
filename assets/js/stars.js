document.addEventListener("DOMContentLoaded", () => {
	const params = new URLSearchParams(location.search);
	const starsEnabled = params.get("stars") !== "off";

	if (!starsEnabled) {
		document.querySelectorAll(".page-link").forEach((element) => {
			const url = new URL(element.href);
			url.searchParams.set("stars", "off");
			element.href = url.toString();
		});
		document.querySelectorAll(".stars").forEach((star) => {
			star.remove();
		});
	}

	const toggleButton = document.getElementById("toggle-stars-button");
	if (toggleButton) {
		toggleButton.addEventListener("click", () => {
			const currentUrl = new URL(window.location.href);
			if (currentUrl.searchParams.get("stars") === "off") {
				currentUrl.searchParams.delete("stars");
			} else {
				currentUrl.searchParams.set("stars", "off");
			}
			window.location.href = currentUrl.toString();
		});
	}
});
