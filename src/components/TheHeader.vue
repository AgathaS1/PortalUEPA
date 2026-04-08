<script setup>

// Importa o usuário logado das stores do Pinia
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'
import LogoUepa from './LogoUepa.vue';

const usuario = useUserStore()

// Executa a função quando o App for montado
onMounted(() => {

  // Se o usuário ainda não foi carregado, busca na API
  if (!usuario.email) {
    usuario.buscarUsuario()
  }
  
});

</script>

<template>
  
<header>
       
        <div class="nav-container">

            <!-- Logo -->
            <LogoUepa style="color: var(--azul-uepa);"/>
            

            <!-- Container de Navegação-->
            <nav>
                <ul>
                    <li><router-link to="/">HOME</router-link></li>
                    <li><router-link to="/meus-eventos">MEUS EVENTOS</router-link></li>
                    <li><router-link to="/perfil"> MEU PERFIL</router-link></li>
                </ul>
                
                <!-- Área Usuário -->
                <div class="area-usuario" id="area-usuario">

                    <template v-if="usuario.logado">
                        <span class="boas-vindas">Olá, {{ usuario.nomeFormatado }}!</span>
                        <a href="/logout" class="btn-logout">Sair</a>
                    </template>

                    <template v-else>
                        <router-link to="/login">LOGIN</router-link>
                        <router-link to="/cadastrar">CADASTRO</router-link>
                    </template>

                </div>
            </nav>
        </div>
    </header>



</template>

<style scoped>
header {
    top: 0;
    z-index: 100;
    background: var(--branco);
    border-bottom: 5px solid var(--vermelho-uepa);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
}

.boas-vindas {
  margin-right: 20px;
  font-weight: bold;
  color: #333;
}

.btn-logout {
  color: #ff4d4d;
  text-decoration: none;
  font-weight: bold;
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

nav {
    display: flex;
    align-items: center;
    gap: 40px; 
}


.area-usuario {
    display: flex;
    align-items: center;
    gap: 15px; 
}

nav ul {
    display: flex;
    gap: 20px;
    list-style: none;
    margin: 0;
    padding: 0; 
}

nav a {
    color: var(--texto);
    font-size: 0.9rem;
    font-weight: bold;
    transition: color 0.3s ease;
}

nav a:hover,
nav a:focus-visible { 
    color: var(--azul-uepa); 
}

</style>
