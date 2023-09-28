import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card";
import { filterByPrice, getFilteredProduct } from "../api/product";
import Products from "./Products";
export function FilterMenu() {
	const [menu1Open, setMenu1Open] = useState(false);
	const [menu2Open, setMenu2Open] = useState(false);

	const toggleMenu1 = () => {
		setMenu1Open(!menu1Open);
		if (menu2Open) {
			setMenu2Open(false);
		}
	};

	const toggleMenu2 = () => {
		setMenu2Open(!menu2Open);
		if (menu1Open) {
			setMenu1Open(false);
		}
	};
	return (
		<div className="flex justify-center items-center">
			<div className="relative group">
				<button onClick={toggleMenu1} className="text-black">
					Filter By Category
				</button>
				{menu1Open && (
					<div className="absolute top-full left-0 mt-2 py-2 bg-white w-50 rounded-lg shadow-lg">
						<a
							href="/category-filter?category=clothes"
							className="block px-4 py-2 hover:bg-gray-100"
						>
							clothes
						</a>
						<a
							href="/category-filter?category=accessories"
							className="block px-4 py-2 hover:bg-gray-100"
						>
							Accessories
						</a>
					</div>
				)}
			</div>
			<p className="ml-2 text-gray-400">|</p>
			<div className="relative group">
				<button onClick={toggleMenu2} className="text-black pl-2">
					Filter By Price
				</button>
				{menu2Open && (
					<div className="absolute top-full left-0 mt-2 py-2 bg-white w-50 rounded-lg shadow-lg">
						<a
							href="/price-filter?minPrice=0&maxPrice=50"
							className="block px-4 py-2 hover:bg-gray-100"
						>
							0-50
						</a>
						<a
							href="/price-filter?minPrice=50&maxPrice=100"
							className="block px-4 py-2 hover:bg-gray-100"
						>
							50-100
						</a>
						<a
							href="/price-filter?minPrice=100&maxPrice=150"
							className="block px-4 py-2 hover:bg-gray-100"
						>
							100-150
						</a>
					</div>
				)}
			</div>
		</div>
	);
}
export function FilterByCategory() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const category = queryParams.get("category");
	const [product, setProduct] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await getFilteredProduct(category);
			setProduct(response);
		};
		fetchData();
		console.log(product);
	}, []);
	if (product.length === 0) {
		return <div className="flex justify-center">Product Not Found</div>;
	}
	return (
		<>
			{product &&
				product.length > 0 &&
				product.map((p) => <Card product={p} />)}
		</>
	);
}

export function FilterByPrice() {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const minPrice = queryParams.get("minPrice");
	const maxPrice = queryParams.get("maxPrice");
	const [product, setProduct] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await filterByPrice(minPrice, maxPrice);
			setProduct(response);
		};
		fetchData();
		console.log(product);
	}, []);
	if (product.length === 0) {
		return <div className="flex justify-center">Product Not Found</div>;
	}
	return (
		<>
			{product &&
				product.length > 0 &&
				product.map((p) => <Card product={p} />)}
		</>
	);
}
