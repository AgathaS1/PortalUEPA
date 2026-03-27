import { defineStore } from 'pinia'
import api from '@/services/api'


export const useUserStore = defineStore('user', {
    
    // -- State do usuário
    state: () => ({
        email: '',
        logado: false, 
        loading: false
    }),

    // -- Transformando o email em nome do usuário
    getters: {
        nomeFormatado: (state) => {
            if (!state.email) return ''
            return state.email.split('@')[0].toUpperCase()
        }
    },

    actions: {
        async buscarUsuario() {
            this.loading = true
            
            try {
                // Usando o axios pra facilitar o acesso a api e gerar os cookie 
                const res = await api.get('/usuario-logado')

                // O axios já configura os dados uau
                usuario.value = res.data
            } catch (error) {

               console.error(error.message) // mensagem de erro que o axios gera    

            }
        }
    },






})