(async () => {
	while (!Spicetify?.showNotification) {
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	console.log("Initializing DevMikan Utilities");
})();
