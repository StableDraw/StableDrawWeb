

export const base64ToLink = (base64: string): string =>{
	// console.log('base64 in f: ', base64);
	const binaryData = atob(base64); // Приводим строку base64 к бинарному виду
	const buffer = new ArrayBuffer(binaryData.length); // создаём буфер размером со строку base64
	const uint8Array = new Uint8Array(buffer); // Uint8Array позволит читать и записывать данные в буфер

	for (let i = 0; i < binaryData.length; i++) 
		uint8Array[i] = binaryData.charCodeAt(i);

	const blob = new Blob([uint8Array], { type: 'image' }); // Создаём ссылку на основе декодированного Base64

	return URL.createObjectURL(blob);
}