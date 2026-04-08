<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LogoUepa from "../LogoUepa.vue";
import InputGenerico from "../Login/InputGenerico.vue";
import api from "@/services/api";
import { useUserStore } from "@/stores/user";

const email = ref("");
const password = ref("");
const loading = ref(false);
const router = useRouter();
const userStore = useUserStore();

const realizarLogin = () => {
  if (!email.value || !password.value) {
    window.alert("Por favor, preencha todos os campos.");
    return;
  }

  loading.value = true;
  api
    .post("/login", { email: email.value, senha: password.value })
    .then(async (res) => {
      await userStore.buscarUsuario();
      window.alert(`Bem-vindo, ${res.data?.usuario || userStore.nomeFormatado}!`);
      router.push("/");
    })
    .catch((error) => {
      const msg = error?.response?.data?.erro || "E-mail ou senha incorretos.";
      window.alert(msg);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <!-- Container principal (mantém o CSS de fundo cinza e centralização) -->
  <main class="page-wrapper">
    <!-- Card branco de login -->
    <div class="container">
      <!-- Logo da Instituição (Texto "UEPA" e subtítulo) -->
      <LogoUepa style="text-align: center; color: var(--azul-uepa)" />
      <br />
      <h2>Acesso ao Sistema</h2>

      <!-- Formulário de Login -->
      <form @submit.prevent="realizarLogin">
        <!-- Input de Email Institucional -->
        <!-- TODO <InputGenerico label="Email institucional" id="email" type="email" placeholder="Digite seu email" v-model="email" /> -->
        <InputGenerico
          label="Email institucional"
          id="email"
          type="email"
          placeholder="Digite seu email"
          v-model="email"
        />

        <!-- Input de Senha (já contendo a lógica de mostrar/ocultar senha internamente) -->
        <!-- TODO <InputSenha label="Senha" id="senha" placeholder="Digite sua senha" v-model="senha" /> -->
        <InputGenerico
          label="Senha"
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          v-model="password"
        />

        <!-- Botão de submissão -->
        <button type="submit" :disabled="loading">
          {{ loading ? "ENTRANDO..." : "ENTRAR" }}
        </button>

        <!-- Links para Cadastrar e Recuperar Senha -->
        <div class="links-auxiliares">
          <router-link to="/cadastrar">Novo Usuário</router-link>
          <router-link to="/trocar-senha">Esqueci Senha</router-link>
        </div>
      </form>
    </div>

    <!-- Modal de Alerta Customizado (Fica fora do card de login para cobrir a tela toda) -->
    <!-- TODO <ModalAlerta v-if="exibirAlerta" :titulo="alertaTitulo" :mensagem="alertaMensagem" @fechar="fecharAlerta" /> -->
  </main>
</template>

<style scoped>
@import "../../assets/css/auth.css";

.links-auxiliares {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
</style>
