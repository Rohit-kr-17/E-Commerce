import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import { Badge } from "antd";
function Header() {
	const [cart] = useCart();

	return (
		<>
			<div className="w-screen text-lg text-white p-2 pl-4 pr-8 flex flex-row justify-between items-center transition-all ease-in-out bg-blue-500">
				<div>
					<Link to="/">Home</Link>
				</div>

				<div>
					<Badge size="small" count={cart?.length}>
						<Link to="/cart">
							<AiOutlineShoppingCart className="text-[1.5rem] text-white" />
						</Link>
					</Badge>
				</div>
			</div>
		</>
	);
}

export default Header;

{
	/* <div>
				<Link to="/">Home</Link>
			</div>
			<div>
				<BsCart4 />
			</div>
			<div className="text-black">
				<Link to="/category-filter?category=clothes">Category</Link>
			</div>
			<div className="text-black">
				<Link to="/price-filter?minPrice=0&maxPrice=500">price</Link>
			</div> */
}
