import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
	PaginationProvider,
	PaginationListStandalone,
	SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import filterFactory from "react-bootstrap-table2-filter";

// Images
import teamOk from "../images/teamOk.svg";
import teamKo from "../images/teamKo.svg";
import icoApp from "../images/ico-application.svg";

// Css
import "./table.scss";

require("es6-promise").polyfill();
require("isomorphic-fetch");
//import { Modal, Button } from "react-bootstrap";

// const originApi = {
// 	1: {
// 		id: 1,
// 		label: "Erasmus Without Paper",
// 		serviceOffer: "Applicatif",
// 		status: "Projet archivé",
// 		teamsUrl: "http://google.com",
// 		isManager: 1,
// 	},
// 	2: {
// 		id: 2,
// 		label: "Montée de version Kelio",
// 		serviceOffer: "Applicatif",
// 		status: "Demande en cours d'analyse",
// 		teamsUrl: null,
// 		isManager: 0,
// 	},
// 	3: {
// 		id: 3,
// 		label: "MarketPlace",
// 		serviceOffer: "Applicatif",
// 		status: "Projet archivé",
// 		teamsUrl: null,
// 		isManager: 0,
// 	},
// 	4: {
// 		id: 4,
// 		label: "Réforme MBAs - Optimisation Process",
// 		serviceOffer: "Applicatif",
// 		status: "Demande en cours d'analyse",
// 		teamsUrl: null,
// 		isManager: 0,
// 	},
// 	5: {
// 		id: 5,
// 		label: "Relance des convention de stages non signées",
// 		serviceOffer: "Applicatif",
// 		status: "Demande en cours d'analyse",
// 		teamsUrl: null,
// 		isManager: 0,
// 	},
// 	6: {
// 		id: 6,
// 		label: "Archve",
// 		serviceOffer: "Applicatif",
// 		status: "Demande en cours d'analyse",
// 		teamsUrl: "http://google.com",
// 		isManager: 0,
// 	},
// 	7: {
// 		id: 7,
// 		label: "zer",
// 		serviceOffer: "Applicatif",
// 		status: "Demande enregistrée",
// 		teamsUrl: null,
// 		isManager: 0,
// 	},
// };

// myObj = Object.values(originApi);

const apiUrl = "https://mocki.io/v1/ebd15117-dfce-4425-883b-64ab0879bef5";

export default function Table2() {
	let obj = [];

	const [data, setData] = useState(obj);
	const [data2, setData2] = useState();

	const [objCharged, setObjCharged] = useState(false);

	const [dataL, setDataL] = useState();
	const [toggleCp, setToggleCp] = useState(false);
	const [toggleArchi, setToggleArchi] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [wordRes, setWordRes] = useState("");
	const handleChange = (event) => setSearchTerm(event.target.value);

	const editRequest = (cell, row, rowIndex, formatExtraData) => {
		if (row.status) {
			return (
				<>
					<span className="status btn" role="button">
						{cell}
					</span>
					<a
						role="button"
						className="btn btn-info editRequest"
						target="_self"
						href={`/adresse/${row.id}`}
					>
						Modifier la demande
					</a>
				</>
			);
		}
	};

	const linkProj = (cell, row, rowIndex, formatExtraData) => {
		if (row.label) {
			return (
				<a
					target="_self"
					href={`/adresseProj/${row.id}`}
					title="Détails de la demande"
				>
					{" "}
					{cell}{" "}
				</a>
			);
		}
	};

	function teamBt(cell, row) {
		if (row.teamsUrl) {
			return (
				<span>
					<strong style={{ color: "green" }}>
						<a target="_blank" href={`${cell}`}>
							<img src={teamOk} alt="canal-team" />{" "}
						</a>
					</strong>
				</span>
			);
		}

		return (
			<span>
				<img src={teamKo} alt="canal-team-off" />
			</span>
		);
	}

	function icoBesoin(cell, row) {
		if (row.serviceOffer === "Applicatif") {
			return (
				<span>
					<img src={icoApp} alt="canal-team" /> &nbsp; {cell}
				</span>
			);
		}

		return <span>{cell}</span>;
	}

	// Colonnes du tableau
	const columns = [
		{
			dataField: "label",
			text: "Projet",
			sort: true,
			formatter: linkProj,
		},
		{
			dataField: "serviceOffer",
			text: "Besoin",
			sort: true,
			formatter: icoBesoin,
		},
		{
			dataField: "status",
			text: "Status",
			sort: true,
			formatter: editRequest,
		},
		{ dataField: "teamsUrl", text: "Teams", formatter: teamBt },
	];

	/* -----------------------------------
		Tri des datas avec chef de projet
	----------------------------------- */
	// fonction switch
	const handleCpMan = () => setToggleCp(!toggleCp);
	const handleArchi = () => setToggleArchi(!toggleArchi);
	const getFiltered = (array) => {
		return array.filter(
			(i) =>
				i.label.toString().toLowerCase().includes(searchTerm) ||
				i.status.toString().toLowerCase().includes(searchTerm) ||
				i.serviceOffer.toString().toLowerCase().includes(searchTerm)
		);
	};

	const getFilt = () => {
		let objFil = data.filter(
			(i) =>
				i.label.toString().toLowerCase().includes(searchTerm) ||
				i.status.toString().toLowerCase().includes(searchTerm) ||
				i.serviceOffer.toString().toLowerCase().includes(searchTerm)
		);
		setData(objFil);
	};

	const getDataManaged = (array) => {
		if (toggleCp && !toggleArchi) {
			console.log("CP on et Archi off");
			return array.filter((i) => i.isManager === 1);
		} else {
			return array;
		}
	};

	const getDataArchi = (array) => {
		//console.log("click ARCHI");
		if (!toggleCp && toggleArchi) {
			console.log("Archi on et Cp off");
			return array.filter((i) => i.status.includes("archivé"));
		} else if (toggleCp && toggleArchi) {
			return array
				.filter((i) => i.status.includes("archivé"))
				.filter((i) => i.isManager === 1);
		} else {
			return array;
		}
	};

	const customTotal = (from, to, size) => (
		<span
			className="react-bootstrap-table-pagination-total"
			style={{ paddingLeft: 10 }}
		>
			Affichage {from} à {to} de {size} Demandes
		</span>
	);

	const options = {
		paginationSize: 4,
		pageStartIndex: 1,
		//alwaysShowAllBtns: true, // Always show next and previous button
		// withFirstAndLast: false, // Hide the going to First and Last page button
		// hideSizePerPage: true, // Hide the sizePerPage dropdown always
		// hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
		firstPageText: "<<",
		prePageText: "<",
		nextPageText: ">",
		lastPageText: ">>",
		nextPageTitle: "First page",
		prePageTitle: "Pre page",
		firstPageTitle: "Next page",
		lastPageTitle: "Last page",
		showTotal: true,
		paginationTotalRenderer: customTotal,
		disablePageTitle: false,
		sizePerPageList: [
			{
				text: "5",
				value: 5,
			},
			{
				text: "10",
				value: 10,
			},
			{
				text: "Tout",
				value: dataL,
			},
		],
	};

	useEffect(() => {
		if (!objCharged || data === 0) {
			async function fetchDataJson() {
				const response = await fetch(apiUrl);
				const DataJson = await response.json();

				let result = DataJson;
				setObjCharged(true);

				result = getFiltered(result);
				result = getDataManaged(result);
				result = getDataArchi(result);
				setData(result);
				setWordRes(result.length);
				setDataL(result.length);
				setData2(result);
			}
			fetchDataJson();
		} else {
			let resultStocked = data2;
			resultStocked = getFiltered(resultStocked);
			resultStocked = getDataManaged(resultStocked);
			resultStocked = getDataArchi(resultStocked);
			setData(resultStocked);
			setWordRes(resultStocked.length);
			setDataL(resultStocked.length);
		}
	}, [toggleArchi, toggleCp, searchTerm]);

	return (
		<div className="App table-responsive">
			<PaginationProvider
				pagination={paginationFactory({
					custom: true,
					page: 1,
					sizePerPage: 10,
					...options,
					totalSize: data.length,
				})}
			>
				{({ paginationProps, paginationTableProps }) => (
					<div>
						<section id="filter">
							{/* Bar de recherche */}
							<div className="searchBar">
								<div class="form-outline">
									<input
										type="search"
										id="form1"
										class="form-control"
										placeholder="Rechercher"
										value={searchTerm}
										onChange={handleChange}
									/>
								</div>
								Vous avez {wordRes} élément(s) dans la liste
							</div>
							{/* Boutons switch */}
							<div className="switch">
								{/* Bouton switch chef de projet*/}
								<div className="form-check form-switch">
									<input
										className="form-check-input"
										type="checkbox"
										id="projet"
										onClick={handleCpMan}
									/>
									<label className="form-check-label" htmlFor="projet">
										Chef de projet
									</label>
								</div>

								<hr />
								{/* Switch des projets archivés */}
								<div className="form-check form-switch">
									<input
										className="form-check-input"
										type="checkbox"
										id="archi"
										onClick={handleArchi}
									/>
									<label className="form-check-label" htmlFor="archi">
										Projets archivés
									</label>
								</div>
							</div>

							<div>
								&nbsp; Résultats par page &nbsp;
								<SizePerPageDropdownStandalone {...paginationProps} />
							</div>
						</section>

						<BootstrapTable
							keyField="id"
							data={data}
							columns={columns}
							filter={filterFactory()}
							{...paginationTableProps}
						/>
						<div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
							<PaginationListStandalone {...paginationProps} />
						</div>
					</div>
				)}
			</PaginationProvider>
		</div>
	);
}
