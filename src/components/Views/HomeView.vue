
<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import api from "@/services/api";

const filtros = reactive({
  nome: "",
  categoria: "",
  mes: "",
});

const eventos = ref([]);
const noticias = ref([]);
const eventoSelecionado = ref(null);
const carregandoEventos = ref(false);

const formatarData = (data) => {
  const dataObj = new Date(data);
  dataObj.setMinutes(dataObj.getMinutes() + dataObj.getTimezoneOffset());
  return dataObj.toLocaleDateString("pt-BR");
};

const imagemEvento = (path) =>
  path
    ? `http://localhost:3000/${String(path).replace(/\\/g, "/")}`
    : "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80";

const imagemNoticia = (path) =>
  path
    ? `http://localhost:3000/${String(path).replace(/\\/g, "/")}`
    : "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=800&q=80";

const eventosView = computed(() =>
  eventos.value.map((ev) => ({
    ...ev,
    dataFormatada: `${formatarData(ev.data_evento)} | ${String(ev.hora_inicio || "").slice(0, 5)}h`,
    categoriaTexto: ev.categoria || "Geral",
    banner: imagemEvento(ev.banner_path),
  }))
);

const buscarEventos = async () => {
  carregandoEventos.value = true;
  try {
    const params = {};
    if (filtros.nome) params.nome = filtros.nome;
    if (filtros.categoria) params.categoria = filtros.categoria;
    if (filtros.mes) params.mes = filtros.mes;

    const res = await api.get("/eventos", { params });
    eventos.value = res.data || [];
  } catch (error) {
    console.error("Erro ao carregar eventos:", error);
    eventos.value = [];
  } finally {
    carregandoEventos.value = false;
  }
};

const buscarNoticias = async () => {
  try {
    const res = await api.get("/noticias");
    noticias.value = (res.data || []).slice(0, 3);
  } catch (error) {
    console.error("Erro ao carregar notícias:", error);
    noticias.value = [];
  }
};

const abrirModal = (evento) => {
  eventoSelecionado.value = evento;
};

const fecharModal = () => {
  eventoSelecionado.value = null;
};

const realizarInscricao = async (idEvento) => {
  try {
    const res = await api.post("/inscrever", { eventoId: idEvento });
    window.alert(res?.data?.mensagem || "Inscrição realizada com sucesso!");
    fecharModal();
    await buscarEventos();
  } catch (error) {
    window.alert(error?.response?.data?.erro || "Você deve estar logado para se inscrever.");
  }
};

onMounted(async () => {
  await Promise.all([buscarEventos(), buscarNoticias()]);
});
</script>

<template>
  <div class="conteudo-principal">
    <section class="banner">
      <h1>Portal de Eventos Acadêmicos</h1>
      <p>Conectando você ao conhecimento, cultura e inovação na Amazônia.</p>
    </section>

    <section class="filtros-area">
      <div class="campo-grupo">
        <label>Buscar por Nome</label>
        <input v-model="filtros.nome" type="text" placeholder="Ex: Simpósio..." @input="buscarEventos" />
      </div>
      <div class="campo-grupo">
        <label>Categoria</label>
        <select v-model="filtros.categoria" @change="buscarEventos">
          <option value="">Todas as Categorias</option>
          <option>Palestra</option>
          <option>Workshop</option>
          <option>Seminário</option>
        </select>
      </div>
      <div class="campo-grupo">
        <label>Período</label>
        <input v-model="filtros.mes" type="month" @change="buscarEventos" />
      </div>
    </section>

    <h2 class="section-title">EVENTOS EM DESTAQUE</h2>
    <section class="cards-grid">
      <p v-if="carregandoEventos">Carregando eventos...</p>
      <p v-else-if="!eventosView.length">Nenhum evento encontrado para este período.</p>
      <article class="card" v-for="evento in eventosView" :key="evento.id">
        <div class="card-img" :style="{ backgroundImage: `url('${evento.banner}')` }"></div>
        <div class="card-body">
          <p class="card-data">{{ evento.dataFormatada }}</p>
          <h3>{{ evento.titulo }}</h3>
          <p>{{ evento.descricao?.slice(0, 100) }}...</p>
          <button :style="{ background: evento.ja_inscrito > 0 ? '#28a745' : '' }" @click="abrirModal(evento)">
            {{ evento.ja_inscrito > 0 ? "✓ JÁ INSCRITO" : "VER DETALHES" }}
          </button>
        </div>
      </article>
    </section>

    <section class="noticias-topo">
      <h2 class="section-title">NOTÍCIAS RECENTES</h2>
      <router-link class="btn-noticias" to="/noticias">VER TODAS AS NOTÍCIAS</router-link>
    </section>

    <section class="cards-grid">
      <p v-if="!noticias.length">Nenhuma notícia publicada...</p>
      <article class="card" v-for="noticia in noticias" :key="noticia.id">
        <div class="card-img" :style="{ backgroundImage: `url('${imagemNoticia(noticia.banner_path)}')` }"></div>
        <div class="card-body">
          <p class="card-data">{{ noticia.categoria || "Institucional" }}</p>
          <h3>{{ noticia.titulo }}</h3>
          <router-link class="link-card" :to="`/noticia/${noticia.id}`">Ler notícia</router-link>
        </div>
      </article>
    </section>

    <div v-if="eventoSelecionado" class="modal" @click.self="fecharModal">
      <div class="modal-content">
        <h3>{{ eventoSelecionado.titulo }}</h3>
        <p><strong>Data:</strong> {{ formatarData(eventoSelecionado.data_evento) }}</p>
        <p><strong>Local:</strong> {{ eventoSelecionado.local_evento }}</p>
        <p><strong>Categoria:</strong> {{ eventoSelecionado.categoriaTexto || eventoSelecionado.categoria }}</p>
        <p>{{ eventoSelecionado.descricao }}</p>
        <div class="modal-acoes">
          <button class="btn-secundario" @click="fecharModal">Fechar</button>
          <button @click="realizarInscricao(eventoSelecionado.id)">Inscrever-se</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.conteudo-principal {
  padding-bottom: 20px;
}

.banner {
  background: linear-gradient(rgba(46, 48, 146, 0.85), rgba(46, 48, 146, 0.85)),
    url("@/assets/img/Uepa-Banner.jpg");
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 100px 20px;
}

.filtros-area,
.cards-grid,
.section-title,
.noticias-topo {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}

.filtros-area {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  background: var(--branco);
  border-radius: 8px;
  padding-top: 25px;
  padding-bottom: 25px;
  margin-top: -30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.campo-grupo label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid var(--borda);
}

.section-title {
  margin-top: 40px;
  margin-bottom: 20px;
  border-left: 5px solid var(--azul-uepa);
  color: var(--azul-uepa);
  padding-left: 12px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.card {
  background: var(--branco);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.card-img {
  height: 150px;
  background-size: cover;
  background-position: center;
}

.card-body {
  padding: 20px;
}

.card-data {
  color: var(--azul-uepa);
  font-weight: bold;
  margin-bottom: 6px;
}

button,
.link-card,
.btn-noticias {
  display: inline-block;
  background: var(--azul-uepa);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: bold;
}

.noticias-topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  width: min(700px, 92vw);
  border-radius: 8px;
  border-top: 6px solid var(--azul-uepa);
  padding: 24px;
}

.modal-acoes {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
}

.btn-secundario {
  background: #f3f3f3;
  color: #333;
}
</style>