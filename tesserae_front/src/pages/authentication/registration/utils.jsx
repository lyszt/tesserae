import { network, setToken } from '../../../utils/api'
import { NetworkError } from '../../../lib/network/Network'

// Registra novo usuário e faz login automático
async function sendRegisterData(username, password, email) {
    const payload = { username: username || '', password: password || '', email: email || '' }
    try {
        // Envia requisição POST para endpoint de registro
        const response = await network.post('auth/register/', payload)

        const data = response.body

        // Armazena token (login automático após registro)
        const token = data?.token || null
        if (token) {
            setToken(token)
        }
        return { success: true, token }
    } catch (err) {
        // Trata erros do Network
        if (err instanceof NetworkError) {
            // Erros 5xx: mensagem genérica de falha
            if (err.status >= 500 && err.status < 600) {
                return { success: false, status: err.status, message: 'Estamos tendo dificuldades. Falha na conexão.' }
            }

            // Se o erro não for interno, manda a mensagem do servidor
            const serverMsg = err.response?.body || 'Erro ao registrar.'
            return { success: false, status: err.status, message: String(serverMsg) }
        }
        // Loga outros erros mas não expõe detalhes ao usuário
        console.error('Erro de rede:', err)
        return { success: false, message: 'Estamos tendo dificuldades. Falha na conexão.' }
    }
}

export { sendRegisterData };