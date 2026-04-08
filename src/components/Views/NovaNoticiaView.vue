<script setup>
import { ref } from "vue";
import LogoUepa from "../LogoUepa.vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

const form = ref({
  titulo: "",
  subtitulo: "",
  descricao: "",
  categoria: "",
});
const foto = ref(null);
const loading = ref(false);
const router = useRouter();

const onFotoChange = (event) => {
  foto.value = event.target.files?.[0] || null;
};

const submit = async () => {
  loading.value = true;
  try {
    const payload = new FormData();
    payload.append("titulo", form.value.titulo);
    payload.append("subtitulo", form.value.subtitulo);
    payload.append("descricao", form.value.descricao);
    payload.append("categoria", form.value.categoria);
    if (foto.value) payload.append("foto", foto.value);

    await api.post("/cadastrar-noticia", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    window.alert("Notícia publicada com sucesso!");
    router.push("/noticias");
  } catch (error) {
    window.alert(error?.response?.data?.erro || "Erro ao publicar notícia.");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="page-wrapper">
    <div class="container">
      <LogoUepa style="text-align: center; color: var(--azul-uepa)" />
      <h2>Nova Notícia</h2>

      <form @submit.prevent="submit">
        <label>Título da Notícia</label>
        <input v-model="form.titulo" type="text" placeholder="Digite o título da notícia" />

        <label>Sub-título</label>
        <input v-model="form.subtitulo" type="text" placeholder="Digite o subtítulo da notícia" />

        <label>Conteúdo</label>
        <textarea v-model="form.descricao" rows="5" placeholder="Escreva o texto da notícia" />

        <label>Categoria</label>
        <select v-model="form.categoria">
          <option value="">Todas as Categorias</option>
          <option>Institucional</option>
          <option>Sociedade</option>
          <option>Conexão</option>
          <option>Saúde</option>
          <option>Tecnologias</option>
        </select>

        <label>Banner da Notícia</label>
        <input type="file" accept="image/*" @change="onFotoChange" />

        <button type="submit" :disabled="loading">
          {{ loading ? "PUBLICANDO..." : "Publicar Notícia" }}
        </button>
      </form>
    </div>
  </main>
</template>

<style scoped>
@import "../../assets/css/auth.css";

.container {
  max-width: 680px;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: vertical;
}
</style>
