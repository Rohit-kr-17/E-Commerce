import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { BsCurrencyRupee } from "react-icons/bs";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CartPage() {
	const navigate = useNavigate();
	const [clientToken, setClientToken] = useState("");
	const [instance, setInstance] = useState("");
	const [loading, setLoading] = useState(false);
	const [cart, setCart] = useCart();
	const totalPrice = () => {
		try {
			let total = 0;
			cart?.map(({ price }) => {
				total = total + price;
			});
			return total;
		} catch (err) {
			console.log(err);
		}
	};
	const removeCartItem = (pid) => {
		try {
			let myCart = [...cart];
			let index = myCart.findIndex((item) => item._id === pid);
			myCart.splice(index, 1);
			setCart(myCart);
			localStorage.setItem("cart", JSON.stringify(myCart));
		} catch (err) {
			console.log(err);
		}
	};

	const getToken = async () => {
		try {
			const { data } = await axios.get(
				"http://localhost:8000/api/product/braintree/token"
			);
			setClientToken(data?.clientToken);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getToken();
	});
	const handlePayment = async () => {
		try {
			setLoading(true);
			const { nonce } = await instance.requestPaymentMethod();
			const { data } = await axios.post(
				"http://localhost:8000/api/product/braintree/payment",
				{
					nonce,
					cart,
				}
			);
			setLoading(false);
			localStorage.removeItem("cart");
			setCart([]);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex flex-col md:flex-row justify-content items-center">
			<div className="w-screen flex flex-col items-center justify-center">
				<div>
					{" "}
					<p>Cart Items</p>
				</div>

				<div className="mt-2 flex items-center justify-center flex-wrap ">
					{cart?.map(({ name, image, price, _id }) => (
						<div className="w-[10rem] m-2 h-[15rem]  border-2 ">
							<img
								className="object-cover w-full h-auto "
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
									onClick={() => removeCartItem(_id)}
									className="border-1 p-1 text-sm text-white bg-red-500 hover:bg-red-600 transition-all ease-in-out border-green-500 rounded-sm"
								>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="w-[40%] flex flex-col items-center justify-center">
				<p className="text-lg">Checkout | Payment </p>
				<hr />
				<div className="mt-2">
					<h4>Total: {totalPrice()}</h4>
				</div>
				<div>
					<DropIn
						options={{
							authorization: clientToken,
							paypal: {
								flow: "vault",
							},
						}}
						onInstance={(instance) => {
							setInstance(instance);
						}}
					/>

					<button className="bg-red-400 p-2 text-white" onClick={handlePayment}>
						Make Payment
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
