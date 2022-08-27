<script setup lang="ts">
import { ref } from 'vue';
import CityItem from './components/CityItem.vue';
import {
  Cog8ToothIcon,
  CheckIcon,
} from '@heroicons/vue/20/solid';

const editMode = ref(false);
</script>

<template>
  <main
    class="relative border-green-300 border-2"
  >
    <aside
      v-if="editMode"
      class="z-10 absolute top-0 left-0 h-full w-full text-green-600 bg-white"
    >
      <button>
        <CheckIcon
          @click="editMode = false"
          class="w-5 absolute top-3 right-3"
        />
      </button>
      edit mode is here!
    </aside>
    <button>
      <Cog8ToothIcon
        @click="editMode = true"
        class="w-5 absolute top-3 right-3"
      />
    </button>
    <CityItem city="soligorsk" />
  </main>
</template>

<style scoped></style>
