<script setup lang="ts">
import { ref } from 'vue'
import { IWeatherData } from '../interfaces/interfaces'

const initialWeatherData: IWeatherData = {
  name: 'Minsk',
  sys: { country: 'BY' },
  main: {
    temp: 0,
    feels_like: 0,
  },
  wind: {
    speed: 0,
    deg: 0,
  },
}
defineProps<{ msg: string }>()

const count = ref(0)
const API_KEY = '2671b0be896edd79fd71f7cdabc7d1dd'
const UNITS = 'metric'
const city = ref('Minsk')
let weatherData = ref(initialWeatherData)

const getCoordinates = async (city: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
  )
  const [data] = await response.json()
  // console.log('response', data)
  return { lat: data.lat, lon: data.lon }
}

const getWeatherData = async (city: string) => {
  const coordinates = await getCoordinates(city)
  console.log('coordinates', coordinates)

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${UNITS}&appid=${API_KEY}`
  )

  const data = await response.json()
  // console.log('data', data)
  weatherData.value = data
  console.log(
    'weatherDataName',
    weatherData.value.name
  )
  console.log('weatherData', weatherData.value)
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <p>{{ city }}</p>
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
  <div
    v-if="weatherData.name"
    class="text-cyan-400"
  >
    <p>{{ weatherData.name }}</p>
    <p>{{ weatherData.sys.country }}</p>
    <p>
      {{ weatherData.main.temp }}
      <span>Temp</span>
    </p>
    <p>
      {{ weatherData.main.feels_like }}
      <span>Temp, feels like</span>
    </p>
    <p v-if="weatherData.weather">
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
  </div>
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
    Click on the Vite and Vue logos to learn more
  </p>
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
