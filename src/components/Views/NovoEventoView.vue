<script setup>
import { ref } from "vue";
import LogoUepa from "../LogoUepa.vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

const form = ref({
  titulo: "",
  data: "",
  inicio: "",
  termino: "",
  local: "",
  categoria: "",
  descricao: "",
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
    payload.append("data", form.value.data);
    payload.append("hora-inicio", form.value.inicio);
    payload.append("hora-termino", form.value.termino);
    payload.append("local", form.value.local);
    payload.append("categoria", form.value.categoria);
    payload.append("descricao", form.value.descricao);
    if (foto.value) payload.append("foto", foto.value);

    await api.post("/cadastrar-evento", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    window.alert("Evento cadastrado com sucesso!");
    router.push("/");
  } catch (error) {
    window.alert(error?.response?.data?.erro || "Erro ao cadastrar evento.");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <main class="page-wrapper">
    <div class="container">
      <LogoUepa style="text-align: center; color: var(--azul-uepa)" />
      <h2>Novo Evento</h2>

      <form @submit.prevent="submit">
        <label>Título do Evento</label>
        <input v-model="form.titulo" type="text" placeholder="Digite o título do evento" />

        <div class="linha-data">
          <div class="campo">
            <label>Data</label>
            <input v-model="form.data" type="date" />
          </div>
          <div class="campo">
            <label>Hora Início</label>
            <input v-model="form.inicio" type="time" />
          </div>
          <div class="campo">
            <label>Hora Término</label>
            <input v-model="form.termino" type="time" />
          </div>
        </div>

        <label>Local</label>
        <input v-model="form.local" type="text" placeholder="Digite o local do evento" />

        <label>Categoria</label>
        <select v-model="form.categoria">
          <option value="">Todas as Categorias</option>
          <option>Palestra</option>
          <option>Workshop</option>
          <option>Seminário</option>
        </select>

        <label>Descrição</label>
        <textarea v-model="form.descricao" rows="4" placeholder="Descrição do evento" />

        <label>Banner do Evento</label>
        <input type="file" accept="image/*" @change="onFotoChange" />

        <button type="submit" :disabled="loading">
          {{ loading ? "SALVANDO..." : "Cadastrar Evento" }}
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

.linha-data {
  display: flex;
  gap: 12px;
}

.campo {
  flex: 1;
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
