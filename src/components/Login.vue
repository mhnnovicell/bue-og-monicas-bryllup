<template>
  <!-- Modal toggle -->

  <!-- Main modal -->
  <div
    v-if="route.name === 'Login'"
    id="staticModal"
    data-modal-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    class="modal w-full h-full top-0 left-0 flex items-center justify-center overflow-visible"
    data-aos="fade"
  >
    <div
      class="modal-container w-full h-full overflow-y-auto p-5 my-5 overflow-visible"
      v-if="!signupWasSuccessfull"
    >
      <!-- Modal content -->
      <div
        class="modal-content container mx-auto h-auto text-left md:p-4 p-2 bg-white rounded-md"
      >
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t">
          <h3 class="md:text-7xl text-4xl italic text-black">
            {{ story.content.body[0].headline }}
          </h3>
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
              class="appearance-none border rounded w-full py-2 px-3 mb-3 text-base font-light"
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
              class="appearance-none border rounded w-full py-2 px-3 mb-3 text-base font-light"
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
              class="appearance-none border rounded w-full py-2 px-3 mb-3 text-base font-light"
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

            <!-- <TransitionGroup name="fade" tag="div">
              <div v-if="!v$.email.email" class="text-red-500 font-normal">
                Invalid {{ story.content.body[0].emailLabel }} format
              </div>
            </TransitionGroup> -->

            <div class="flex flex-col">
              <label class="block font-normal my-2" for="search-dropdown">
                Musikønsker
              </label>
              <div class="relative w-full mb-3">
                <input
                  v-model="query"
                  class="block p-2.5 w-full z-20 text-sm text-black bg-white rounded-r-lg rounded font-light"
                  type="search"
                  placeholder="Søg efter sang"
                  @keyup.enter.prevent="asyncFind()"
                  @keyup="asyncFind()"
                  :disabled="selectedArtists.length === 2"
                />

                <a
                  :disabled="selectedArtists.length === 2"
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
                v-if="
                  query !== '' &&
                  songs.length >= 1 &&
                  selectedArtists.length < 2
                "
                id="dropdown"
                class="z-10 bg-indigo-400 divide-y divide-black rounded-lg shadow md:w-1/2 w-full"
              >
                <ul
                  class="py-2 text-sm text-white"
                  aria-labelledby="dropdown-button"
                >
                  <li v-for="value in songs" @click="addElement(songs, value)">
                    <button
                      type="button"
                      class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-indigo-600 dark:hover:text-white text-left font-light text-base"
                    >
                      <span>
                        {{ value.artists[0].name }} - {{ value.name }}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </Transition>

            <TransitionGroup name="fade" tag="div">
              <div v-if="selectedArtists.length >= 1">
                <p
                  class="text-3xl font-semibold text-red-500 my-4 underline"
                  v-if="selectedArtists.length === 2"
                >
                  Max 2 ønsker i alt!
                </p>
                <TransitionGroup
                  name="fade"
                  tag="div"
                  class="flex md:flex-row flex-col my-4"
                >
                  <div
                    class="max-w-sm bg-white border border-gray-200 rounded-lg shadow md:mr-4 my-4 md:my-0"
                    v-for="selectedArtist in selectedArtists"
                    :key="selectedArtist"
                  >
                    <img
                      class="rounded-t-lg"
                      :src="selectedArtist.album.images[0].url"
                      :alt="selectedArtist.name"
                      loading="lazy"
                    />
                    <div class="p-5">
                      <h4
                        v-if="selectedArtist.artists[0].name"
                        class="mb-2 text-3xl font-medium text-black"
                      >
                        {{ selectedArtist.artists[0].name }}
                      </h4>
                      <p class="mb-3 font-light text-base text-black">
                        {{ selectedArtist.name }}
                      </p>
                      <a
                        @click.prevent="
                          removeArtist(selectedArtists, selectedArtist)
                        "
                        class="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-400 rounded-lg hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-300"
                      >
                        Fjern
                      </a>
                    </div>
                  </div>
                </TransitionGroup>
              </div>
            </TransitionGroup>

            <label for="message" class="block font-normal my-2"
              >Madallergener</label
            >
            <textarea
              id="message"
              rows="4"
              class="appearance-none border rounded w-full py-2 px-3 mb-3 text-base font-light"
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
            <div class="flex">
              <span
                v-if="!secondPersonIsActive"
                class="mr-3 text-base text-black font-normal"
                >Tilføj ekstra person</span
              >
              <span v-else class="mr-3 text-base font-normal text-black"
                >Fjern ekstra person</span
              >
              <label
                class="relative inline-flex items-center mb-4 cursor-pointer"
              >
                <input
                  type="checkbox"
                  class="sr-only peer"
                  v-model="secondPersonIsActive"
                  id="large-toggle"
                />
                <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-400"
                ></div>
              </label>
            </div>

            <TransitionGroup
              name="fade"
              tag="div"
              class="flex md:flex-row flex-col my-4"
            >
              <div v-if="secondPersonIsActive" class="flex flex-col w-full">
                <label
                  class="block font-normal my-2"
                  for="firstNameSecondPerson"
                >
                  <!-- {{ story.content.body[0].firstNameLabel }} -->
                  Fornavn
                </label>
                <input
                  class="appearance-none border rounded w-full py-2 px-3 mb-3 text-base font-light"
                  id="firstNameSecondPerson"
                  type="text"
                  placeholder="Indtast fornavn"
                  v-model="form.firstNameSecondPerson"
                />
                <label
                  class="block font-normal my-2"
                  for="lastNameSecondPerson"
                >
                  <!-- {{ story.content.body[0].firstNameLabel }} -->
                  Efternavn
                </label>
                <input
                  class="appearance-none border rounded w-full py-2 px-3 mb-3 text-base font-light"
                  id="lastNameSecondPerson"
                  type="text"
                  placeholder="Indtast efternavn"
                  v-model="form.lastNameSecondPerson"
                />
                <label
                  for="foodAllergiesDescSecondPerson"
                  class="block font-normal my-2"
                  >Madallergener</label
                >
                <textarea
                  id="foodAllergiesDescSecondPerson"
                  rows="4"
                  class="appearance-none border rounded w-full py-2 px-3 mb-3 text-base font-light"
                  placeholder="Beskriv dine madallergener"
                  v-model="form.foodAllergiesDescSecondPerson"
                ></textarea>
              </div>
            </TransitionGroup>

            <div class="flex">
              <div ref="scroolToElement">
                <button
                  type="submit"
                  class="bg-indigo-400 hover:bg-indigo-700 text-white font-normal py-2 px-4 rounded my-4 mr-4"
                  :disabled="!v$.$invalid && loading"
                  @click="submitForm"
                >
                  Bekræft
                </button>
              </div>
              <button
                type="submit"
                class="bg-indigo-400 hover:bg-indigo-700 text-white font-normal py-2 px-4 rounded my-4"
                :disabled="!v$.$invalid && loading"
                @click="goToFrontpage"
              >
                Spring over
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-else class="flex items-center justify-center h-auto self-center">
      <div class="p-4 rounded shadow-lg ring ring-indigo-600/50 bg-white">
        <div class="flex flex-col items-center my-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-green-600 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 class="text-4xl font-bold">Tak!</h1>
          <p class="mb-2">
            Tak for at tilmelde dig. Vi vender tilbage til dig.
          </p>

          <a
            @click="router.push('/forside')"
            class="cursor-pointer inline-flex items-center px-4 py-2 mt-4 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            <span class="text-sm font-medium"> Forsæt </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { useStoryblok } from '@storyblok/vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { supabase } from '../supabase';
import { load } from 'recaptcha-v3';
import router from '../router/router';
import { useRoute } from 'vue-router';

const route = useRoute();

const { value: story } = await useStoryblok('home', { version: 'draft' });
const { blok } = defineProps({ blok: Object });

const loading = ref(false);

const selectedArtists = ref([] as any[]);
const songs = ref([] as any[]);
const isLoading = ref(false);

const query = ref('');

const token = ref(null);

const scroolToElement = ref(event?.target as HTMLElement);

const siteKey = computed(() => {
  return import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY;
});

const secondPersonIsActive = ref(false);

const signupWasSuccessfull = ref(false);

const emailExists = ref(false);

const asyncFunction = async () => {
  await load(siteKey.value, {
    useRecaptchaNet: true,
    autoHideBadge: true,
    renderParameters: {
      badge: 'inline',
    },
  }).then(async (recaptcha) => {
    await recaptcha.execute('<action>');
    console.log(recaptcha, 'recaptcha');
    console.log(token.value); // Will also print the token
  });
};

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  foodAllergiesDesc: '',
  musicWishOne: '',
  musicWishTwo: '',
  musicWishThree: '',
  firstNameSecondPerson: '',
  lastNameSecondPerson: '',
  foodAllergiesDescSecondPerson: '',
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

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    // notify user form is invalid
    return;
  }

  try {
    loading.value = true;

    if (selectedArtists.value[0]) {
      form.value.musicWishOne =
        selectedArtists.value[0].artists[0].name +
        ' - ' +
        selectedArtists.value[0].name;
    }

    if (selectedArtists.value[1]) {
      form.value.musicWishTwo =
        selectedArtists.value[1].artists[0].name +
        ' - ' +
        selectedArtists.value[1].name;
    }

    if (selectedArtists.value[2]) {
      form.value.musicWishThree =
        selectedArtists.value[2].artists[0].name +
        ' - ' +
        selectedArtists.value[2].name;
    }

    // Check if email already exists in the supabase table
    const { data: existingUser } = await supabase
      .from('formular')
      .select('email')
      .eq('email', form.value.email);

    if (existingUser && existingUser.length > 0) {
      alert('Email already exists');
      v$.value.email.$invalid;
    } else {
      asyncFunction();

      await supabase.from('formular').insert(form.value);

      signupWasSuccessfull.value = true;

      alert('Check your email for the login link!');

      // Store the submitted data in localstorage
      localStorage.setItem('emailValue', JSON.stringify(form.value.email));

      if (localStorage.getItem('emailValue')) {
        emailExists.value = true;
        router.push('/forside');
      } else {
        emailExists.value = false;
      }

      loading.value = false;

      form.value = {
        firstName: '',
        lastName: '',
        email: '',
        foodAllergiesDesc: '',
        musicWishOne: '',
        musicWishTwo: '',
        musicWishThree: '',
        firstNameSecondPerson: '',
        lastNameSecondPerson: '',
        foodAllergiesDescSecondPerson: '',
      };

      v$.value.$reset();
      query.value = '';

      selectedArtists.value = [];
    }
  } catch (error: any) {
    alert(error.message);
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

const checkIfUserExists = async () => {
  const { data, error } = await supabase
    .from('formular')
    .select('email')
    .eq('email', form.value.email);

  if (error) {
    console.error(error);
    return;
  }

  console.log(data, 'data from supabase');
};

const asyncFind = async () => {
  const url = new URL('https://api.spotify.com/v1/search');
  url.searchParams.append('q', query.value);
  url.searchParams.append('type', 'track');
  url.searchParams.append('limit', '5');

  if (query.value !== '') {
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
  }
};

await getToken();

const removeArtist = (array: any, itemToRemove: any) => {
  const index = array.indexOf(itemToRemove);
  if (index > -1) {
    array.splice(index, 1);
  }
};

const addElement = (arr: any, itemIndex: any) => {
  selectedArtists.value.push(itemIndex);
  if (scroolToElement.value) {
    const y =
      scroolToElement.value.getBoundingClientRect().top + window.scrollY;

    console.log(y, 'y');

    window.scroll({
      top: y,
      behavior: 'smooth',
    });
  }
};

const handleError = () => {
  // Do some validation
};

const handleSuccess = (response: string) => {
  // Do some validation
};

const goToFrontpage = () => {
  router.push({ name: 'Home' });
};
</script>
