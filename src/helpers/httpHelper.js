export const httpHelper = () => {
	const customFetch = async (url, options = {}) => {
		// Essa função é uma função auxiliar que utiliza o método fetch para realizar requisições HTTP
		const defaultMethod = "GET"
		const defaultHeaders = {
			"Content-Type": "application/json",
			Accept: "application/json",
		}

		// Cria um controlador de aborto para lidar com o timeout
		// AbortController é uma API que fornece uma maneira de abortar operações assíncronas. É comumente usado para cancelar solicitações de rede que estão demorando demais
		const controller = new AbortController()
		options.signal = controller.signal
		
		// Configurações padrão, caso não sejam fornecidas nas opções
		options.method = options.method || defaultMethod
		options.headers = options.headers
			? { ...defaultHeaders, ...options.headers }
			: defaultHeaders
		
		// Converte o corpo da requisição para JSON, se existir
		options.body = JSON.stringify(options.body) || false
		if (!options.body) delete options.body

		// timeout definido em 3 segundos
		setTimeout(() => {
			controller.abort() // aborta a requisição após o timeout
		}, 3000)


		try {
			 // Faz a requisição usando fetch e retorna o resultado como JSON
			const response = await fetch(url, options)
			return await response.json()
		} catch (err) {
			// Retorna erro, caso aconteça
			return err
		}
	}

	// get, post, put e del: funções para realizar diferentes tipos de requisições HTTP
	const get = (url, options = {}) => customFetch(url, options)

	const post = (url, options) => {
		options.method = "POST"
		return customFetch(url, options)
	}

	const put = (url, options) => {
		options.method = "PUT"
		return customFetch(url, options)
	}

	const del = (url, options) => {
		options.method = "DELETE"
		return customFetch(url, options)
	}

	// retorna um objeto com os métodos especificados anteriormente 
	return {
		get,
		post,
		put,
		del,
	}
}
