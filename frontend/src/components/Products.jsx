import React, { useEffect, useState } from "react";
import { getProduct } from "../api/product";
import Card from "./Card";
import { FilterMenu } from "./Filters";
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
		<div className=" flex flex-wrap flex-col items-center justify-center">
			<div className="h-auto w-full border-2">
				<FilterMenu />
			</div>
			<div className="flex flex-row justify-center flex-wrap">
				{product &&
					product.length > 0 &&
					product.map((p) => <Card product={p} />)}
			</div>
		</div>
	);
}

export default Products;
