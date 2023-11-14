import React from "react"
import Form from "./Form"

// Componente Table recebe props (users, postUser, updateUser, deleteUser)
const Table = ({ users, postUser, updateUser, deleteUser }) => {
	// Função showUpdateUser: exibe ou oculta o formulário de atualização do usuário com base no ID
	const showUpdateUser = id => {
		// Encontra os elementos do formulário pela classe e alterna a classe "hide-form"
		const form = document.getElementsByClassName(`show-form-${id}`)
		form[0].classList.toggle("hide-form")
	}

	// Componente funcional Row recebe prop user
	const Row = ({ user }) => {
		return (
			<>
				{/* Renderiza uma linha na tabela com informações do usuário */}
				<div className='row'>
					<div>{user.name}</div>
					<div>{user.email}</div>
					<div>{user.phone}</div>
					<div>{user.companies.name}</div>
					<div className='buttons'>
						{/* Botões para atualizar e excluir usuários */}
						<button onClick={() => showUpdateUser(user.id)}>Update</button>
						<button onClick={() => deleteUser(user.id)}>Delete</button>
					</div>
				</div>
				{/* Renderiza o formulário de atualização do usuário, inicialmente oculto */}
				<div className={`hide-form show-form-${user.id}`}>
					<Form userData={user} postUser={postUser} updateUser={updateUser} />
				</div>
			</>
		)
	}

	// Renderiza o componente Table
	return (
		<div className='table'>
			{/* Títulos das colunas da tabela */}
			<div className='titles'>
				<div>Name</div>
				<div>Email</div>
				<div>Phone</div>
				<div>Company</div>
				<div>Actions</div>
			</div>
			{/* Renderiza as linhas da tabela usando o componente Row */}
			<div className='rows'>
				{users && users.map(u => <Row user={u} key={u.id} />)}
			</div>
		</div>
	)
}

// Exporta o componente Table
export default Table
