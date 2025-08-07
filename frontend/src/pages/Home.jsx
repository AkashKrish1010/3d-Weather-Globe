import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { EXRLoader } from 'three-stdlib'
import Earth from '../components/Earth'
import Navbar from '../components/Navbar' 
import '../App.css'
import Spinner from '../components/Spinner'

const WeatherLabel = ({ weather }) => {

  return (
      <Html position={[0, 2, 0]} center>
        <div className="weather-label">
          {weather ? (
            <>
              <h3>{weather.name}</h3>
              <div className='flex justify-center items-center'>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt='weather icon'
                  className=' w-10 h-10 backdrop-blur-md rounded-full'
                />
                <p>{weather.weather[0].main} - {weather.main.temp}°C</p>
              </div>
            </>
          ) : (
            <p>Search a city</p>
          )}
        </div>
      </Html>
  )
}

const CustomEnvironment = ({ file, onLoad }) => {
  const texture = useLoader(EXRLoader, file)

  useEffect(() => {
    if (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping
      onLoad()
    }
  }, [texture])

  return (
    <>
      <primitive attach="background" object={texture} />
      <primitive attach="environment" object={texture} />
    </>
  )
}


const Home = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [bgFile, setBgFile] = useState('/hdri/qwantani_dusk_2_puresky_2k.exr')
  const [loading, setLoading] = useState(true)

  const fetchWeather = async () => {
    if (!city) return
    setLoading(true)
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      const data = await res.json()
      if (data.cod === 200) {
        setWeather(data)
        const condition = data.weather[0].main.toLowerCase()

        if (condition.includes('clear')) {
          setBgFile('hdri/qwantani_noon_2k.exr')
        } else if (condition.includes('cloud')) {
          const cloudOptions = [
            '/hdri/cloud_layers_4k.exr',
            '/hdri/scythian_tombs_2_2k.exr'
          ]
          const randomBg = cloudOptions[Math.floor(Math.random() * cloudOptions.length)]
          setBgFile(randomBg)
        } else if (condition.includes('rain') || condition.includes('drizzle')) {
          setBgFile('/hdri/vignaioli_night_2k.exr')
        } else if (condition.includes('snow')) {
          setBgFile('/hdri/snow_field_4k.exr')
        } else {
          setBgFile('/hdri/klippad_sunrise_2_2k.exr')
        }

      } else {
        alert(data.message)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Navbar city={city} setCity={setCity} fetchWeather={fetchWeather} />
      {loading && <Spinner />}

      <Canvas
        onCreated={() => setLoading(false)}
      >
        <Suspense fallback={null} >
          <ambientLight  />
          <OrbitControls enableZoom={false} />
          <Earth scale={2} />
          <WeatherLabel weather={weather} />
          <CustomEnvironment
            file={bgFile}
            onLoad={() => setLoading(false)}
          />
        </Suspense>
      </Canvas>
    </>
  )
}

export default Home