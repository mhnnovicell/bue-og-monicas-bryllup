<template>
  <div class="flex flex-col text-center w-full md:mb-20" data-aos="fade">
    <h1 class="headline mb-4 text-7xl italic text-white">Kontakt</h1>
    <p class="lg:w-2/3 mx-auto leading-relaxed text-base font-light text-white">
      Her skal stå noget uddybende tekst
    </p>
  </div>
  <div
    class="flex justify-center items-center w-full my-16 flex-col sm:flex-row"
  >
    <div
      class="flex sm:w-1/2 w-full justify-center items-center order-1 my-10 sm:mt-0 lg:p-4"
      data-aos="fade"
    >
      <MapboxMap
        access-token="pk.eyJ1IjoiYnVzc2VtYW5kMTYiLCJhIjoiY2xkcHVjNXB2MTc1YTNudDZxaWx3MGhwaiJ9.idcVLIs4EH3nP1iEdvjiig"
        style="height: 60vh; width: 100vw"
        map-style="mapbox://styles/mapbox/light-v11"
        :center="[10.207187, 56.149869]"
        :zoom="16"
        ref="mapboxMap"
        :scrollZoom="false"
        :interactive="false"
      >
        <MapboxNavigationControl position="bottom-right" :showCompass="false" />

        <MapboxMarker :lng-lat="[10.207187, 56.149869]" popup color="#a78bfa">
          <template v-slot:popup>
            <p>Centralværkstedet</p>
            <p>{{ props.blok?.addressText }}</p>
          </template>
        </MapboxMarker>
      </MapboxMap>
    </div>
    <div
      class="flex sm:w-1/2 w-full justify-center items-center order-2 flex-col"
    >
      <div
        class="flex flex-col mb-10 items-center w-full justify-center"
        data-aos="fade"
      >
        <div
          class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-white text-violet-400 mb-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </div>
        <a
          class="font-light text-white max-w-sm underline"
          href="https://www.google.com/maps/place/Centralv%C3%A6rkstedet/@56.1499658,10.2050161,17z/data=!3m1!4b1!4m6!3m5!1s0x464c3f8e4785a45f:0x75b22231bd1930ac!8m2!3d56.1499628!4d10.2072048!16s%2Fg%2F12dpwy275"
          target="_blank"
        >
          {{ props.blok?.addressText }}
        </a>
      </div>
      <div
        class="flex flex-col mb-10 items-center w-full justify-center"
        data-aos="fade"
      >
        <div
          class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-white text-violet-400 mb-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        </div>
        <p class="leading-relaxed text-base font-light text-white max-w-sm">
          {{
            new Date(props.blok?.datoText).toLocaleDateString('da-DK', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </p>
      </div>
      <div
        class="flex flex-col mb-10 items-center w-full justify-center"
        data-aos="fade"
      >
        <div
          class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-white text-violet-400 mb-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            />
          </svg>
        </div>
        <a
          class="leading-relaxed text-base font-light text-white max-w-sm underline"
          :href="'tel:' + props.blok?.phoneText"
        >
          {{ props.blok?.phoneText }}
        </a>
      </div>
      <div
        class="flex flex-col mb-10 items-center w-full justify-center"
        data-aos="fade"
      >
        <div
          class="w-12 h-12 inline-flex items-center justify-center rounded-full bg-white text-violet-400 fill-violet-400 mb-5"
        >
          <svg
            class="w-6 h-6"
            viewBox="0 -11.47 122.88 122.88"
            version="1.1"
            id="Layer_1"
            stroke-width="1.5"
            stroke="currentColor"
            xml:space="preserve"
          >
            <g>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.22,67.36h114.31v-4.67c0-1.13-0.22-2.18-0.61-3.12c-0.42-1-1.04-1.89-1.81-2.66c-0.47-0.47-1-0.9-1.57-1.28 c-0.58-0.39-1.2-0.73-1.85-1.02c-1.75-0.38-3.49-0.74-5.22-1.08c-1.74-0.34-3.49-0.66-5.25-0.96c-0.08-0.01-0.14-0.02-0.22-0.04 c-0.89-0.15-1.74-0.29-2.55-0.42c-0.81-0.13-1.67-0.26-2.57-0.4l-0.02,0c-6.12-0.78-12.22-1.38-18.31-1.78 c-6.1-0.4-12.17-0.6-18.2-0.61c-3.58,0-7.15,0.06-10.72,0.2c-3.55,0.14-7.12,0.34-10.69,0.62l-0.02,0 c-3.34,0.31-6.67,0.7-10.01,1.15c-3.33,0.45-6.67,0.98-10.03,1.57l-0.37,0.09c-0.07,0.02-0.14,0.03-0.2,0.03 c-0.06,0.01-0.12,0.01-0.18,0.01c-1.57,0.28-3.18,0.59-4.84,0.92c-1.61,0.32-3.22,0.66-4.82,1.01c-0.4,0.22-0.78,0.47-1.14,0.73 c-0.36,0.27-0.71,0.56-1.02,0.87v0c-0.67,0.67-1.2,1.44-1.56,2.3c-0.34,0.81-0.53,1.71-0.53,2.69V67.36L4.22,67.36z M14.2,0h92.99 c1.21,0,2.37,0.24,3.43,0.68c1.1,0.46,2.09,1.13,2.92,1.95c0.83,0.83,1.5,1.82,1.95,2.92c0.44,1.06,0.68,2.22,0.68,3.43v42.69 c0.51,0.3,1.01,0.63,1.47,0.99c0.52,0.4,1.01,0.82,1.46,1.27c1.16,1.16,2.1,2.51,2.73,4.03c0.6,1.43,0.93,3.02,0.93,4.74v6.09 c0.03,0.1,0.06,0.2,0.08,0.3l0,0.02c0.02,0.13,0.03,0.25,0.03,0.37c0,0.13-0.01,0.26-0.04,0.39l0,0c-0.02,0.1-0.05,0.2-0.08,0.3 v27.66c0,0.58-0.24,1.11-0.62,1.49c-0.38,0.38-0.91,0.62-1.49,0.62h-4.35c-0.49,0-0.94-0.17-1.3-0.45 c-0.36-0.28-0.63-0.68-0.74-1.14c-0.8-2.3-1.61-4.12-2.48-5.54c-0.86-1.4-1.78-2.4-2.84-3.11c-1.07-0.71-2.35-1.16-3.9-1.43 c-1.58-0.28-3.42-0.37-5.61-0.36l-79.76,0.1l-0.04,0c-1.57-0.03-2.86,0.17-3.94,0.59c-1.07,0.42-1.94,1.05-2.66,1.86 c-0.81,0.9-1.49,2.05-2.11,3.39c-0.63,1.37-1.2,2.93-1.77,4.64l0,0c-0.14,0.44-0.42,0.79-0.77,1.04c-0.33,0.24-0.73,0.38-1.14,0.4 c-0.03,0.01-0.06,0.01-0.09,0.01H2.11c-0.58,0-1.11-0.24-1.49-0.62C0.24,98.94,0,98.41,0,97.83V61.52c0-1.57,0.3-3.01,0.84-4.31 c0.58-1.38,1.43-2.61,2.49-3.67c0.3-0.3,0.63-0.6,0.98-0.88c0.3-0.24,0.6-0.47,0.92-0.68V8.89c0-1.21,0.24-2.36,0.68-3.4 c0.46-1.09,1.13-2.07,1.96-2.89c0.83-0.82,1.82-1.47,2.91-1.92C11.84,0.24,12.99,0,14.2,0L14.2,0z M107.19,4.22H14.2 c-0.65,0-1.27,0.13-1.84,0.36c-0.59,0.24-1.11,0.59-1.55,1.02c-0.43,0.42-0.78,0.94-1.02,1.5C9.57,7.65,9.45,8.25,9.45,8.89v41.06 c0.3-0.1,0.6-0.18,0.91-0.26c0.49-0.13,0.98-0.24,1.47-0.32c0.68-0.12,1.42-0.25,2.22-0.39c0.6-0.1,1.24-0.21,1.9-0.31V38.19 c0-1.58,0.32-3.09,0.89-4.47c0.6-1.44,1.47-2.73,2.55-3.81c1.08-1.08,2.37-1.95,3.81-2.55c1.38-0.57,2.89-0.89,4.47-0.89h19.82 c1.58,0,3.09,0.32,4.47,0.89c1.44,0.6,2.73,1.47,3.81,2.55c1.08,1.08,1.95,2.37,2.55,3.81c0.57,1.38,0.89,2.89,0.89,4.47v6.69 c0.7-0.01,1.4-0.01,2.11-0.01v-6.68c0-1.58,0.32-3.09,0.89-4.47c0.6-1.44,1.47-2.73,2.55-3.81c1.08-1.08,2.37-1.95,3.81-2.55 c1.38-0.57,2.89-0.89,4.47-0.89h19.82c1.58,0,3.09,0.32,4.47,0.89c1.44,0.6,2.73,1.47,3.81,2.55c1.08,1.08,1.95,2.37,2.55,3.81 c0.57,1.38,0.89,2.89,0.89,4.47v10.34c0.75,0.11,1.55,0.24,2.41,0.38c0.95,0.15,1.86,0.3,2.74,0.45c0.45,0.08,0.91,0.17,1.37,0.28 c0.29,0.07,0.57,0.14,0.84,0.22V8.98c0-0.64-0.13-1.25-0.36-1.81c-0.24-0.58-0.6-1.1-1.04-1.55c-0.44-0.44-0.97-0.8-1.54-1.04 C108.44,4.35,107.83,4.22,107.19,4.22L107.19,4.22z M43.21,45.56c2.01-0.15,4.03-0.28,6.08-0.38c1.89-0.1,3.8-0.17,5.71-0.22v-6.77 c0-1.01-0.2-1.98-0.57-2.86c-0.38-0.92-0.94-1.74-1.64-2.44c-0.69-0.69-1.52-1.25-2.44-1.64c-0.88-0.37-1.85-0.57-2.86-0.57H27.67 c-1.01,0-1.98,0.2-2.86,0.57c-0.92,0.38-1.74,0.94-2.44,1.64c-0.69,0.69-1.25,1.52-1.64,2.44c-0.37,0.88-0.57,1.85-0.57,2.86V48 c1.62-0.24,3.26-0.46,4.94-0.68c1.81-0.23,3.61-0.44,5.39-0.64c0.69-0.08,1.43-0.17,2.2-0.25c0.72-0.08,1.47-0.15,2.27-0.23 c1.36-0.13,2.71-0.25,4.04-0.36C40.37,45.75,41.77,45.65,43.21,45.56L43.21,45.56z M65.54,44.9c1.21,0.02,2.42,0.05,3.63,0.09 c1.34,0.04,2.68,0.1,4.01,0.16l0.01,0c2.19,0.08,4.33,0.18,6.41,0.3c2.08,0.12,4.11,0.27,6.05,0.44c2.82,0.25,5.55,0.55,8.14,0.9 c2.32,0.32,4.52,0.68,6.58,1.08v-9.68c0-1.01-0.2-1.98-0.57-2.86c-0.38-0.92-0.94-1.74-1.64-2.44c-0.69-0.69-1.52-1.25-2.44-1.64 c-0.88-0.37-1.85-0.57-2.86-0.57H73.05c-1.01,0-1.98,0.2-2.86,0.57c-0.92,0.38-1.74,0.94-2.44,1.64c-0.69,0.69-1.25,1.52-1.64,2.44 c-0.37,0.88-0.57,1.85-0.57,2.86V44.9L65.54,44.9z M118.54,71.59H4.22v24.13h1.43c0.56-1.58,1.14-3.05,1.79-4.36 c0.7-1.4,1.49-2.64,2.45-3.71c1.14-1.28,2.48-2.27,4.09-2.93c1.61-0.65,3.49-0.98,5.75-0.93l79.69-0.1c2.57,0,4.77,0.12,6.69,0.49 c1.95,0.37,3.63,1,5.14,2c1.4,0.93,2.6,2.16,3.68,3.77c1.03,1.54,1.95,3.43,2.83,5.76h0.76V71.59L118.54,71.59z"
              />
            </g>
          </svg>
        </div>
        <p class="leading-relaxed text-base font-light text-white max-w-xs">
          {{ props.blok?.sleepText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  MapboxMap,
  MapboxMarker,
  MapboxNavigationControl,
} from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { computed, ref } from 'vue';
const props = defineProps({ blok: Object });

const mapboxMap = ref();

const map = computed(() => mapboxMap.value.map);
</script>

<style>
.mapboxgl-popup-close-button {
  font-size: 30px;
}
</style>
