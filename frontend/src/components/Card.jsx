import React from "react";
import { BsCurrencyRupee } from "react-icons/bs";
import { useCart } from "../context/cart";
function Card(product) {
	const [cart, setCart] = useCart();
	const { name, image, price } = product.product;
	return (
		<div className="border-2 m-2 h-[16rem] w-[10rem] sm:h-[21rem] sm:w-[15rem] rounded-md">
			<img
				className="hover:scale-105 transition-all rounded-t-md ease-in-out duration-200 "
				alt=""
				src={image.url}
			></img>
			<div className=" p-2 flex justify-between items-center">
				{" "}
				<p>{name}</p>
				<p className="flex justify-center items-center text-sm">
					<BsCurrencyRupee />
					{price}
				</p>
			</div>
			<div className=" p-2 flex justify-between items-center">
				{" "}
				<button
					onClick={() => {
						localStorage.setItem(
							"cart",
							JSON.stringify([...cart, product.product])
						);
						setCart([...cart, product.product]);
					}}
					className="border-1 p-1 text-sm text-white bg-green-500 hover:bg-green-600 transition-all ease-in-out border-green-500 rounded-sm"
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
}

export default Card;
