import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
	PaginationProvider,
	PaginationListStandalone,
	SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import axios from "axios";

import filterFactory from "react-bootstrap-table2-filter";
import { Modal, Button } from "react-bootstrap";

const urlHost = window.location.hostname;
//const apiUrl = `http://${urlHost}/api/digital_factory/project/list`;
const apiUrl = `https://random-data-api.com/api/internet_stuff/random_internet_stuff?size=10`;

let Data = [];
(async () => {
	let data;
	function status() {
		const url =
			"https://random-data-api.com/api/internet_stuff/random_internet_stuff?size=10";
		return axios.get(url).then((resp) => {
			return resp.data;
		});
	}
	data = await status();
	//console.log(data)
	Data.push(...data);
})();

console.log(Data.data);

//   const fetchData2 = async () => {
//     let resOne = await fetch(apiUrl)
//     let responseOne = await resOne.json();
//     let resOneArr = Object.values(responseOne)
//   //  console.log(resOneArr)
//    return resOneArr
// }
// fetchData2();

// let Data = resOneArr;
// console.log(Data)

export default function Table2() {
	const [data, setData] = useState(Data);
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
					title="D??tails de la demande"
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
							{/*<img src={teamOk} alt="canal-team" /> */}
							Canal on{" "}
						</a>
					</strong>
				</span>
			);
		}

		return (
			<span>
				{/*<img src={teamKo} alt="canal-team-off" /> */}
				Canal off
			</span>
		);
	}

	function icoBesoin(cell, row) {
		if (row.serviceOffer == "Applicatif") {
			return (
				<span>
					{/*<img src={icoApp} alt="canal-team" /> */}
					&nbsp; {cell}
				</span>
			);
		}

		return <span>{cell}</span>;
	}

	const columns = [
		{
			dataField: "email",
			text: "Email",
			sort: true,
		},
	];

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
			return array.filter((i) => i.status.includes("archiv??"));
		} else if (toggleCp && toggleArchi) {
			return array
				.filter((i) => i.status.includes("archiv??"))
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
			Affichage {from} ?? {to} de {size} Demandes
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
		//let result = Object.values(Data);
		// result = getFiltered(result);
		// result = getDataManaged(result);
		// result = getDataArchi(result);
		//setData(result);
		//	setWordRes(result.length);
		console.log(Data);
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
								Vous avez {wordRes} ??l??ment(s) dans la liste
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
								{/* Switch des projets archiv??s */}
								<div className="form-check form-switch">
									<input
										className="form-check-input"
										type="checkbox"
										id="archi"
										onClick={handleArchi}
									/>
									<label className="form-check-label" htmlFor="archi">
										Projets archiv??s
									</label>
								</div>
							</div>

							<div>
								&nbsp; R??sultats par page &nbsp;
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
