<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import api from "@/services/api";

const route = useRoute();
const id = computed(() => route.params.id ?? "1");
const noticia = ref(null);

const formatarData = (data) => {
  const dataObj = new Date(data);
  dataObj.setMinutes(dataObj.getMinutes() + dataObj.getTimezoneOffset());
  return dataObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const imagemNoticia = computed(() => {
  const path = noticia.value?.banner_path;
  if (!path) return "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=1200&q=80";
  return `http://localhost:3000/${String(path).replace(/\\/g, "/")}`;
});

onMounted(async () => {
  try {
    const res = await api.get(`/api/noticias/${id.value}`);
    noticia.value = res.data;
  } catch {
    noticia.value = {
      categoria: "Institucional",
      titulo: "Notícia não encontrada",
      subtitulo: "Desculpe, não conseguimos carregar o conteúdo solicitado.",
      descricao: "",
      criado_em: new Date().toISOString(),
    };
  }
});
</script>

<template>
  <main class="article-container">
    <header class="article-header">
      <span class="article-category">{{ noticia?.categoria || "Institucional" }}</span>
      <h1 class="article-title">{{ noticia?.titulo || `Notícia ${id}` }}</h1>
      <h2 class="article-subtitle">{{ noticia?.subtitulo || "..." }}</h2>
      <div class="article-meta">Publicado em {{ formatarData(noticia?.criado_em || new Date()) }}</div>
    </header>

    <div class="article-banner" :style="{ backgroundImage: `url('${imagemNoticia}')` }"></div>

    <article class="article-body">
      <p v-for="(paragrafo, index) in String(noticia?.descricao || '').split('\n').filter(Boolean)" :key="index">
        {{ paragrafo }}
      </p>
    </article>

    <div class="article-footer">
      <router-link to="/noticias" class="btn-voltar">← Voltar para Notícias</router-link>
    </div>
  </main>
</template>

<style scoped>
.article-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
}

.article-header {
  text-align: center;
  margin-bottom: 30px;
}

.article-category {
  display: inline-block;
  background: var(--azul-uepa);
  color: white;
  border-radius: 20px;
  padding: 6px 14px;
}

.article-title {
  font-size: 2rem;
  margin: 16px 0 8px;
}

.article-subtitle {
  color: #555;
  font-weight: 400;
}

.article-meta {
  margin-top: 20px;
  border-top: 1px solid var(--borda);
  border-bottom: 1px solid var(--borda);
  padding: 10px;
}

.article-banner {
  height: 360px;
  border-radius: 10px;
  margin-bottom: 30px;
  background: linear-gradient(rgba(46, 48, 146, 0.25), rgba(46, 48, 146, 0.25)),
    url("@/assets/img/Uepa-Banner.jpg");
  background-size: cover;
  background-position: center;
}

.article-body {
  max-width: 760px;
  margin: 0 auto;
  line-height: 1.8;
}

.article-footer {
  text-align: center;
  margin-top: 40px;
}

.btn-voltar {
  display: inline-block;
  border: 2px solid var(--azul-uepa);
  color: var(--azul-uepa);
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: bold;
}
</style>
