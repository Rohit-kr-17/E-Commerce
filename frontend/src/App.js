import Card from "./components/Card";
import Header from "./components/Header";
import Products from "./components/Products";

function App() {
	return (
		<div className="App">
			<Header />
			<div className="flex flex-wrap p-2 max-w-screen-sl">
				{" "}
				<Products />
			</div>

			{/* <Card /> */}
		</div>
	);
}

export default App;
