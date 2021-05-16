import React from "react";

export default function Datatable({ data }) {
	const colonnes = data[0] && Object.keys(data[0]);
	return (
		<table cellPadding={0} cellSpacing={0}>
			<thead>
				<tr style={{ textAlign: "left", fontSize: 18 }}>
					{data[0] && colonnes.map((entete) => <th>{entete} </th>)}
				</tr>
			</thead>
			<tbody>
				{data.map((ligne) => (
					<tr>
						{colonnes.map((colonne) => (
							<td>{ligne[colonne]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
