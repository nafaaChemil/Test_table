import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
//import { Modal, Button } from "react-bootstrap";

import "./table.scss";

const fakeApi = {
	1: {
		id: 1,
		label: "Erasmus Without Paper",
		serviceOffer: "Applicatif",
		status: "ACCEPTED",
		teamsUrl: null,
		isManager: 1,
	},
	2: {
		id: 2,
		label: "Montée de version Kelio",
		serviceOffer: "Applicatif",
		status: "ANALYSED",
		teamsUrl: null,
		isManager: 0,
	},
	3: {
		id: 3,
		label: "MarketPlace",
		serviceOffer: "Applicatif",
		status: "ARCHIVED",
		teamsUrl: null,
		isManager: 0,
	},
	4: {
		id: 4,
		label: "Réforme MBAs - Optimisation Process",
		serviceOffer: "Applicatif",
		status: "ANALYSED",
		teamsUrl: null,
		isManager: 0,
	},
	5: {
		id: 5,
		label: "Relance des convention de stages non signées",
		serviceOffer: "Applicatif",
		status: "ANALYSED",
		teamsUrl: null,
		isManager: 0,
	},
	6: {
		id: 6,
		label: "Relance des convention de stages non signées",
		serviceOffer: "Applicatif",
		status: "ANALYSED",
		teamsUrl: null,
		isManager: 0,
	},
	7: {
		id: 7,
		label: "Relance des convention de stages non signées",
		serviceOffer: "Applicatif",
		status: "ANALYSED",
		teamsUrl: null,
		isManager: 0,
	},
	8: {
		id: 8,
		label: "Relance des convention de stages non signées",
		serviceOffer: "Applicatif",
		status: "REGISTERED",
		teamsUrl: null,
		isManager: 0,
	},
	9: {
		id: 9,
		label: "Relance des convention de stages non signées",
		serviceOffer: "Applicatif",
		status: "ANALYSED",
		teamsUrl: true,
		isManager: 0,
	},
	10: {
		id: 10,
		label: "Relance des convention de stages non signées",
		serviceOffer: "Applicatif",
		status: "ARCHIVED",
		teamsUrl: null,
		isManager: 1,
	},
	11: {
		id: 11,
		label: "Relance des convention de stages non signées",
		serviceOffer: "Conseil",
		status: "ANALYSED",
		teamsUrl: null,
		isManager: 0,
	},
};

// Colonnes du tableau
const columns = [
	{
		dataField: "label",
		text: "Projet",
		sort: true,
		headerStyle: { backgroundColor: "yellow" },
	},
	{ dataField: "serviceOffer", text: "Besoin", sort: true },
	{ dataField: "status", text: "Status", sort: true },
	{ dataField: "teamsUrl", text: "Teams" },
	{
		dataField: "isManager",
		text: "Chef de projet",
	},
];

// Transformation de l'objet en array itérable
const objArr = Object.values(fakeApi);
// const objArrRaw = JSON.stringify(objArr);

export default function Table() {
	const [data, setData] = useState(objArr);
	const [toggleCp, setToggleCp] = useState(false);
	const [toggleArchi, setToggleArchi] = useState(false);

	/* -----------------------------------
		Tri des datas avec chef de projet
	----------------------------------- */

	// fonction switch
	const handleCpMan = () => setToggleCp(!toggleCp);
	const handleArchi = () => setToggleArchi(!toggleArchi);

	//  array.filter((i) => i.status === "ARCHIVED");
	// array.filter((i) => i.isManager === 1);

	const getDataManaged = (array) => {
		//console.log("click CP");
		if (toggleCp && !toggleArchi) {
			console.log("CP on et Archi off");
			return array.filter((i) => i.isManager === 1);
		}
		// else if (toggleCp && toggleArchi) {
		// 	return array;
		// } else if (!toggleCp && !toggleArchi) {
		// 	return array;
		// }
		else {
			return array;
		}
	};

	const getDataArchi = (array) => {
		//console.log("click ARCHI");
		if (!toggleCp && toggleArchi) {
			console.log("Archi on et Cp off");
			return array.filter((i) => i.status === "ARCHIVED");
		} else if (toggleCp && toggleArchi) {
			return array
				.filter((i) => i.status === "ARCHIVED")
				.filter((i) => i.isManager === 1);
			// } else if (!toggleCp && !toggleArchi) {
			// 	return array;
		} else {
			return array;
		}
	};

	const { SearchBar } = Search;

	const rowEvents = {
		// onMouseEnter: (e, row, cell) => {
		// 	e.target.style.visibility = "hidden";
		// },
		// onMouseLeave: (e) => {
		// 	//console.log(row.teamsUrl);
		// 	e.target.style.visibility = "visible";
		// },

		onMouseEnter: (e, row) => {
			const Ligne = e.target.parentElement;
			Ligne.classList.add("ligneTab");
			console.log(e.target.parentElement);
		},
		onMouseLeave: (e, row) => {
			const Ligne = e.target.parentElement;
			Ligne.classList.remove("ligneTab");
			console.log(e.target.parentElement);
		},
	};

	// useEffect
	useEffect(() => {
		// let result = [...objArr];
		let result = objArr;

		result = getDataManaged(result);
		result = getDataArchi(result);

		setData(result);
	}, [toggleArchi, toggleCp]);

	return (
		<div className="App">
			<ToolkitProvider
				bootstrap4
				keyField="id"
				data={data}
				columns={columns}
				search
			>
				{(props) => (
					<div>
						<section id="filter">
							<SearchBar
								{...props.searchProps}
								className="custome-search-field"
								style={{ color: "blue" }}
								delay={50}
								placeholder="Rechercher"
							/>

							{/* Bouton switch chef de projet*/}
							<div className="form-check form-switch">
								<input
									className="form-check-input"
									type="checkbox"
									id="flexSwitchCheckDefault"
									onClick={() => setToggleCp(!toggleCp)}
								/>
								<label
									className="form-check-label"
									htmlFor="flexSwitchCheckDefault"
								>
									Chef de projet
								</label>
							</div>

							{/* Switch des projets archivés */}
							<div className="form-check form-switch">
								<input
									className="form-check-input"
									type="checkbox"
									id="flexSwitchCheckDefault"
									onClick={() => setToggleArchi(!toggleArchi)}
								/>
								<label
									className="form-check-label"
									htmlFor="flexSwitchCheckDefault"
								>
									Projets archivés
								</label>
							</div>
						</section>

						<BootstrapTable
							{...props.baseProps}
							striped
							hover
							bordered={false}
							pagination={paginationFactory()}
							rowEvents={rowEvents}
						/>
					</div>
				)}
			</ToolkitProvider>
		</div>
	);
}
