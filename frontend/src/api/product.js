import client from "./client";

export const getProduct = async () => {
	console.log("hellp");
	try {
		const { data } = await client.get(`/product/get-product`);
		return data.products;
	} catch (err) {
		console.log(err);
	}
};
