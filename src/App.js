import React, { useState, useEffect } from "react";
import Datatable from "./datatable";
import "./datatable/table.css";

// Import du css
import "./index.css";

require("es6-promise").polyfill();
require("isomorphic-fetch");

const apiUrl = "https://random-data-api.com/api/app/random_app?size=30";

export default function App() {
	const [data, setData] = useState([]);
	const [q, setQ] = useState("");

	useEffect(() => {
		fetch(apiUrl)
			.then((response) => response.json())
			.then((json) => setData(json));
	}, []);

	return (
		<>
			<h3>Le cannabis </h3>
			<div>Filter goes here</div>
			<div>
				<Datatable data={data} />
			</div>
		</>
	);
}
