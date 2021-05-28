import axios from "axios";

require("es6-promise").polyfill();
require("isomorphic-fetch");

let dataP;
fetch("https://mocki.io/v1/ebd15117-dfce-4425-883b-64ab0879bef5")
	.then((response) => response.json())
	.then((dataApi) => (dataP = dataApi));
//	.then(() => console.log(dataP));

// const dataP = { ...dataProjects };
const jsonObj = JSON.stringify(dataP);

export default jsonObj;
