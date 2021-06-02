import React, {useEffect, useState} from "react";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
    PaginationListStandalone,
    PaginationProvider,
    SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

import filterFactory from "react-bootstrap-table2-filter";

// Images
import teamOk from "./images/teamOk.svg";
import teamKo from "./images/teamKo.svg";
import icoApp from "./images/ico-application.svg";
import icoConseil from "./images/ico-conseil.svg";
import icoLearning from "./images/ico-learning.svg";
import icoData from "./images/ico-data.svg";

// Css
import "../../../styles/scss/ListTabProjet.scss";
import "../../../styles/scss/bootstrapTab.scss"

import ReactDom from "react-dom";

require("es6-promise").polyfill();
require("isomorphic-fetch");


const pathDigitalFactory = "digital_factory"

const urlHost = window.location.hostname;
const urlHttps = window.location.protocol;
const apiUrl = `${urlHttps}//${urlHost}/api/digital_factory/project/list`;


export default function ListTabProjet() {
    let obj = [];

    // useState
    const [data, setData] = useState(obj);
    const [data2, setData2] = useState();
    const [showEmpty, setShowEmpty] = useState(false)
    const [objCharged, setObjCharged] = useState(false);

    const [dataL, setDataL] = useState(0);
    const [toggleCp, setToggleCp] = useState(false);
    const [toggleArchi, setToggleArchi] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [wordRes, setWordRes] = useState("");

    // functions
    const handleChange = (event) => setSearchTerm(event.target.value);

    const classLabel = (value) => {
      switch(true) {
          case value.toLowerCase().includes('en cours'):
              return 'Wip';
              break;
          case value.toLowerCase().includes('enregistrée'):
              return 'Register';
              break;
          case value.toLowerCase().includes('archiv'):
              return 'Archived';
              break;
          case value.toLowerCase().includes('rejeté'):
              return 'Refused';
              break;
          case value.toLowerCase().includes('réalisé'):
              return 'Finished';
              break;
          case value.toLowerCase().includes('accepté'):
              return 'Accepted';
              break;
      }

    }
    const editRequest = (cell, row, rowIndex, formatExtraData) => {
        if (row.status) {
            return (
                <>
					<span className={'status btn ' + classLabel(row.status)} role="button">{cell}</span>
                    <a
                        role="button"
                        className="btn btn-info editRequest"
                        target="_self"
                        href={`/${pathDigitalFactory}/project/${row.id}/edit`}
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
                    href={`/${pathDigitalFactory}/project/${row.id}/view/`}
                    title="Détails du proje"
                >
                    {" "}{cell}{" "}
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
        const Word = row.serviceOffer;
        switch (true) {
            case Word.includes('App'):
                 return <span><img src={icoApp} alt={Word} /> &nbsp;  {cell}</span>
                 break;
            case Word.includes('Conseil'):
                return <span><img src={icoConseil} alt={Word} /> &nbsp;  {cell}</span>
                break;
            case Word.includes('Learning'):
                return <span><img src={icoLearning} alt={Word} /> &nbsp;  {cell}</span>
                break;
            case Word.includes('Data'):
                return <span><img src={icoData} alt={Word} /> &nbsp;  {cell}</span>
                break;


        }

        return <span>{cell}</span>;
    }

    // Columns Tab
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
        data sorting
    ----------------------------------- */
    // fonction switch
    const handleCpMan = () => setToggleCp(!toggleCp);
    const handleArchi = () => setToggleArchi(!toggleArchi);

    // Filter tab
    const getFiltered = (array) => {
        return array.filter(
            (i) =>
                i.label.toString().toLowerCase().includes(searchTerm) ||
                i.status.toString().toLowerCase().includes(searchTerm) ||
                i.serviceOffer.toString().toLowerCase().includes(searchTerm)

        )
    };

    // Filter with switch
    const getDataManaged = (array) => {

        if (toggleCp && !toggleArchi) {
            return array.filter((i) => i.isManager === 1)
                .filter((i) => !i.status.includes("archivé"));
        } else {
            return array;
        }
    };
    const getDataArchi = (array) => {
        if (!toggleCp && !toggleArchi) {
            return array.filter((i) => !i.status.includes("archivé"));
        }else
        if (!toggleCp && toggleArchi) {
            return array
        } else if (toggleCp && toggleArchi) {
            return array.filter((i) => i.isManager === 1)


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
        paginationSize: 3,
        pageStartIndex: 1,
        //alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        //hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
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


    const noData = (lengthArr) => {
        lengthArr.length=== 0 ? setShowEmpty(true) : setShowEmpty(false)
    }



    useEffect(() => {
        if (!objCharged || data === 0) {
            async function fetchDataJson() {
                const response = await fetch(apiUrl);
                const DataJson = await response.json();

                let result = DataJson;
                setData2(result);
                setObjCharged(true);

                result = getFiltered(result);
                result = getDataManaged(result);
                result = getDataArchi(result);
                setData(result);
                setWordRes(result.length);
                setDataL(result.length);

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
            noData(resultStocked)


        }
    }, [toggleArchi, toggleCp, searchTerm]);

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="App table-responsive">
                        <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12 float-right">
                            <a href={`/${pathDigitalFactory}/project/add`} target="_self" className={'btn btn-info float-right'} role={"button"}>Nouvelle demande</a>
                        </div>
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
                                            <div className="form-outline">
                                                <input
                                                    type="search"
                                                    id="form1"
                                                    className="form-control"
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

                                            {/* Switch des projets archivés */}
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="archi"
                                                    onClick={handleArchi}
                                                />
                                                <label className="form-check-label" htmlFor="archi">
                                                    Voir les projets archivés
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
                                        bordered={ false }


                                    />
                                    <div style={{ display: showEmpty ? "block" : "none" }} className="col-md-12 col-xs-12 col-sm-12 col-lg-12 empty table">
                                        Aucunes données
                                    </div>
                                    <div className="col-md-12 col-xs-12 col-sm-12 col-lg-12">
                                        <PaginationListStandalone {...paginationProps} />
                                    </div>
                                </div>
                            )}
                        </PaginationProvider>
                    </div>
                </div>
            </div>

        </>
    );
}


ReactDom.render(<ListTabProjet/>, document.querySelector('#root'));
