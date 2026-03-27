import { mount } from '@vue/test-utils'
import TheHeader from '@/components/TheHeader.vue'

// -------------- Testes da Header -------------------------
describe('HeaderPrincipal', () => {
    // ---------- Teste de renderização ----------
    describe('Renderização básica', () => {
        
        test('deve montar o componente corretamente', () =>{
            const wrapper = mount(TheHeader)
            expect(wrapper.exists()).toBe(true)
        })
        test('deve exibir a logo da UEPA', () => { 
            const wrapper = mount(TheHeader)
            expect(wrapper.text()).toContain('UEPA')
            expect(wrapper.text()).toContain('Universidade do Estado do Pará')
         })

        test('deve exibir os links de navegação', () => { 
            const wrapper = mount(TheHeader)
            expect(wrapper.text()).toContain('MEU PERFIL')
            expect(wrapper.text()).toContain('LOGIN')
            expect(wrapper.text()).toContain('CADASTRO')
         })
    })

    // ---------- Teste de lógica de usuário ----------
    describe('Lógica de Usuário', () => {
        test('deve mostrar "Olá, Usuário" quando logado', () => { 
            
            
         })

        test('deve mostrar botão de login quando deslogado', () => { 
            
         })
    })
})