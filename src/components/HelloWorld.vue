<script setup lang="ts">
import { ref } from 'vue';
import { IWeatherData } from '../interfaces/interfaces';
import {
  Cog8ToothIcon,
  PaperAirplaneIcon,
  ArrowDownTrayIcon,
  BeakerIcon,
  EyeIcon,
} from '@heroicons/vue/20/solid';

const initialWeatherData: IWeatherData = {
  name: 'Minsk',
  sys: { country: 'BY' },
  main: {
    temp: 0,
    feels_like: 0,
    pressure: 0,
    humidity: 0,
  },
  weather: [
    {
      description: '',
      main: '',
      icon: '',
    },
  ],
  wind: {
    speed: 0,
    deg: 0,
  },
  visibility: 0,
};
defineProps<{ msg: string }>();

const count = ref(0);
const API_KEY =
  '2671b0be896edd79fd71f7cdabc7d1dd';
const UNITS = 'metric';
const city = ref('Minsk');
let iconUrl = ref(
  'http://openweathermap.org/img/wn/10d@2x.png'
);
let weatherData = ref(initialWeatherData);

const getCoordinates = async (city: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
  );
  const [data] = await response.json();
  // console.log('response', data)
  return { lat: data.lat, lon: data.lon };
};

const getWeatherData = async (city: string) => {
  const coordinates = await getCoordinates(city);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${UNITS}&appid=${API_KEY}`
  );

  const data = await response.json();
  weatherData.value = data;
  iconUrl.value = `http://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@2x.png`;
  console.log('weatherData', weatherData.value);
};
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <h1>{{ msg }}</h1>
    <!-- <p>{{ city }}</p> -->
    <form @submit.prevent="getWeatherData(city)">
      <input
        type="text"
        placeholder="Enter a city..."
        v-model="city"
      />
      <button type="submit">
        Get Weather Data
      </button>
    </form>
    <article
      v-if="weatherData.name"
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
    <div class="card">
      <button type="button" @click="count++">
        count is {{ count }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.wind-direction {
  width: 10px;
  height: 10px;
  color: white;
}
</style>
