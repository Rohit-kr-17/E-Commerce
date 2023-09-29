import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { BsCurrencyRupee } from "react-icons/bs";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import client from "../api/client.js";
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
			const { data } = await client.get("/product/braintree/token");
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
			const { data } = await client.post("/product/braintree/payment", {
				nonce,
				cart,
			});
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
				<div className="flex w-64 h-32 flex-wrap">
					<DropIn
						options={{
							authorization:
								"eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyT1RZd05USTBOVFVzSW1wMGFTSTZJbVUwTURaa1pEQXdMV0l3T0RNdE5EY3daQzA1TWpobUxXVXhOVEl6TWpNeE1qQm1PU0lzSW5OMVlpSTZJalExYm5oeU5IcHdiV3B3Wkdaa00yTWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pTkRWdWVISTBlbkJ0YW5Ca1ptUXpZeUlzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LjR3SWwwdmRsbGdzWlZIUTdDT1pQaWhMbG1rcFBseVZZaEFzQ2ViYl83NW9CZTFEei1uekZPQm5TYzZUSlYtaUdVWV9vSVc5c2lDbEhoZGhOaEFqT05nIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzQ1bnhyNHpwbWpwZGZkM2MvY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4IiwiZmVhdHVyZXMiOlsidG9rZW5pemVfY3JlZGl0X2NhcmRzIl19LCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvNDVueHI0enBtanBkZmQzYy9jbGllbnRfYXBpIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwibWVyY2hhbnRJZCI6IjQ1bnhyNHpwbWpwZGZkM2MiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsInZlbm1vIjoib2ZmIiwiY2hhbGxlbmdlcyI6WyJjdnYiXSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vb3JpZ2luLWFuYWx5dGljcy1zYW5kLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vNDVueHI0enBtanBkZmQzYyJ9LCJwYXlwYWxFbmFibGVkIjp0cnVlLCJwYXlwYWwiOnsiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImFsbG93SHR0cCI6dHJ1ZSwiZGlzcGxheU5hbWUiOiJSb2hpdCIsImNsaWVudElkIjoiYXNkZmFkc2Zhc2RmYXNkZiIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImVudmlyb25tZW50Ijoib2ZmbGluZSIsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoicm9oaXQiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifX0=",
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
