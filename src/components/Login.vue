<template>
  <!-- Modal toggle -->

  <!-- Main modal -->
  <div
    id="staticModal"
    data-modal-backdrop="static"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 w-full md:p-20 p-5 overflow-x-hidden overflow-y-auto md:inset-0 h-full flex flex-col"
  >
    <div class="relative w-full h-full flex flex-col shadow-lg">
      <!-- Modal content -->
      <div
        class="relative rounded-lg shadow bg-white w-full h-full flex flex-col"
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
        <div class="p-6 space-y-6">
          <!-- Form element -->
          <form @submit.prevent="submitForm">
            <label class="block font-light my-2" for="firstName">
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
              autofocus
            />
            <div v-if="v$.firstName.$error" class="text-red-500">
              {{ story.content.body[0].firstNameLabel }} is required
            </div>

            <label class="block font-light my-2" for="lastName">
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
            />
            <div v-if="v$.lastName.$error" class="text-red-500">
              {{ story.content.body[0].lastNameLabel }} is required
            </div>

            <label class="block font-light my-2" for="email">
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
            />
            <div v-if="v$.email.$error" class="text-red-500">
              {{ story.content.body[0].emailLabel }} is required
            </div>

            <div v-if="!v$.email.email" class="text-red-500">
              Invalid {{ story.content.body[0].emailLabel }} format
            </div>

            <label class="block font-light my-2" for="password">
              Password
            </label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 mb-3"
              id="password"
              type="password"
              v-model.trim="v$.password.$model"
              @blur="v$.password.$touch"
              :class="
                v$.password.$error
                  ? 'border border-red-500 focus:ring-red-500 focus:border-red-500 bg-red-50  '
                  : ''
              "
            />
            <div v-if="v$.password.$error" class="text-red-500">
              Password is required
            </div>

            <button
              type="submit"
              class="bg-indigo-400 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded my-4"
              :disabled="!v$.$invalid && loading"
            >
              Submit
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
import { required, email, minLength } from '@vuelidate/validators';
import { useStoryblok } from '@storyblok/vue';
import { reactive, ref } from 'vue';
import { supabase } from '../supabase';

const story = await useStoryblok('home', { version: 'draft' });
const props = defineProps({ blok: Object });

const loading = ref(false);

const state = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
});

const rules = {
  firstName: { required, minLength: minLength(1) }, // Matches state.firstName
  lastName: { required, minLength: minLength(1) }, // Matches state.lastName
  email: { required, email }, // Matches state.contact.email
  password: { required, minLength: minLength(1) },
};

const v$ = ref(useVuelidate(rules, state));

const submitForm = async () => {
  const result = await v$.value.$validate();
  if (!result) {
    // notify user form is invalid
    return;
  }

  try {
    loading.value = true;

    const { data, error } = await supabase.auth.signUp({
      email: state.value.email,
      password: state.value.password,
      options: {
        data: {
          first_name: state.value.firstName,
          last_name: state.value.lastName,
        },
      },
    });
     
        await supabase
        .from('formular')
        .insert(state.value)
        
    if (error) throw error;
    alert('Check your email for the login link!');
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
    state.value.email = '';
    state.value.firstName = '';
    state.value.lastName = '';
    state.value.password = '';
    v$.value.$reset();
  }
  // perform async actions
};
</script>
