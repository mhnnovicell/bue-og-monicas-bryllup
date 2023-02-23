<template>
  <!-- Modal toggle -->

  <!-- Main modal -->
  <div
    id="staticModal"
    data-modal-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    class="modal w-full h-full top-0 left-0 flex items-center justify-center overflow-visible"
  >
    <div
      class="modal-container w-full h-full overflow-y-auto p-5 my-5 overflow-visible"
    >
      <!-- Modal content -->
      <div
        class="modal-content container mx-auto h-auto text-left md:p-4 p-2 bg-white rounded-md"
      >
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ story.content.body[0].headline }}
          </h3>
          <!-- <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="staticModal"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button> -->
        </div>
        <!-- Modal body -->
        <div
          class="p-4 space-y-6 modal-content container mx-auto h-auto text-left z-50"
        >
          <!-- Form element -->
          <form @submit.prevent="submitForm" action="#" class="z-50">
            <label class="block font-normal my-2" for="firstName">
              {{ story.content.body[0].firstNameLabel }}
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 mb-3"
              id="firstName"
              type="text"
              v-model.trim="v$.firstName.$model"
              @blur="v$.firstName.$touch"
              :class="
                v$.firstName.$error
                  ? 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50  '
                  : ''
              "
              placeholder="Indtast fornavn"
            />

            <div
              v-if="v$.firstName.$error"
              class="text-red-500 font-normal"
              v-for="error of v$.firstName.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>

            <label class="block font-normal my-2" for="lastName">
              {{ story.content.body[0].lastNameLabel }}
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 mb-3"
              id="lastName"
              type="text"
              v-model.trim="v$.lastName.$model"
              @blur="v$.lastName.$touch"
              :class="
                v$.lastName.$error
                  ? 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50  '
                  : ''
              "
              placeholder="Indtast efternavn"
            />

            <div
              v-if="v$.lastName.$error"
              class="text-red-500 font-normal"
              v-for="error of v$.lastName.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>

            <label class="block font-normal my-2" for="email">
              {{ story.content.body[0].emailLabel }}
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 mb-3"
              id="email"
              type="email"
              v-model.trim="v$.email.$model"
              @blur="v$.email.$touch"
              :class="
                v$.email.$error
                  ? 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50  '
                  : ''
              "
              placeholder="Indtast email"
            />

            <div
              v-if="v$.email.$error"
              class="text-red-500 font-normal"
              v-for="error of v$.email.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>

            <div v-if="!v$.email.email" class="text-red-500 font-normal">
              Invalid {{ story.content.body[0].emailLabel }} format
            </div>

            <div class="flex flex-col">
              <label class="block font-normal my-2" for="search-dropdown">
                Musikønsker
              </label>
              <div class="relative w-full mb-3">
                <input
                  v-model="query"
                  class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded"
                  type="search"
                  placeholder="Søg efter sang"
                  @keyup.enter.prevent="asyncFind()"
                  @keyup="asyncFind()"
                />

                <a
                  @click="asyncFind()"
                  @touchend="asyncFind()"
                  class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-indigo-400 rounded-r-lg border border-indigo-400 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-600"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span class="sr-only">Musikønsker</span>
                </a>
              </div>
            </div>

            <Transition name="fade">
              <div
                v-if="query !== '' && songs.length >= 1"
                id="dropdown"
                class="z-10 bg-indigo-400 divide-y divide-black rounded-lg shadow md:w-1/2 w-full"
              >
                <ul
                  class="py-2 text-sm text-white"
                  aria-labelledby="dropdown-button"
                >
                  <li
                    v-for="value in songs"
                    @click="selectedArtists.push(value)"
                  >
                    <button
                      type="button"
                      class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-indigo-600 dark:hover:text-white text-left"
                    >
                      <span>
                        {{ value.artists[0].name }} - {{ value.name }}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </Transition>

            <transition-group name="fade">
              <span
                v-for="selectedArtist in selectedArtists"
                v-if="selectedArtists"
                id="badge-dismiss-default"
                class="inline-flex items-center justify-between md:justify-center px-2 py-1 md:mr-2 text-sm font-medium text-white bg-indigo-400 rounded my-4 w-full md:w-1/4"
              >
                <span
                  v-if="selectedArtist.artists[0].name"
                  class="px-1 flex items-center md:w-1/2"
                  >{{ selectedArtist.artists[0].name }}
                </span>
                <span class="mx-1 px-1 flex items-center md:w-auto"> - </span>

                <span class="px-1 flex items-center md:w-1/2">
                  {{ selectedArtist.name }}
                </span>
                <button
                  type="button"
                  class="inline-flex items-center justify-end p-0.5 ml-2 text-sm text-white bg-transparent rounded-sm hover:bg-indigo-400 hover:text-white w-1/4"
                  data-dismiss-target="#badge-dismiss-default"
                  aria-label="Remove"
                  @click="removeArtist(selectedArtist)"
                  @touchend="removeArtist(selectedArtist)"
                >
                  <svg
                    aria-hidden="true"
                    class="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only"> {{ selectedArtist.title }} </span>
                </button>
              </span>
            </transition-group>

            <label for="message" class="block font-normal my-2"
              >Madallergener</label
            >
            <textarea
              id="message"
              rows="4"
              class="appearance-none border rounded w-full py-2 px-3 mb-3"
              placeholder="Beskriv dine madallergener"
              v-model.trim="v$.foodAllergiesDesc.$model"
              @blur="v$.foodAllergiesDesc.$touch"
              :class="
                v$.foodAllergiesDesc.$error
                  ? 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50  '
                  : ''
              "
            ></textarea>

            <div
              v-if="v$.foodAllergiesDesc.$error"
              class="text-red-500 font-normal font-normal"
              v-for="error of v$.foodAllergiesDesc.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </div>

            <button
              type="submit"
              class="bg-indigo-400 hover:bg-indigo-700 text-white font-normal py-2 px-4 rounded my-4"
              :disabled="!v$.$invalid && loading"
              @click="submitForm"
            >
              Bekræft
            </button>
          </form>
        </div>
        <!-- Modal footer -->
        <!-- <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            data-modal-hide="staticModal"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            I accept
          </button>
          <button
            data-modal-hide="staticModal"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Decline
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { useStoryblok } from '@storyblok/vue';
import { onMounted, reactive, ref } from 'vue';
import { supabase } from '../supabase';

const { value: story } = await useStoryblok('home', { version: 'draft' });
const { blok } = defineProps({ blok: Object });

const loading = ref(false);

const selectedArtists = ref([] as any[]);
const songs = ref([] as any[]);
const isLoading = ref(false);

const query = ref('');

const token = ref(null);

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  foodAllergiesDesc: '',
});

const rules = {
  firstName: {
    required: helpers.withMessage('Fornavn må ikke være tomt', required),
    minLength: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Fornavn skal minimum være ${$params.min} karakter langt`,
      minLength(2)
    ),
  },
  lastName: {
    required: helpers.withMessage('Efternavn må ikke være tomt', required),
    minLength: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Efternavn skal minimum være ${$params.min} karakter langt`,
      minLength(2)
    ),
  },
  email: {
    required: helpers.withMessage('Email må ikke være tomt', required),
    email: helpers.withMessage('Email er ikke korrekt format', email),
  },
  foodAllergiesDesc: {
    minLength: helpers.withMessage(
      ({ $pending, $invalid, $params, $model }) =>
        `Madallergener skal minimum være ${$params.min} karakter langt`,
      minLength(2)
    ),
  },
};

const v$ = ref(useVuelidate(rules, form));

onMounted(async () => {});

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    // notify user form is invalid
    return;
  }

  try {
    loading.value = true;

    await supabase.from('formular').insert(form.value);

    alert('Check your email for the login link!');
  } catch (error: any) {
    alert(error.message);
  } finally {
    loading.value = false;

    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      foodAllergiesDesc: '',
    };

    v$.value.$reset();
  }
};

const getToken = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const auth = btoa(`${clientId}:${clientSecret}`);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (response.ok) {
    const data = await response.json();
    token.value = data.access_token;
  } else {
    alert(response.statusText);
  }
};

const asyncFind = async () => {
  // try {
  //   isLoading.value = true;

  //   //Lastfm api

  //   const response = await fetch(
  //     `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query.value}&api_key=15f22b0f2e973cd37561b1d521edeff6&format=json&limit=5`,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept-Language': 'da-DK',
  //       },
  //     }
  //   );

  //   const data = await response.json();
  //   console.log(data, 'data');
  //   songs.value = data.results.trackmatches.track;

  //   isLoading.value = false;
  // } catch (error) {
  //   console.error(error);
  // }

  const url = new URL('https://api.spotify.com/v1/search');
  url.searchParams.append('q', query.value);
  url.searchParams.append('type', 'track');
  url.searchParams.append('limit', '5');

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    songs.value = data.tracks.items;
    isLoading.value = false;
  } else {
    console.error(response.statusText);
  }
};

await getToken();

const clearAll = () => {
  selectedArtists.value = [] as any[];
};

const removeArtist = (index: any) => {
  const selectedIndex = selectedArtists.value.indexOf(index);

  selectedArtists.value.splice(selectedIndex, 1);
};
</script>
