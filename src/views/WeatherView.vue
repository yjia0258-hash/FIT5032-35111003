<template>
  <div class="weather-page">
    <!-- 大标题 -->
    <h1 class="title">WEATHER APP</h1>

    <!-- 输入城市 + 搜索按钮 -->
    <div class="search">
      <input
        v-model="city"
        type="text"
        placeholder="Enter city name"
        @keyup.enter="searchByCity"
      />
      <button :disabled="loading" @click="searchByCity">
        {{ loading ? 'Searching...' : 'Search' }}
      </button>
    </div>

    <!-- 自动定位按钮（可选） -->
    <div class="loc">
      <button :disabled="loading" @click="fetchCurrentLocationWeather">
        Use My Location
      </button>
    </div>

    <!-- 错误提示 -->
    <p v-if="error" class="error">error: {{ error }}</p>

    <!-- 结果展示 -->
    <main v-if="weatherData" class="result">
      <h2 class="place">
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </h2>

      <img v-if="iconUrl" :src="iconUrl" alt="Weather Icon" class="icon" />

      <p class="temp" v-if="temperature !== null">{{ temperature }} °C</p>

      <p class="desc">{{ weatherData.weather[0].description }}</p>
    </main>
  </div>
</template>

<script>
import axios from 'axios'

const API_KEY =
  import.meta.env.VITE_OWM_KEY || 'b96db27d2de401f2003a4f9a200c99a9'

export default {
  name: 'WeatherView',
  data () {
    return {
      city: '',
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
      loading: false,
      error: ''
    }
  },
  computed: {
    temperature () {
      if (!this.weatherData) return null
      return Math.round(this.weatherData.main.temp)
    },
  
    iconUrl () {
      if (!this.weatherData) return null
      const icon = this.weatherData.weather[0].icon
      return `https://openweathermap.org/img/wn/${icon}@2x.png`
    }
  },
  mounted () {
    this.fetchCurrentLocationWeather()
  },
  methods: {
    async searchByCity () {
      if (!this.city || !this.city.trim()) {
        this.error = 'Please enter a city name.'
        return
      }
      this.loading = true
      this.error = ''     
      this.weatherData = null
      try {
        const url =
  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(this.city)}&appid=${API_KEY}&units=metric&lang=en`
        await this.fetchWeatherData(url)
      } catch (e) {
        this.handleError(e)
      } finally {
        this.loading = false
      }
    },

    async fetchCurrentLocationWeather () {
      this.error = ''
      this.weatherData = null
      if (!('geolocation' in navigator)) {
        this.error = 'Geolocation is not supported by this browser.'
        return
      }
      this.loading = true
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 10000
          })
        })
        const { latitude, longitude } = position.coords
        const url =
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=en`
        await this.fetchWeatherData(url)
      } catch (e) {
        this.handleError(e)
      } finally {
        this.loading = false
      }
    },

    async fetchWeatherData (url) {
      const { data } = await axios.get(url, { timeout: 10000 })
      this.weatherData = data
    },

    handleError (e) {
      this.error =
        e?.response?.data?.message ||
        e?.message ||
        'Failed to fetch weather data.'
    }
  }
}
</script>

<style scoped>
.weather-page{
  max-width:760px;
  margin:20px auto 48px;
  text-align:center;
}

/* 顶部大标题 */
.title{
  font-size:64px;
  font-weight:700;
  letter-spacing:4px;
  margin:8px 0 24px;
  text-transform:uppercase;
  color:#111;
}

/* 搜索区：输入框 + 深灰按钮 */
.search{
  display:flex;
  justify-content:center;
  gap:8px;
  margin:0 auto 24px;
  max-width:520px;
}
.search input{
  flex:1;
  min-width:260px;
  padding:10px 12px;
  border:1px solid #bfc5d2;
  border-radius:4px;
  background:#fff;
  font-size:16px;
}
.search input::placeholder{ color:#8c95a6; }
.search button{
  padding:10px 16px;
  border:none;
  border-radius:4px;
  background:#555;        /* 深灰 */
  color:#fff;
  font-weight:700;
  cursor:pointer;
}
.search button[disabled]{ opacity:.6; cursor:not-allowed; }

/* 定位按钮行 */
.loc{ margin:0 auto 8px; }
.loc button{
  padding:8px 12px;
  border:1px solid #c9cdd7;
  border-radius:4px;
  background:#f3f4f6;
  color:#333;
  cursor:pointer;
}

/* 结果展示 */
.result{ margin-top:8px; }
.place{
  font-size:36px;
  font-weight:700;
  letter-spacing:2px;
  margin:8px 0 20px;
  color:#111;
}
.icon{
  width:64px;
  height:64px;
  object-fit:contain;
  opacity:.65;
  margin:10px auto 8px;
  display:block;
}
.temp{
  font-size:22px;
  margin:6px 0 18px;
  color:#111;
}
.desc{
  font-size:18px;
  color:#222;
  text-transform:lowercase;
  letter-spacing:.5px;
}

/* 错误提示 */
.error{ color:#d93025; margin-top:8px; }

/* 响应式优化 */
@media (max-width:480px){
  .title{ font-size:42px; letter-spacing:2px; }
  .place{ font-size:28px; }
}
</style>
