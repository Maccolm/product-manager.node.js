class RequestManager {
	static async postRequest(route, body) {
	  const response = await fetch(route, {
		 method: 'POST',
		 headers: {
			'Content-Type': 'application/json',
		 },
		 body: JSON.stringify(body),
	  })
	  const data = await response.json()
	  return data
	}
 
	static async deleteRequest(route, body) {
	  console.log('route')
	  console.log(route)
 
	  console.log('====>> body')
	  console.log(body)
 
	  const response = await fetch(route, {
		 method: 'DELETE',
		 headers: {
			'Content-Type': 'application/json',
		 },
		 body: JSON.stringify(body),
	  })
	  const data = await response.json()
	  // Оновлення поточного вікна без використання кешу
	  window.location.reload(true)
	  return data
	}
 
	static handleFileSelect(event, imgSelector) {
	  console.log('imgSelector')
	  console.log(imgSelector)
 
	  const file = event.target.files[0]
	  if (file && file.type.startsWith('image/')) {
		 const reader = new FileReader()
		 reader.onload = function (e) {
			const imgElement = document.querySelector(imgSelector)
			imgElement.src = e.target.result
		 }
		 reader.readAsDataURL(file)
	  }
	}
 }
 function onInputFile(event) {
	RequestManager.handleFileSelect(event, '#imgPreview')
	console.log('picture uploaded');
 }