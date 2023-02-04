<template>
  <div
    class="flex justify-center items-center w-full my-16 flex-col sm:flex-row"
  >
    <div
      class="flex sm:w-1/2 w-full justify-center items-center order-2 sm:order-1 mt-10 sm:mt-0"
    >
      <div class="max-w-md rounded-lg shadow-md">
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-5xl text-white">
              {{ props.blok?.headline }}
            </h5>
          </a>
          <p class="my-3 mb-5 font-normal text-white">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Read more
            <svg
              aria-hidden="true"
              class="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div
      class="flex sm:w-1/2 w-full justify-center items-center order-1 sm:order-2"
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
