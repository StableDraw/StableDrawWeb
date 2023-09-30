

export const base64ToLinkImg = (base64: string): string =>{
	// console.log('base64 in f: ', base64);
	const binaryData = atob(base64); // Приводим строку base64 к бинарному виду
	const buffer = new ArrayBuffer(binaryData.length); // создаём буфер размером со строку base64
	const uint8Array = new Uint8Array(buffer); // Uint8Array позволит читать и записывать данные в буфер

	for (let i = 0; i < binaryData.length; i++) 
		uint8Array[i] = binaryData.charCodeAt(i);

	const blob = new Blob([uint8Array], { type: 'image' }); // Создаём ссылку на основе декодированного Base64

	return URL.createObjectURL(blob);
}

//на будущее для загрузки мод
export const base64ToLingGlb = (base64: string): string =>{
	const binaryData = atob(base64); // Приводим строку base64 к бинарному виду
	const buffer = new ArrayBuffer(binaryData.length); // создаём буфер размером со строку base64
	const uint8Array = new Uint8Array(buffer); // Uint8Array позволит читать и записывать данные в буфер

	for (let i = 0; i < binaryData.length; i++) 
		uint8Array[i] = binaryData.charCodeAt(i);

		const blob = new Blob([uint8Array], { type: 'model/gltf-binary' }); // Создаём ссылку на основе декодированного Base64

	return URL.createObjectURL(blob);
}

export const fileToBase64 = (filePath, callback) => {
	const xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';

	xhr.onload = function () {
    if (xhr.status === 200) {
      const reader = new FileReader();
      reader.onload = function () {
        // Вызываем callback с данными base64 после успешной конвертации.
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    } else {
      console.error('Не удалось загрузить файл:', xhr.status, xhr.statusText);
      // Вызываем callback с null в случае ошибки.
      callback(null);
    }
  };
	xhr.open('GET', filePath);
  xhr.send();
}
