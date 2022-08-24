<script setup lang="ts">
import { ref } from 'vue';
import { IWeatherData } from '../interfaces/interfaces';
import { Cog8ToothIcon } from '@heroicons/vue/20/solid';

const initialWeatherData: IWeatherData = {
  name: 'Minsk',
  sys: { country: 'BY' },
  main: {
    temp: 0,
    feels_like: 0,
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
};
defineProps<{ msg: string }>();

const count = ref(0);
const API_KEY =
  '2671b0be896edd79fd71f7cdabc7d1dd';
const UNITS = 'metric';
const city = ref('Minsk');
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
  console.log('coordinates', coordinates);

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${UNITS}&appid=${API_KEY}`
  );

  const data = await response.json();
  // console.log('data', data)
  weatherData.value = data;
  console.log(
    'weatherDataName',
    weatherData.value.name
  );
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
      class="text-slate-300 flex flex-col gap-1 border-2 border-cyan-200 w-80 p-2"
    >
      <header
        class="flex gap-1 items-center justify-between"
      >
        <div class="flex gap-1">
          <p>{{ weatherData.name }}</p>
          <p>,</p>
          <p>{{ weatherData.sys.country }}</p>
        </div>
        <Cog8ToothIcon class="w-5" />
      </header>
      <figure class="flex">
        <!-- <img
          src="http://openweathermap.org/img/wn/${}@2x.png"
          alt=""
        /> -->
        <img
          src="'http://openweathermap.org/img/wn/'+ {{weatherData.weather[0].icon}} + '@2x.png'"
          alt=""
        />
        <p>
          {{ weatherData.main.temp }}
          <span>C</span>
        </p>
      </figure>
      <p>
        {{ weatherData.main.feels_like }}
        <span>Temp, feels like</span>
      </p>
      <p>
        {{ weatherData.weather[0].description }}
        <span>Descrition</span>
      </p>
      <p>
        <span>
          <img
            class="wind-direction"
            src="../assets/wind-arrow.svg"
            alt="wind direction"
          />
        </span>
        {{ weatherData.wind.speed }}
        <span>Wind</span>
      </p>
      <!-- <p>{{ weatherData.sys.country }}</p> -->
    </article>
    <div class="card">
      <button type="button" @click="count++">
        count is {{ count }}
      </button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to
        test HMR
      </p>
    </div>

    <p>
      Check out
      <a
        href="https://vuejs.org/guide/quick-start.html#local"
        target="_blank"
        >create-vue</a
      >, the official Vue + Vite starter
    </p>
    <p>
      Install
      <a
        href="https://github.com/johnsoncodehk/volar"
        target="_blank"
        >Volar</a
      >
      in your IDE for a better DX
    </p>
    <p class="read-the-docs">
      Click on the Vite and Vue logos to learn
      more
    </p>
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
