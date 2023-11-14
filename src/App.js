import { LogoIcon } from "./assets/icons"
import CrudUser from "./components/CrudUser"
import "./styles/App.css"

// Componente da aplicação
function App() {
	return (
		<>
			<header>
				<div className='header__content'>
					<div className='logo'>
						<LogoIcon />
						<strong>JSON SERVER API</strong>
					</div>
				</div>
			</header>
			<main>
				<CrudUser />
			</main>
		</>
	)
}

// Exporta o componente App
export default App
