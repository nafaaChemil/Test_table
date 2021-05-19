import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Modal, Button } from "react-bootstrap";

export default function Table() {
	const [data, setData] = useState([]);

	const fakeApi = {
		1: {
			id: 1,
			label: "Erasmus Without Paper",
			serviceOffer: "Applicatif",
			status: "ACCEPTED",
			teamsUrl: null,
			isManager: 0,
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

	const { SearchBar } = Search;

	const columns = [
		{ dataField: "label", text: "Projet", sort: true },
		{ dataField: "serviceOffer", text: "Besoin", sort: true },
		{ dataField: "status", text: "Status", sort: true },
		{ dataField: "teamsUrl", text: "Teams" },
	];

	const rowEvents = {
		onMouseEnter: (e, row) => {
			console.log(row);
		},
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="App">
			{/* <BootstrapTable
				bootstrap4
				keyField="id"
				data={data}
				columns={columns}
				pagination={paginationFactory()}
				rowEvents={rowEvents}
				striped
				hover
				bordered={false}
			/> */}

			<ToolkitProvider
				bootstrap4
				keyField="id"
				data={data}
				columns={columns}
				search="Hello"
				noDataIndication="Table is Empty"
			>
				{(props) => (
					<div>
						<SearchBar
							{...props.searchProps}
							className="custome-search-field"
							style={{ color: "blue" }}
							delay={50}
							placeholder="Rechercher"
						/>
						<hr />
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
