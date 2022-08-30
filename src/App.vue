<script setup lang="ts">
import { reactive, toRefs } from 'vue';
import CityItem from './components/CityItem.vue';
import {
  Cog8ToothIcon,
  ArrowsPointingOutIcon,
  TrashIcon,
  ArrowUturnLeftIcon,
  CheckIcon,
} from '@heroicons/vue/24/outline';
import draggable from 'vuedraggable';
import { v4 as uuidv4 } from 'uuid';

let state = reactive({
  editMode: false,
  locationsArr: [
    { name: 'Minsk', id: '0' },
    { name: 'Saint-Petersburg', id: '1' },
  ],
  newLocation: '',
});

let { editMode, locationsArr, newLocation } =
  toRefs(state);
// const editMode = ref(false);
const drag = false;
const deleteLocation = (locationId: string) => {
  locationsArr.value = locationsArr.value.filter(
    (el) => el.id !== locationId
  );
};

const addLocation = (locationName: string) => {
  locationsArr.value.push({
    name: locationName,
    id: uuidv4(),
  });
};
</script>

<template>
  <main
    class="w-80 min-h-screen relative flex flex-col gap-8 border-green-300"
  >
    <aside
      v-if="editMode"
      class="p-4 flex flex-col gap-6 absolute top-0 left-0 h-160 w-80 bg-slate-900"
    >
      <header class="flex">
        <h1 class="text-xl font-bold">
          Settings
        </h1>
        <button class="hover:border-transparent">
          <ArrowUturnLeftIcon
            @click="editMode = false"
            class="w-5 absolute top-5 right-5"
          />
        </button>
      </header>
      <draggable
        v-model="locationsArr"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ element }">
          <li
            class="mb-3 list-none border-2 border-indigo-600 flex justify-between p-1"
          >
            <div class="flex gap-2">
              <ArrowsPointingOutIcon
                class="w-5"
              />
              <p>
                {{ element.name }}
              </p>
            </div>
            <button
              class="w-10 flex justify-center"
            >
              <TrashIcon
                @click="
                  deleteLocation(element.id)
                "
                class="w-5"
              />
            </button>
          </li>
        </template>
      </draggable>
      <form
        class="flex flex-col gap-1"
        action=""
        @submit.prevent="addLocation(newLocation)"
      >
        <label class="text-left font-bold"
          >Add Location:
          <div class="flex gap-2">
            <input
              required
              class="rounded w-44"
              type="text"
              v-model="newLocation"
            />
            <button
              class="w-8 justify-center flex"
            >
              <CheckIcon class="w-5" />
            </button>
          </div>
        </label>
      </form>
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
    <div
      v-if="!editMode"
      v-for="location in locationsArr"
    >
      <CityItem
        :city="location.name"
        :key="location.id"
      />
    </div>
  </main>
</template>

<style scoped></style>
