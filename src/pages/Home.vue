<script setup>
import { RouterLink } from 'vue-router';

import { useStoryblok } from '@storyblok/vue';
const story = await useStoryblok('home', { version: 'draft' });
</script>

<template>
  <header>
    <div class="wrapper">
      <nav
        class="bg-indigo-400 px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 left-0"
      >
        <div
          class="container flex flex-wrap items-center justify-between mx-auto"
        >
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul
              class="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
            >
              <li>
                <RouterLink
                  to="/"
                  class="block py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0"
                  >Home</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  class="block py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0"
                  to="/"
                  >About</RouterLink
                >
              </li>
            </ul>
          </div>
        </div>
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
