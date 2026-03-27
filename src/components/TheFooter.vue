<script setup lang="ts">
import LogoUepa from './LogoUepa.vue';

</script>

<template>

<footer>
        <!-- Logo -->
        <LogoUepa style="color: var(--branco);"/>

         <!-- Informações de Contato -->
        <div class="contato-info">
            Rua do Una, 156 - Telégrafo, Belém - PA<br>
            E-mail: eventos@uepa.br | Telefone: (91) 3299-2200
        </div>

         <!-- Informações Menores -->
        <div class="textoMenor">
            © 2026 - Portal de Eventos Acadêmicos UEPA
        </div>

    </footer>

</template>

<style>

footer {
    background: hsl(var(--azul-uepa-h), var(--azul-uepa-s), 28%);
    color: var(--branco);
    padding: 40px 20px;
    text-align: center;
    margin-top: 50px;
}

.uepa-titulo {
    font-weight: bold; 
    font-size: 20px; 
    color: white;
}

.contato-info { 
    font-size: 0.85rem; 
    color: #ccc; 
    margin-top: 10px; 
}

.textoMenor { 
    margin-top: 30px; 
    font-size: 0.7rem; 
    color: #666;
}
</style>