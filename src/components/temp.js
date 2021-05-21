import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import { Modal, Button } from "react-bootstrap";

import "./table.scss";

export default function Table() {
	const [data, setData] = useState([]);
	const [toggleCp, setToggleCp] = useState(false);
	const [toggleArchi, setToggleArchi] = useState(false);

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

	// Data issues de l'api profil
	const fakeApi = {
		1: {
			id: 1,
			label: "Erasmus Without Paper",
			serviceOffer: "Applicatif",
			status: "ARCHIVED",
			teamsUrl: null,
			isManager: 1,
		},
		2: {
			id: 2,
			label: "Montée de version Kelio",
			serviceOffer: "Applicatif",
			status: "ARCHIVED",
			teamsUrl: null,
			isManager: 0,
		},
		3: {
			id: 3,
			label: "MarketPlace",
			serviceOffer: "Applicatif",
			status: "ANALYSED",
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
			status: "ANALYSED",
			teamsUrl: null,
			isManager: 0,
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

	// Transformation de l'objet en array itérable
	const objArr = Object.values(fakeApi);
	// const objArrRaw = JSON.stringify(objArr);

	const getData = () => {
		setData(objArr);
	};

	// fonction filtre chef de projet
	const handleCpMan = () => {
		getDataManaged();
	};

	const handleArchi = () => {
		getDataArchi();
	};

	// useState des datas
	const getDataManaged = () => {
		setToggleCp(!toggleCp);
		toggleCp
			? setData(objArr.filter((i) => i.isManager === 1))
			: setData(objArr);
	};

	// useState des datas
	const getDataArchi = () => {
		setToggleArchi(!toggleArchi);
		toggleArchi
			? setData(objArr.filter((i) => i.status === "ARCHIVED"))
			: setData(objArr);
	};

	// Bar de recherche
	const { SearchBar } = Search;

	// Evt on row hover
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
		getData();
	}, []);

	return (
		<div className="App">
			<ToolkitProvider bootstrap4 keyField="id" data={data} columns={columns}>
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

							{/* Bouton switch */}
							<div class="form-check form-switch">
								<input
									class="form-check-input"
									type="checkbox"
									id="flexSwitchCheckDefault"
									onClick={handleCpMan}
								/>
								<label class="form-check-label" for="flexSwitchCheckDefault">
									Chef de projet
								</label>
							</div>

							{/* Projets archivés */}
							<div class="form-check form-switch">
								<input
									class="form-check-input"
									type="checkbox"
									id="flexSwitchCheckDefault"
									onClick={handleArchi}
								/>
								<label class="form-check-label" for="flexSwitchCheckDefault">
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
