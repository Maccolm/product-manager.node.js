async function deleteProduct(id) {
	console.log('=============deleteProduct')
	console.log(id);

	try {
		const response = await fetch('/products/', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id }),
		})

		if(response.ok) {
			console.log('Product deleted successfully')
			window.location.href = '/products'
		} else {
			console.error('Failed to delete product')
		}
	} catch (error) {
		console.error('Error', error)
	}
}