// Utilitários para gerenciamento de API e token de autenticação

import Network from '../lib/network/Network'

const API_BASE_URL = 'http://127.0.0.1:4000/api/'

// Cria instância do Network com configuração base
const network = new Network({
    baseURL: API_BASE_URL,
    timeout: 30000,
})

// Exporta instância do Network para uso externo
export { network }

// Recupera token JWT do localStorage (SSR-safe)
export function getToken() {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('access_token')
}

// Armazena token JWT no localStorage (mantém sessão ativa)
export function setToken(token) {
    if (typeof window === 'undefined') return
    if (token) {
        localStorage.setItem('access_token', token)
    }
}

// Remove token do localStorage (efetua logout)
export function removeToken() {
    if (typeof window === 'undefined') return
    localStorage.removeItem('access_token')
}

// Verifica se usuário está autenticado (usa !! para converter em boolean)
export function isAuthenticated() {
    return !!getToken()
}

// Retorna instância do Network configurada com autenticação
export function getAuthenticatedNetwork() {
    const token = getToken()

    // Cria nova instância do Network com token de autenticação
    const authNetwork = new Network({
        baseURL: API_BASE_URL,
        timeout: 30000,
    })

    // Adiciona Token Knox se usuário estiver autenticado
    // Knox espera o formato "Token <token>" ao invés de "Bearer <token>"
    if (token) {
        authNetwork.setHeader('Authorization', `Token ${token}`)
    }

    return authNetwork
}

// Retorna URL base da API (centralizando configuração)
export function getApiBaseUrl() {
    return API_BASE_URL
}
