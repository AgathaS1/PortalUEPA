<script setup>
import { computed, onMounted, ref } from "vue";
import api from "@/services/api";

const todasAsNoticias = ref([]);
const noticiasExibidas = ref(1);
const QUANTIDADE_POR_VEZ = 4;

const hero = computed(() => (todasAsNoticias.value.length ? todasAsNoticias.value[0] : null));
const cardsNoticias = computed(() => todasAsNoticias.value.slice(1, noticiasExibidas.value));

const formatarData = (data) => {
  const dataObj = new Date(data);
  dataObj.setMinutes(dataObj.getMinutes() + dataObj.getTimezoneOffset());
  return dataObj.toLocaleDateString("pt-BR");
};

const imagemNoticia = (path) =>
  path
    ? `http://localhost:3000/${String(path).replace(/\\/g, "/")}`
    : "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80";

const carregarMaisNoticias = () => {
  noticiasExibidas.value = Math.min(todasAsNoticias.value.length, noticiasExibidas.value + QUANTIDADE_POR_VEZ);
};

onMounted(async () => {
  try {
    const res = await api.get("/noticias");
    todasAsNoticias.value = res.data || [];
    noticiasExibidas.value = Math.min(todasAsNoticias.value.length, 1 + QUANTIDADE_POR_VEZ);
  } catch (error) {
    console.error("Erro ao carregar notícias:", error);
  }
});
</script>

<template>
  <main class="main-content">
    <div class="categorias-menu">
      <button class="cat-pill ativo">Todas</button>
      <button class="cat-pill">Institucional</button>
      <button class="cat-pill">Tecnologias</button>
      <button class="cat-pill">Conexão</button>
    </div>

    <article class="hero-noticia" v-if="hero">
      <div class="hero-img" :style="{ backgroundImage: `url('${imagemNoticia(hero.banner_path)}')` }"></div>
      <div class="hero-body">
        <span class="badge-categoria">{{ hero.categoria || "Institucional" }}</span>
        <h1 class="hero-titulo">{{ hero.titulo }}</h1>
        <p class="hero-desc">{{ hero.descricao }}</p>
        <small class="hero-meta">Publicado em {{ formatarData(hero.criado_em) }}</small>
      </div>
    </article>

    <h2 class="section-title">Mais Notícias</h2>
    <section class="noticias-container">
      <article class="card-noticia" v-for="item in cardsNoticias" :key="item.id">
        <div class="card-img" :style="{ backgroundImage: `url('${imagemNoticia(item.banner_path)}')` }"></div>
        <div class="card-body">
          <p class="card-data">{{ item.categoria || "Institucional" }} | {{ formatarData(item.criado_em) }}</p>
          <h3 class="card-titulo">{{ item.titulo }}</h3>
          <p class="card-desc">{{ item.descricao }}</p>
          <router-link class="btn-ler-noticia" :to="`/noticia/${item.id}`">Ler Notícia</router-link>
        </div>
      </article>
    </section>
    <button class="btn-ler-noticia btn-carregar" v-if="noticiasExibidas < todasAsNoticias.length" @click="carregarMaisNoticias">
      Carregar mais notícias
    </button>
  </main>
</template>

<style scoped>
.main-content {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.categorias-menu {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 30px;
}

.cat-pill {
  border: 1px solid var(--borda);
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
}

.ativo {
  background: var(--azul-uepa);
  color: white;
}

.hero-noticia {
  display: flex;
  background: var(--branco);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 35px;
}

.hero-img {
  flex: 1;
  min-height: 260px;
  background: linear-gradient(rgba(46, 48, 146, 0.35), rgba(46, 48, 146, 0.35)),
    url("@/assets/img/Uepa-Banner.jpg");
  background-size: cover;
  background-position: center;
}

.hero-body {
  flex: 1;
  padding: 24px;
}

.badge-categoria {
  display: inline-block;
  background: var(--azul-uepa);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 10px;
}

.section-title {
  border-left: 5px solid var(--azul-uepa);
  padding-left: 12px;
  color: var(--azul-uepa);
  margin-bottom: 18px;
}

.noticias-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.card-noticia {
  background: var(--branco);
  border-radius: 10px;
  overflow: hidden;
}

.card-img {
  height: 130px;
  background: linear-gradient(rgba(46, 48, 146, 0.2), rgba(46, 48, 146, 0.2)),
    url("@/assets/img/Uepa-Banner.jpg");
  background-size: cover;
}

.card-body {
  padding: 14px;
}

.btn-ler-noticia {
  display: block;
  text-align: center;
  background: var(--azul-uepa);
  color: white;
  border-radius: 4px;
  padding: 10px;
}

.btn-carregar {
  margin: 20px auto 0;
  width: max-content;
  padding: 10px 18px;
}
</style>
