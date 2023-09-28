import React, { useEffect, useState } from "react";
import { getProduct } from "../api/product";
import Card from "./Card";
function Products() {
	const [product, setProduct] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await getProduct();
			setProduct(response);
		};
		fetchData();
		console.log(product);
	}, []);
	return (
		<>
			{product &&
				product.length > 0 &&
				product.map(({ name, price, image }) => (
					<Card name={name} price={price} image={image.url} />
				))}
		</>
	);
}

export default Products;
