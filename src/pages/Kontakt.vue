<template>
  <Navigation></Navigation>
  <StoryblokComponent
    v-if="story"
    :blok="story.content"
    class="content p-4 md:p-8"
  />
</template>

<script setup>
import Navigation from '../components/Navigation.vue';

import { useStoryblok } from '@storyblok/vue';
const story = await useStoryblok('kontakt', { version: 'draft' });
</script>
