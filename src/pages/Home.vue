<script setup>
import { RouterLink } from 'vue-router';

import { useStoryblok } from '@storyblok/vue';
const story = await useStoryblok('home', { version: 'draft' });
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/">About</RouterLink>
      </nav>
    </div>
  </header>
  <StoryblokComponent
    v-if="story"
    :blok="story.content"
    class="content p-4 md:p-8"
  />
</template>

<style scoped lang="scss">
.content {
  /* From https://css.glass */
  background: rgba(167, 139, 250, 0.78);
  border-radius: 16px;
  @apply shadow-lg;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(167, 139, 250, 0.3);
}
</style>
