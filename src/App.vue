<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <!-- main content -->
            <section class="body-font w-full h-full">
              <div
                class="container md:px-10 md:py-10 px-5 py-5 mx-auto w-full h-full"
                :class="route.name !== 'Login' ? 'mt-14' : ''"
              >
                <component :is="Component"></component>
              </div>
            </section>

            <!-- loading state -->
            <template #fallback>
              <div class="text-center h-screen w-screen">
                <div
                  role="status"
                  class="h-screen w-screen flex justify-center items-center"
                >
                  <Vue3Lottie
                    :animationData="loader"
                    :height="200"
                    :width="200"
                  />
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
import AOS from 'aos';
import { onMounted } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
import 'vue3-lottie/dist/style.css';
import loader from '../public/heart-loader.json';

const route = useRoute();

onMounted(() => {
  AOS.init({
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99,
    // the delay on throttle used while scrolling the page (advanced)
    delay: 200, // values from 0 to 3000, with step 50ms
    duration: 700, // values from 0 to 3000, with step 50ms
    easing: 'ease-in-out', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
  });
});
</script>
