<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import CityItem from './components/CityItem.vue';
import {
  Cog8ToothIcon,
  ArrowsPointingOutIcon,
  TrashIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/vue/24/outline';
import { IState } from './interfaces/interfaces';

let state = reactive({
  editMode: false,
  locationsArr: ['Minsk', 'Soligorsk'],
});

let { editMode, locationsArr } = toRefs(state);
// const editMode = ref(false);

const deleteLocation = (location: string) => {
  locationsArr.value = locationsArr.value.filter(
    (el) => el !== location
  );
};
</script>

<template>
  <main
    class="relative flex flex-col gap-8 border-green-300"
  >
    <aside
      v-if="editMode"
      class="p-4 flex flex-col gap-3 absolute top-0 left-0 h-full w-full bg-slate-900"
    >
      <header class="flex">
        <h1 class="text-xl">Settings</h1>
        <button class="hover:border-transparent">
          <ArrowUturnLeftIcon
            @click="editMode = false"
            class="w-5 absolute top-5 right-5"
          />
        </button>
      </header>
      <ul class="flex flex-col gap-2">
        <li
          v-for="location in locationsArr"
          class="list-none border-2 border-indigo-600 flex justify-between p-1"
        >
          <div class="flex gap-2">
            <ArrowsPointingOutIcon class="w-5" />
            <p>
              {{ location }}
            </p>
          </div>
          <button
            class="w-10 flex justify-center"
          >
            <TrashIcon
              @click="deleteLocation(location)"
              class="w-5"
            />
          </button>
        </li>
      </ul>
    </aside>
    <button
      class="hover:border-transparent absolute top-4 right-5"
    >
      <Cog8ToothIcon
        v-if="!editMode"
        @click="editMode = true"
        class="w-5"
      />
    </button>
    <div v-for="location in locationsArr">
      <CityItem :city="location" />
    </div>
  </main>
</template>

<style scoped></style>
