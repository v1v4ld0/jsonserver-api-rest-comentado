import React, { useState, useEffect } from "react"
import { httpHelper } from "../helpers/httpHelper"

const DropCompanies = ({ companiesId, handleValue }) => {
	// State para armazenar a lista de empresas
	const [companies, setCompanies] = useState(null)
	// State para armazenar a empresa selecionada
	const [company, setCompany] = useState(companiesId)

	// URL da API para obter a lista de empresas
	const url = "http://localhost:5000/companies"
	const api = httpHelper()

	useEffect(() => {
		api
			.get(url)
			.then(res => {
				// Adiciona uma opção padrão "Select Company" à lista de empresas
				setCompanies([{ id: 0, name: "Select Company" }, ...res])
			})
			.catch(err => console.log(err))
	}, [])

	// Se a lista de empresas ainda não foi carregada, retorna null
	if (!companies) return null

	return (
		// Renderiza um elemento <select> (dropdown)
		<select
			// Define o nome do campo
			name='companiesId'
			// Define o valor selecionado com base no state 'company'
			value={company}
			// Define o evento de alteração ao selecionar uma opção
			onChange={e => {
				// Atualiza o state 'company' com o valor selecionado
				setCompany(e.target.value)
				// Chama a função 'handleValue' passando o evento como argumento
				handleValue(e)
			}}
		>
			{/* cria uma nova a lista de empresas usando o método map*/}
			{companies.map(c => (
				<option value={c.id} key={c.id}>
					{c.name}
				</option>
			))}
		</select>
	)
}

// Exporta o componente DropCompanies
export default DropCompanies
