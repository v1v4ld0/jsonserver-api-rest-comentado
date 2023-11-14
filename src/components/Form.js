import React, { useState } from "react"
import DropCompanies from "./DropCompanies"

// Componente Formulário
const Form = ({ userData = {}, postUser, updateUser }) => {
	// State para armazenar os dados do usuário no formulário
	const [user, setUser] = useState({
		name: userData.name ?? "",
		username: userData.username ?? "",
		email: userData.email ?? "",
		phone: userData.phone ?? "",
		companiesId: userData.companiesId ?? "0",
	})

	// Função para atualizar o state ao digitar nos campos do formulário
	const handleValue = e => {
		// Atualiza o state 'user' com os novos valores do campo
		setUser({ ...user, [e.target.name]: e.target.value })
	}

	// Função para lidar com o envio do formulário
	const submitUser = e => {
		// Impede o comportamento padrão do formulário
		e.preventDefault()

		// Verifica se uma empresa foi selecionada
		if (user.companiesId === "0") return

		// Se userData.id existir, significa que é uma atualização, senão é uma adição
		if (userData.id) {
			// Chama a função de atualizar usuário passando o ID e os novos dados do usuário
			updateUser(userData.id, user)
		} else {
			// Chama a função de adicionar usuário passando os dados do usuário
			postUser(user)
		}
	}

	// Renderiza o formulário
	return (
		<form onSubmit={submitUser} className='row'>
			<input
				type='text'
				name='name'
				value={user.name}
				placeholder='Name'
				onChange={e => handleValue(e)}
			/>
			<input
				type='email'
				name='email'
				value={user.email}
				placeholder='Email'
				onChange={e => handleValue(e)}
			/>
			<input
				type='tel'
				name='phone'
				value={user.phone}
				placeholder='Phone (10)'
				pattern='[0-9]{10}'
				onChange={e => handleValue(e)}
			/>
			{/* Componente DropCompanies para selecionar a empresa */}
			<DropCompanies companiesId={user.companiesId} handleValue={handleValue} />
			<input
				className='btn-submit'
				type='submit'
				value={`${!userData.id ? "Add new user" : "Save user"}`}
			/>
		</form>
	)
}

// Exporta o componente Form
export default Form
