document.addEventListener("DOMContentLoaded", async () => {
	const API_BASE = RequestManager.apiBase;
	const productList = document.getElementById("productList");
	const providerSelect = document.getElementById("provider");
	const filterForm = document.getElementById("filterForm");
	const clearFilter = document.getElementById("clearFilter");

	let pageData = {}
	let priceOrderSelector, filtersManager
	 //функція застосування фільтрів
	 function getFiltersQueryString() {
		const queryOptions = [
		  `page=${pageData.currentPage ?? 0}`,
		  `perPage=${pageData.perPage ?? 4}`,
		]
		const filtersQueryString = filtersManager.getQueryString()
		if (filtersQueryString) queryOptions.push(filtersQueryString)

		queryOptions.push(`sort=price:${priceOrderSelector.currentOrder}`)
		return queryOptions.join('&')
	 }

	//load providers for filters
	function loadProviders(providers) {
		providerSelect.innerHTML = "";
		const option = document.createElement("option");
		option.value = "";
		option.textContent = "Distributor";
		providerSelect.append(option);
		providers.forEach((provider) => {
			const option = document.createElement("option");
			option.value = provider._id;
			option.textContent = provider.title;
			providerSelect.append(option);
		});
	}

	// Завантажити продукти
	async function loadProducts(page = 0) {
		try {
			if(Number.isFinite(page)) pageData.currentPage = page
			const resData = await ProductsApiManager.getListWithQuery(getFiltersQueryString())
			let products = resData.data?.documents
			console.log('resData====>', resData)
			
			pageData = {
				...pageData,
				totalItemsNumber: resData.data?.count,
			 }
			 //тут буде прилітати щось інше
			// const response = await RequestManager.fetchData(`/products`)
			// console.log(response);
			// loadProviders(response.providers)
			const isAdmin = response.isAdmin || false
			//перевірка на expired token
			if (typeof isAdmin === "string") {
				if (confirm(isAdmin)) {
					window.location.href = "../../auth/login.html"
					localStorage.removeItem("jwt_token")
				} else {
					localStorage.removeItem("jwt_token")
				}
			}
			// Очищення попередніх продуктів
			productList.innerHTML = "";

			if (response.length === 0) {
				productList.innerHTML = "<p>No products found</p>";
				return;
			}

			//{products, providers}
			response.products.forEach((product) => {
				const productContainer = document.createElement("div");
				productContainer.className = "product__container";

				const distributor = product.provider?.title || "Unknown";
				productContainer.innerHTML = `
			  <div class="product__info">
				 <a class="product__link" href="./product-details.html?id=${product._id}">
					<img src="${RequestManager.apiUrl}/uploads/${product.imgSrc}" alt="Flowers Img">
				 </a>
				 <p class="product__price">${product.price} $</p>
				 <a class="product__link" href="./product-details.html?id=${product._id}">${
					product.title
				}</a>
				 <p class="product__text"><span>Distributor:</span> ${distributor}</p>
			  </div>
			  ${
					isLoggedIn() && isAdmin
						? `<div class="product__actions actions">
						 <a href="product-form.html?id=${product._id}" class="product__btn">Edit</a>
						 <button onclick="deleteProduct('${product._id}')" class="product__btn">Delete</button>
					  </div>`
						: ""
				}
			`;
				productList.append(productContainer);
			});
		} catch (error) {
			console.error("Error loading products:", error);
		}
	}

	// Перевірка автентифікації
	function isLoggedIn() {
		return !!localStorage.getItem("jwt_token");
	}

	// Видалення продукту
	window.deleteProduct = async function (productId) {
		if(confirm('Are you sure you want to delete product?')){
			try {
				RequestManager.deleteRequest(`${API_BASE}/products/`, productId)
				loadProducts() // Оновлення списку продуктів
			} catch (error) {
				console.error("Error deleting product:", error)
			}
		}
	}

	// Фільтрація продуктів
	filterForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const filters = Object.fromEntries(new FormData(filterForm));
		loadProducts(filters);
	});

	// Очищення фільтрів
	clearFilter.addEventListener("click", () => {
		filterForm.reset();
		loadProducts(0);
	});

	 // Додавання селектора сортування
	 priceOrderSelector = new PriceOrderSelector(
		'.price-order-container',
		() => loadProducts(0)
	 )

	 //----------------------
	 // Отримання даних продуктів з сервера
	 const resFiltersData = await ProductsApiManager.getFiltersData()
	 console.log('resFiltersData ====>',resFiltersData)
	 
	 if (resFiltersData?.data) {
		const filtersConfig = [
		  {
			 name: 'title',
			 title: 'Name',
			 type: 'search',
		  },
		  {
			 name: 'price',
			 title: 'price',
			 type: 'range',
			 options: { min: 0, max: 1000 },
		  },
		  // {
		  //   title: 'Тип продавця',
		  //   name: 'type',
		  //   type: 'dropdown',
		  //   options: resFiltersData.data.types.map((item) => ({
		  //     title: item.title,
		  //     value: item._id,
		  //   })),
		  // },
		  {
			 title: 'Distributor',
			 name: 'seller',
			 type: 'selectMany',
			 options: resFiltersData.data.users.map((item) => ({
				title: item.title,
				value: item._id,
			 })),
		  },
		]

		filtersManager = new FiltersManager(
			filtersConfig,
			'.filters-container',
			async () => {
			  await loadProducts(0)
			  //------------- додавання пагінації -----
			 setupPagination()
			}
		 )
	 }

	// --------add Pagination --------
	function setupPagination() {
		new PaginationManager({
			totalItemsNumber: pageData.totalItemsNumber,
			itemsPerPage: 4,
			currentPage: pageData.currentPage ?? 0,
			containerSelector: '#pagination',
			onClick: async (page) => {
			  await loadProducts(page)
			},
		 })
	}

		// Початкове завантаження
		loadProducts(0)
})

