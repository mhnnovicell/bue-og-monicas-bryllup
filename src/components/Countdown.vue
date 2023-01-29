<template>
  <section v-editable="blok" class="w-full h-full flex flex-col">
    <h1
      class="w-full text-center flex justify-center self-center items-center mt-16 align-middle text-7xl italic text-white headline"
    >
      {{ props.blok?.headline }}
    </h1>
    <div
      v-if="!showCountdown"
      class="flex w-full h-1/2 justify-center self-center items-center text-center mt-16 p-4 md:p-0 countdown-container"
    >
      <div class="m-4 text-white" v-if="days >= 1">
        <span class="text-4xl">{{ days }}</span>
        <p class="text-xl font-light">{{ days === 1 ? 'dag' : 'dage' }}</p>
      </div>

      <div class="m-4 text-4xl text-white" v-if="hours >= 1">
        <span class="text-4xl">{{ hours }}</span>
        <p class="text-xl font-light">
          {{ hours === 1 ? 'time' : 'timer' }}
        </p>
      </div>

      <div class="m-4 text-4xl text-white" v-if="minutes >= 1">
        <span class="text-4xl">{{ minutes }}</span>
        <p class="text-xl font-light">
          {{ minutes === 1 ? 'minut' : 'minutter' }}
        </p>
      </div>

      <div class="m-4 text-4xl text-white">
        <span class="text-4xl">{{ seconds }}</span>
        <p class="text-xl font-light">
          {{ seconds === 1 ? 'sekund' : 'sekunder' }}
        </p>
      </div>
    </div>

    <div
      v-else
      class="flex w-full h-full justify-center self-center items-center text-center"
    >
      <h2
        class="countdown-container font-bold text-white blink_me uppercase text-6xl"
      >
        {{ blok?.birthdayText }}
      </h2>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { computed } from '@vue/reactivity';

const props = defineProps({ blok: Object });

const now = ref(new Date().getTime());

const seconds = ref(0);
const minutes = ref(0);
const hours = ref(0);
const days = ref(0);

const countDownDate = new Date(props.blok?.dateToWedding).getTime();

const hasEnded = countDownDate - now.value;

const hasEndedBool = ref(false);

const getTimeRemaining = () => {
  const total =
    Date.parse(props.blok?.dateToWedding.toString()) -
    Date.parse(new Date().toString());
  seconds.value = Math.floor((total / 1000) % 60);
  minutes.value = Math.floor((total / 1000 / 60) % 60);
  hours.value = Math.floor((total / (1000 * 60 * 60)) % 24);
  days.value = Math.floor(total / (1000 * 60 * 60 * 24));

  if (hasEnded < 0) {
    hasEndedBool.value = true;
  } else {
    hasEndedBool.value = false;
  }
};

const startTimer = () => {
  getTimeRemaining();

  setInterval(() => {
    getTimeRemaining();
  }, 1000);
};

onMounted(() => {
  startTimer();
});

const showCountdown = computed(() => {
  return hasEndedBool.value;
});
</script>

<style scoped>
.blink_me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
