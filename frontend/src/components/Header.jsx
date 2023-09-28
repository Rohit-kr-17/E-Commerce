import React from "react";
import { BsCart4 } from "react-icons/bs";
function Header() {
	return (
		<div className="w-screen p-2 flex justify-between items-center bg-slate-300">
			<div>Home</div>
			<div>
				<BsCart4 />
			</div>
		</div>
	);
}

export default Header;
