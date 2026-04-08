<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import InputGenerico from "../Login/InputGenerico.vue";
import api from "@/services/api";

const etapa = ref(1);
const email = ref("");
const codigo = ref("");
const novaSenha = ref("");
const confirmarSenha = ref("");
const codigoGerado = ref("");
const loading = ref(false);
const router = useRouter();

const enviarCodigo = async () => {
  if (!email.value) {
    window.alert("O campo de e-mail é obrigatório.");
    return;
  }
  try {
    await api.post("/verificar-email", { email: email.value });
    codigoGerado.value = Math.floor(100000 + Math.random() * 900000).toString();
    window.alert(`Código enviado: ${codigoGerado.value}`);
    etapa.value = 2;
  } catch (error) {
    window.alert(error?.response?.data?.mensagem || "E-mail não cadastrado.");
  }
};

const validarCodigo = () => {
  if (codigo.value === codigoGerado.value) {
    etapa.value = 3;
    return;
  }
  window.alert("Código incorreto.");
};

const finalizar = async () => {
  if (novaSenha.value.length < 8) {
    window.alert("A senha deve ter no mínimo 8 caracteres.");
    return;
  }
  if (novaSenha.value !== confirmarSenha.value) {
    window.alert("As senhas não coincidem.");
    return;
  }
  loading.value = true;
  try {
    await api.post("/alterar-senha", {
      email: email.value,
      novaSenha: novaSenha.value,
    });
    window.alert("Sua senha foi atualizada com sucesso!");
    router.push("/login");
  } catch (error) {
    window.alert(error?.response?.data?.erro || "Erro ao alterar senha.");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="page-wrapper">
    <div class="container">
      <section v-if="etapa === 1">
        <h2>Recuperar Senha</h2>
        <p>Informe seu e-mail para receber o código de validação.</p>
        <InputGenerico label="E-mail Cadastrado" id="email" type="email" placeholder="exemplo@uepa.br" v-model="email" />
        <button @click="enviarCodigo">ENVIAR CÓDIGO</button>
      </section>

      <section v-else-if="etapa === 2">
        <h2>Validar Código</h2>
        <p>Enviamos um código de 6 dígitos para o seu e-mail.</p>
        <InputGenerico label="Código de Verificação" id="codigo" placeholder="000000" v-model="codigo" />
        <button @click="validarCodigo">VERIFICAR CÓDIGO</button>
        <button class="btn-secundario" @click="etapa = 1">Reenviar e-mail</button>
      </section>

      <section v-else>
        <h2>Nova Senha</h2>
        <p>Crie uma senha forte para sua conta.</p>
        <InputGenerico label="Nova Senha" id="novaSenha" type="password" placeholder="Mínimo 8 caracteres" v-model="novaSenha" />
        <InputGenerico
          label="Confirmar Nova Senha"
          id="confirmaSenha"
          type="password"
          placeholder="Repita a senha"
          v-model="confirmarSenha"
        />
        <button :disabled="loading" @click="finalizar">
          {{ loading ? "ATUALIZANDO..." : "REDEFINIR SENHA" }}
        </button>
      </section>
    </div>
  </main>
</template>

<style scoped>
@import "../../assets/css/auth.css";

p {
  color: #666;
  text-align: center;
  margin-bottom: 16px;
}

.btn-secundario {
  margin-top: 10px;
  background: white;
  border: 1px solid var(--azul-uepa);
  color: var(--azul-uepa);
}
</style>
