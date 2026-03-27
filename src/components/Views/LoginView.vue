<script setup>
import LogoUepa from "../LogoUepa.vue";
</script>

<template>
  <!-- Container principal (mantém o CSS de fundo cinza e centralização) -->
  <main class="page-wrapper">
    <!-- Card branco de login -->
    <div class="container">
      <!-- Logo da Instituição (Texto "UEPA" e subtítulo) -->
      <LogoUepa style="text-align: center; color: var(--azul-uepa)" />

      <h2>Acesso ao Sistema</h2>

      <!-- Formulário de Login -->
      <form @submit.prevent="realizarLogin">
        <!-- Input de Email Institucional -->
        <!-- TODO <InputGenerico label="Email institucional" id="email" type="email" placeholder="Digite seu email" v-model="email" /> -->

        <!-- Input de Senha (já contendo a lógica de mostrar/ocultar senha internamente) -->
        <!-- TODO <InputSenha label="Senha" id="senha" placeholder="Digite sua senha" v-model="senha" /> -->

        <!-- Botão de submissão -->
        <!-- TODO <BotaoAzul type="submit">ENTRAR</BotaoAzul> -->

        <!-- Links para Cadastrar e Recuperar Senha -->
        <!-- TODO <LinksAuxiliares leftText="Novo Usuário" leftRoute="/cadastrar" rightText="Esqueci Senha" rightRoute="/alterar-senha" /> -->
      </form>
    </div>

    <!-- Modal de Alerta Customizado (Fica fora do card de login para cobrir a tela toda) -->
    <!-- TODO <ModalAlerta v-if="exibirAlerta" :titulo="alertaTitulo" :mensagem="alertaMensagem" @fechar="fecharAlerta" /> -->
  </main>
</template>

<style scoped>
@import "../../assets/css/auth.css";
</style>
