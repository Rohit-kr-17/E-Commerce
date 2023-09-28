import React from "react";
import { BsCurrencyRupee } from "react-icons/bs";
function Card({ image, name, price }) {
	console.log(name, price);
	return (
		<div className="border-2  h-[16rem] w-[10rem] sm:h-[21rem] sm:w-[15rem] rounded-md">
			<img
				className="hover:scale-105 transition-all ease-in-out duration-200 "
				alt=""
				src={image}
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
				<p>Rating</p>
				<button className="border-1 p-1 text-sm text-white bg-green-500 border-green-500 rounded-sm">
					Add to Cart
				</button>
			</div>
		</div>
	);
}

export default Card;
