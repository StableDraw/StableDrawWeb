//переводим base64 в Blob object
export function base64ToBlob(dataURI) {
	let byteString;
	if (dataURI) {
		if (dataURI.split(",")[0].indexOf("base64") >= 0) byteString = atob(dataURI.split(",")[1]);
		else byteString = unescape(dataURI.split(",")[1]);

		let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

		let ia = new Uint8Array(byteString.length);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		return new Blob([ia], { type: mimeString });
	}
}

// converting image files to base64
export const imagesToBase64 = (files) => {
	return new Promise((resolve) => {
		let baseURLs = [];
		let promises = [];
		for (let file of files) {
			let reader = new FileReader();

			promises.push(
				new Promise((innerResolve) => {
					reader.readAsDataURL(file);
					reader.onload = () => {
						const baseURL = reader.result;
						baseURLs.push(baseURL);
						innerResolve(); // Resolve inner promise when the file is read
					};
				})
			);
		}

		// Wait for all promises to resolve before resolving the main promise
		Promise.all(promises).then(() => {
			resolve(baseURLs);
		});
	});
};
