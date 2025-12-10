// Utilitários para gerenciamento de API e token de autenticação

import Network, { NetworkError } from '../lib/network/Network'

const API_BASE_URL = 'http://127.0.0.1:4000/api/'

// Cria instância do Network com configuração base
const network = new Network({
    baseURL: API_BASE_URL,
    timeout: 30000,
})

// Exporta instância do Network para uso externo
export { network }

// Armazena dados de autenticação completos (token, user, etc.)
export function setAuthData({ token, user, ...otherData }) {
    if (typeof window === 'undefined') return

    const authData = {
        token: token || null,
        user: user || null,
        ...otherData
    }

    localStorage.setItem('auth_data', JSON.stringify(authData))
}

// Recupera dados de autenticação completos
export function getAuthData() {
    if (typeof window === 'undefined') return null

    const data = localStorage.getItem('auth_data')
    return data ? JSON.parse(data) : null
}

// Remove todos os dados de autenticação (efetua logout)
export function clearAuthData() {
    if (typeof window === 'undefined') return
    localStorage.removeItem('auth_data')
}

// Recupera apenas o token (para compatibilidade)
export function getToken() {
    const authData = getAuthData()
    return authData?.token || null
}

// Verifica se usuário está autenticado
export function isAuthenticated() {
    return !!getToken()
}

// Recupera informações do usuário
export function getUser() {
    const authData = getAuthData()
    return authData?.user || null
}

// Retorna instância do Network configurada com autenticação
export function getAuthenticatedNetwork() {
    const token = getToken();

    // Cria nova instância do Network com token de autenticação
    const authNetwork = new Network({
        baseURL: API_BASE_URL,
        timeout: 30000,
    })

    // Adiciona Token se usuário estiver autenticado
    if (token) {
        authNetwork.setHeader('Authorization', `Bearer ${token}`);
    }

    return authNetwork
}

// Valida token
export async function validateToken() {
    const token = getToken();

    if(token) {
        try {
            const authNetwork = getAuthenticatedNetwork();
            const response = await authNetwork.post("/auth/validate", {})
            return response?.status === 200
        } catch (error) {
            if (error instanceof NetworkError && error.status === 401) {
                return false
            }
            console.log(error);
            return false
        }
    }
    return false
}

// Retorna URL base da API (centralizando configuração)
export function getApiBaseUrl() {
    return API_BASE_URL
}
