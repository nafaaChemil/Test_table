import React, { useState, useEffect } from "react";

// Data table component
// import Datatable from "./datatable";
import Table from "./components/table";

// Import du css
import "./index.css";

// require("es6-promise").polyfill();
// require("isomorphic-fetch");
// const apiUrl = "https://random-data-api.com/api/app/random_app?size=30";

export default function App() {
	// const [data, setData] = useState([]);
	// const [q, setQ] = useState("");

	// useEffect(() => {
	// 	fetch(apiUrl)
	// 		.then((response) => response.json())
	// 		.then((json) => setData(json));
	// }, []);

	return (
		<>
			{/* <Datatable data={data} /> */}
			<Table />
		</>
	);
}
