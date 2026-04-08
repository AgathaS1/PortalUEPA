<script setup>
import { onMounted, ref } from "vue";
import api from "@/services/api";

const perfil = ref({
  email: "",
  matricula: "",
  total_inscricoes: 0,
});

const nomeUsuario = ref("Carregando...");

onMounted(async () => {
  try {
    const res = await api.get("/perfil-dados");
    perfil.value = res.data || perfil.value;
    nomeUsuario.value = perfil.value?.email
      ? `Olá, ${perfil.value.email.split("@")[0].toUpperCase()}!`
      : "Olá, ALUNO!";
  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
    nomeUsuario.value = "Erro ao carregar dados";
  }
});
</script>

<template>
  <main class="perfil-wrapper">
    <div class="perfil-container">
      <div class="perfil-header">
        <div class="avatar-circular">U</div>
        <h2>{{ nomeUsuario }}</h2>
      </div>

      <div class="perfil-info-grid">
        <div class="info-item">
          <label>E-mail Institucional</label>
          <p>{{ perfil.email || "Não informado" }}</p>
        </div>
        <div class="info-item">
          <label>Matrícula</label>
          <p>{{ perfil.matricula || "Não informado" }}</p>
        </div>
      </div>

      <div class="perfil-resumo">
        <div class="card-estatistica">
          <span class="numero">{{ perfil.total_inscricoes || 0 }}</span>
          <span class="legenda">Inscrições Ativas</span>
        </div>
      </div>

      <div class="botoes-acao">
        <router-link to="/trocar-senha" class="btn-secundario">Alterar Senha</router-link>
        <router-link to="/" class="btn-voltar">Voltar ao Início</router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
.perfil-wrapper {
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
}

.perfil-container {
  background: var(--branco);
  width: 100%;
  max-width: 500px;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-top: 8px solid var(--azul-uepa);
}

.avatar-circular {
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;
  border-radius: 50%;
  border: 2px solid var(--azul-uepa);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--azul-uepa);
}

h2 {
  color: var(--azul-uepa);
}

.perfil-info-grid {
  display: grid;
  gap: 20px;
  text-align: left;
  margin: 25px 0;
  background: #fafafa;
  padding: 20px;
  border-radius: 8px;
}

.info-item label {
  display: block;
  font-size: 0.8rem;
  color: #666;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.card-estatistica {
  background: #e7f3ff;
  padding: 15px;
  border-radius: 8px;
  display: inline-block;
  min-width: 150px;
}

.numero {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: var(--azul-uepa);
}

.botoes-acao {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-secundario,
.btn-voltar {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
}

.btn-secundario {
  border: 1px solid var(--azul-uepa);
  color: var(--azul-uepa);
}

.btn-voltar {
  background: #666;
  color: white;
}
</style>
