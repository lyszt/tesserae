import { network, setAuthData } from '../../utils/api'
import { NetworkError } from '../../lib/network/Network'

// Envia credenciais para a API e gerencia autenticação
async function sendLoginData(username, password) {
	// Monta payload com credenciais fornecidas
	const payload = { username: username || '', password: password || '' }
	try {
		// Faz requisição POST para endpoint de login
		const response = await network.post('auth/login/', payload)

		const data = response.body

		// Armazena token e dados do usuário no localStorage
		if (data?.token?.hash) {
			setAuthData({
				token: data.token.hash,
				user: data.user
			})
		}
		return { success: true }
	} catch (err) {
		// Trata erros do Network
		if (err instanceof NetworkError) {
			const serverMsg = err.response?.errors || 'Erro no servidor.'
			// Erros 5xx: mensagem genérica de falha
			if (err.status >= 500 && err.status < 600) {
				return { success: false, status: err.status, message: 'Estamos tendo dificuldades. Falha na conexão.' }
			}
			// Outros erros: retorna mensagem do servidor
			return { success: false, status: err.status, message: String(serverMsg) }
		}
		// Loga outros erros mas não expõe detalhes ao usuário
		console.error('Erro de rede:', err)
		return { success: false, message: 'Estamos tendo dificuldades. Falha na conexão.' }
	}
}

export { sendLoginData };