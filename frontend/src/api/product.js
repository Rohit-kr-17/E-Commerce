import client from "./client";

export const getProduct = async () => {
	try {
		const { data } = await client.get(`/product/get-product`);
		return data.products;
	} catch (err) {
		console.log(err);
	}
};
export const getFilteredProduct = async (category) => {
	try {
		const { data } = await client.get(
			`/product/filter-by-category?category=${category}`
		);
		console.log(data);
		return data.product;
	} catch (err) {
		console.log(err);
	}
};
export const filterByPrice = async (minPrice, maxPrice) => {
	try {
		console.log(minPrice, maxPrice);
		const { data } = await client.get(
			`/product/filter-by-price?minPrice=${minPrice}&maxPrice=${maxPrice}`
		);
		console.log(data.filteredProducts);
		return data.filteredProducts;
	} catch (err) {
		console.log(err);
	}
};
