<script setup>
import { onMounted, ref } from "vue";
import api from "@/services/api";

const inscricoes = ref([]);
const carregando = ref(true);

const carregarMinhasInscricoes = async () => {
  carregando.value = true;
  try {
    const res = await api.get("/meus-eventos");
    inscricoes.value = res.data || [];
  } catch (error) {
    if (error?.response?.status === 401) {
      window.location.href = "/login";
      return;
    }
    inscricoes.value = [];
  } finally {
    carregando.value = false;
  }
};

const cancelarInscricao = async (eventoId) => {
  const confirmar = window.confirm("Tem certeza que deseja cancelar sua inscrição neste evento?");
  if (!confirmar) return;
  try {
    await api.delete(`/cancelar-inscricao/${eventoId}`);
    window.alert("Inscrição cancelada com sucesso!");
    await carregarMinhasInscricoes();
  } catch {
    window.alert("Erro ao cancelar inscrição.");
  }
};

onMounted(carregarMinhasInscricoes);
</script>

<template>
  <main class="container">
    <header class="topo">
      <h1>Minhas Inscrições</h1>
      <router-link to="/" class="btn-voltar">← Voltar ao Início</router-link>
    </header>

    <section class="lista-eventos">
      <p v-if="carregando">Carregando suas inscrições...</p>
      <p v-else-if="!inscricoes.length">Você ainda não se inscreveu em nenhum evento.</p>
      <article class="card-inscrito" v-for="item in inscricoes" :key="item.id">
        <div class="info-evento">
          <h3>{{ item.titulo }}</h3>
          <p>📅 {{ new Date(item.data_evento).toLocaleDateString("pt-BR", { timeZone: "UTC" }) }} | 📍 {{ item.local_evento }}</p>
        </div>
        <div class="acoes-evento">
          <span class="status-badge">Inscrito</span>
          <button class="btn-cancelar" @click="cancelarInscricao(item.id)">Cancelar</button>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 30px auto 0;
  padding: 0 20px;
}

.topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 3px solid var(--azul-uepa);
  padding-bottom: 10px;
}

h1 {
  color: var(--azul-uepa);
}

.btn-voltar {
  color: var(--azul-uepa);
  font-weight: bold;
}

.lista-eventos {
  display: grid;
  gap: 15px;
}

.card-inscrito {
  background: var(--branco);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.status-badge {
  background-color: #e7f3ff;
  color: var(--azul-uepa);
  padding: 5px 12px;
  border-radius: 20px;
  font-weight: bold;
}

.acoes-evento {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-cancelar {
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 10px;
  cursor: pointer;
}
</style>
