export interface IWeatherData {
  name: string
  sys: {
    country: string
  }
  main: {
    temp: number
    feels_like: number
  }
  weather?: {
    main: string
    description: string
  }[]
  wind: {
    speed: number
    deg: number
  }
}
