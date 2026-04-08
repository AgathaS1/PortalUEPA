<template>
  <div class="input-grupo">
    <label :for="id"> {{ label }} </label>

    <div class="input-wrapper">
      <input :id="id" :type="type" :placeholder="placeholder" v-model="model" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  id: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
});

const model = defineModel();
</script>
<style scoped>
.input-grupo {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: bold;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: var(--azul-uepa);
  box-shadow: 0 0 5px rgba(46, 48, 146, 0.3);
}
</style>
