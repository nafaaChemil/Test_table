import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
	PaginationProvider,
	PaginationListStandalone,
	SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";

import { Modal, Button } from "react-bootstrap";

// Css
import "./table.scss";

// Data
const fakeApi = {
	1: {
		id: 1,
		label: "Erasmus Without Paper",
		serviceOffer: "Conseil",
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

// Transformation de l'objet en array itérable
const objArr = Object.values(fakeApi);
// const objArrRaw = JSON.stringify(objArr);

export default function Table2() {
	const [data, setData] = useState(objArr);
	const [toggleCp, setToggleCp] = useState(false);
	const [toggleArchi, setToggleArchi] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	//const [searchResults, setSearchResults] = useState([]);

	const handleChange = (event) => setSearchTerm(event.target.value);

	const editRequest = (cell, row, rowIndex, formatExtraData) => {
		// return (
		// 	<span>
		// 		<strong style={{ color: "red" }}>{cell} </strong>
		// 	</span>

		// <Button
		// 	onClick={() => {
		// 		//  this.onFollowChanged(row);
		// 		console.log("klfd");
		// 	}}
		// >
		// 	{" "}
		// 	Status
		// </Button>
		// );

		if (row.status) {
			return <span className="editRequest">{cell}</span>;
		}

		//return <span>{cell} </span>;
	};

	function teamBt(cell, row) {
		if (row.teamsUrl) {
			return (
				<span>
					<strong style={{ color: "green" }}>
						{cell}
						{/* Channel team ok */}
					</strong>
				</span>
			);
		}

		return (
			<span>
				{/* {cell} */}
				Pas de canal Team
			</span>
		);
	}

	// Colonnes du tableau
	const columns = [
		{
			dataField: "label",
			text: "Projet",
			sort: true,
		},
		{ dataField: "serviceOffer", text: "Besoin", sort: true },
		{
			dataField: "status",
			text: "Status",
			sort: true,
			formatter: editRequest,
		},
		{ dataField: "teamsUrl", text: "Teams", formatter: teamBt },
		// {
		// 	dataField: "isManager",
		// 	text: "Chef de projet",
		// },
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
			return array.filter((i) => i.status === "ARCHIVED");
		} else if (toggleCp && toggleArchi) {
			return array
				.filter((i) => i.status === "ARCHIVED")
				.filter((i) => i.isManager === 1);
		} else {
			return array;
		}
	};

	const rowEvents = {
		// onMouseEnter: (e, row, cell) => {
		// 	e.target.style.visibility = "hidden";
		// },
		// onMouseLeave: (e) => {
		// 	//console.log(row.teamsUrl);
		// 	e.target.style.visibility = "visible";
		// },

		onMouseEnter: (e, row, cell) => {
			const Ligne = e.target.parentElement;
			Ligne.classList.add("ligneTab");
			// console.log(e.target.parentElement);
			// console.log(cell);
			// console.log(row);
		},
		onMouseLeave: (e, row) => {
			const Ligne = e.target.parentElement;
			Ligne.classList.remove("ligneTab");
			console.log(e.target.parentElement);
		},
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
				value: data.length,
			},
		], // A numeric array is also available. the purpose of above example is custom the text
	};

	useEffect(() => {
		let result = objArr;
		result = getFiltered(result);
		console.log(result);
		result = getDataManaged(result);
		result = getDataArchi(result);

		setData(result);
	}, [toggleArchi, toggleCp, searchTerm]);

	return (
		<div className="App">
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
							{/* Boutons switch */}
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
							Résultats par page
							<SizePerPageDropdownStandalone {...paginationProps} />
						</section>
						<BootstrapTable
							keyField="id"
							data={data}
							columns={columns}
							filter={filterFactory()}
							rowEvents={rowEvents}
							{...paginationTableProps}
						/>
						<div className="col-md-6 col-xs-6 col-sm-6 col-lg-6">
							<PaginationListStandalone {...paginationProps} />
						</div>
					</div>
				)}
			</PaginationProvider>
		</div>
	);
}
