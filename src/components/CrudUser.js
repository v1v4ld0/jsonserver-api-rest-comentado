import React, { useState, useEffect } from "react"
import Form from "./Form"
import Table from "./Table"

// Importa a função httpHelper do arquivo helpers/httpHelper
import { httpHelper } from "../helpers/httpHelper"

const CrudUser = () => {
	// Define o estado 'users' usando o hook useState
	const [users, setUsers] = useState(null)

	// URL da API
	const url = "http://localhost:5000/users"
	// Cria uma instância do objeto httpHelper
	const api = httpHelper()

	// Efeito useEffect que é executado após a montagem do componente
	useEffect(() => {
		// Chama a função getUsers() para carregar os usuários iniciais
		getUsers()
	}, [])

	// Função para adicionar um novo usuário (post)
	const postUser = user => {
		api
			.post(`${url}`, { body: user }) // Faz uma requisição POST com os dados do novo usuário
			.then(res => getUsers()) // Atualiza a lista de usuários após a conclusão bem-sucedida
			.catch(err => console.log(err)) // Manipula erros
	}

	// Função para atualizar um usuário existente (put)
	const updateUser = (id, user) => {
		api
			.put(`${url}/${id}`, { body: user }) // Faz uma requisição PUT com os dados atualizados
			.then(res => getUsers()) // Atualiza a lista de usuários após a conclusão bem-sucedida
			.catch(err => console.log(err)) // Manipula erros
	}

	// Função para excluir um usuário (delete)
	const deleteUser = id => {
		api
			.del(`${url}/${id}`, {}) // Faz uma requisição DELETE para excluir o usuário
			.then(res => getUsers()) // Atualiza a lista de usuários após a conclusão bem-sucedida
			.catch(err => console.log(err)) // Manipula erros
	}

	// Função para obter a lista de usuários da API (get)
	const getUsers = () => {
		api
			.get(`${url}?_expand=companies`) // Faz uma requisição GET para obter usuários e suas empresas associadas
			.then(res => {
				setUsers(res) // Atualiza o estado 'users' com os dados recebidos
			})
			.catch(err => console.log(err)) // Manipula erros
	}

	// Se o estado 'users' ainda não foi carregado, retorna null
	if (!users) return null

	// Renderiza o componente com o formulário e a tabela de usuários
	return (
		<>
			<h3>New user</h3>
			<Form postUser={postUser} /> {/* Renderiza o componente Form com a função postUser como prop */}
			<div className='all-users'>
				<h3>All users</h3>
				<Table
					users={users}
					setUsers={setUsers}
					postUser={postUser}
					updateUser={updateUser}
					deleteUser={deleteUser}
				/> {/* Renderiza o componente Table com as funções e dados necessários como props */}
			</div>
		</>
	)
}

// Exporta o componente CrudUser
export default CrudUser
