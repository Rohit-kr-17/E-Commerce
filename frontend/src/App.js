import CartPage from "./components/CartPage";
import Filters, { FilterByCategory, FilterByPrice } from "./components/Filters";
import Header from "./components/Header";
import Products from "./components/Products";
import { Route, Routes, Navigate } from "react-router-dom";
function App() {
	return (
		<>
			<div className="App">
				<Header />
			</div>

			<div className="flex flex-wrap p-2 justify-center">
				<Routes>
					<Route path="/" element={<Products />}></Route>
					<Route path="/category-filter" element={<FilterByCategory />}></Route>
					<Route path="/price-filter" element={<FilterByPrice />}></Route>
					<Route path="/cart" element={<CartPage />}></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
