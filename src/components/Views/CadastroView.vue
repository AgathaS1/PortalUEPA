<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LogoUepa from "../LogoUepa.vue";
import InputGenerico from "../Login/InputGenerico.vue";
import api from "@/services/api";

const email = ref("");
const matricula = ref("");
const senha = ref("");
const confirmarSenha = ref("");
const loading = ref(false);
const router = useRouter();

const validarFormatoEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const realizarCadastro = () => {
  if (!email.value || !senha.value || !matricula.value) {
    window.alert("Por favor, preencha todos os campos.");
    return;
  }
  if (!validarFormatoEmail(email.value)) {
    window.alert("Por favor, insira um e-mail válido (ex: nome@uepa.br).");
    return;
  }
  if (String(matricula.value).length < 8) {
    window.alert("Por favor, insira uma matrícula válida com no mínimo 8 caracteres.");
    return;
  }
  if (senha.value.length < 8) {
    window.alert("A senha deve ter no mínimo 8 caracteres.");
    return;
  }
  if (senha.value !== confirmarSenha.value) {
    window.alert("As senhas não coincidem.");
    return;
  }

  loading.value = true;
  api
    .post("/cadastrar", {
      email: email.value,
      senha: senha.value,
      matricula: matricula.value,
    })
    .then(() => {
      window.alert("Usuário cadastrado com sucesso!");
      router.push("/login");
    })
    .catch((error) => {
      const msg = error?.response?.data?.erro || "Erro ao realizar cadastro.";
      window.alert(msg);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <main class="page-wrapper">
    <div class="container">
      <LogoUepa style="text-align: center; color: var(--azul-uepa)" />
      <h2>Faça o seu cadastro</h2>

      <form @submit.prevent="realizarCadastro">
        <InputGenerico
          label="Email institucional"
          id="email"
          type="email"
          placeholder="Digite seu email"
          v-model="email"
        />
        <InputGenerico
          label="Número de Matrícula"
          id="matricula"
          type="number"
          placeholder="Digite sua matrícula"
          v-model="matricula"
        />
        <InputGenerico
          label="Senha"
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          v-model="senha"
        />
        <InputGenerico
          label="Confirme a Senha"
          id="confirmaSenha"
          type="password"
          placeholder="Confirme sua senha"
          v-model="confirmarSenha"
        />
        <button type="submit" :disabled="loading">
          {{ loading ? "CADASTRANDO..." : "CADASTRAR" }}
        </button>
      </form>

      <div class="links-auxiliares">
        <router-link to="/login">Já tem uma conta? Faça login</router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import "../../assets/css/auth.css";

.container {
  max-width: 420px;
}
</style>
