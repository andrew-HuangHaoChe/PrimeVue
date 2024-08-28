<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="header flex align-items-center p-2">
      <h1 class="">PlayGround</h1>
      <img style="width: 30px;" src="@/assets/logo.svg" alt="">
    </div>
  </header>
  <div class="main">
    <RouterView />
  </div>

  <footer>

  </footer>
</template>

