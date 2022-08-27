<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
// import { IWeatherData } from '../interfaces/interfaces';
import { getWeatherInfo } from './../services/apiService';
import {
  Cog8ToothIcon,
  PaperAirplaneIcon,
  ArrowDownTrayIcon,
  BeakerIcon,
  EyeIcon,
} from '@heroicons/vue/20/solid';

const props = defineProps<{ city: string }>();

let iconUrl = ref();
let weatherData = ref();

onBeforeMount(async () => {
  const apiData = await getWeatherInfo(
    props.city
  );
  weatherData.value = apiData.weatherData;
  iconUrl.value = apiData.iconUrl;
});
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <h1>{{ city }}</h1>
    <!-- <form @submit.prevent="getWeatherData(city)">
      <input
        type="text"
        placeholder="Enter a city..."
        v-model="city"
      />
      <button type="submit">
        Get Weather Data
      </button>
    </form> -->
    <article
      v-if="weatherData"
      class="text-slate-300 flex flex-col gap-3 border-2 border-cyan-200 w-80 p-4"
    >
      <header
        class="flex gap-1 items-center justify-between"
      >
        <div class="flex gap-1 text-xl font-bold">
          <p>{{ weatherData.name }}</p>
          <p>,</p>
          <p>{{ weatherData.sys.country }}</p>
        </div>
        <Cog8ToothIcon class="w-5" />
      </header>
      <figure
        class="flex items-center justify-center"
      >
        <img :src="iconUrl" />
        <figcaption class="font-bold text-3xl">
          {{ weatherData.main.temp }}
          <span>&deg;C</span>
        </figcaption>
      </figure>
      <section class="flex gap-1 justify-center">
        <span>Feels like</span>
        <span>
          {{ weatherData.main.feels_like }}&deg;C,
        </span>
        <span>
          {{ weatherData.weather[0].description }}
        </span>
      </section>
      <section class="flex justify-center gap-7">
        <div class="flex flex-col gap-2">
          <div class="flex justify-center gap-1">
            <PaperAirplaneIcon class="w-5" />
            <p>
              {{ weatherData.wind.speed }} m/s
            </p>
          </div>
          <div class="flex justify-center gap-1">
            <ArrowDownTrayIcon class="w-5" />
            <p>
              {{ weatherData.main.pressure }} hPa
            </p>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex justify-center gap-1">
            <BeakerIcon class="w-5" />
            <p>
              {{ weatherData.main.humidity }} %
            </p>
          </div>
          <div class="flex justify-center gap-1">
            <EyeIcon class="w-5" />
            <p>{{ weatherData.visibility }} m</p>
          </div>
        </div>
      </section>
    </article>
    <!-- <div class="card">
      <button type="button" @click="count++">
        count is {{ count }}
      </button>
    </div> -->
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
