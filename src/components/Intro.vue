<template>
  <div
    class="flex justify-center items-center w-full my-16 flex-col sm:flex-row"
  >
    <div
      class="flex sm:w-1/2 w-full justify-center items-center order-2 sm:order-1 mt-10 sm:mt-0"
      data-aos="fade"
    >
      <div class="max-w-md rounded-lg shadow-md">
        <div class="p-5">
          <h5 class="mb-2 text-5xl text-white italic">
            {{ props.blok?.headline }}
          </h5>
          <p class="my-3 mb-5 text-white text-base font-light">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex sm:w-1/2 w-full justify-center items-center order-1 sm:order-2"
      data-aos="fade"
    >
      <div class="max-w-sm object-contain rounded-lg">
        <img
          :src="props.blok?.image.filename"
          class="h-auto max-w-lg object-contain rounded-t-lg"
          loading="lazy"
          alt="Bue og Monica"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ blok: Object });
</script>
