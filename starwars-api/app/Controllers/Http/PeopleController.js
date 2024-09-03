'use strict'

const axios = require('axios')
const Redis = require('./redis-client')

class PeopleController {

  async index({ response }) {
    try {
      const { data } = await axios.get('https://swapi.dev/api/people/')
      return response.json(data)
    } catch (error) {
      return response.status(500).json({ error: 'Unable to fetch data from Star Wars API' })
    }
  }

  async show({ params, response }) {
    try {
      const { data } = await axios.get(`https://swapi.dev/api/people/${params.id}/`)
      return response.json(data)
    } catch (error) {
      return response.status(500).json({ error: 'Unable to fetch data from Star Wars API' })
    }
  }

  async search({ request, response }) {
    try {
      const { name } = request.qs()  // Obtém o parâmetro 'name' da query string
      const { data } = await axios.get(`https://swapi.dev/api/people/?search=${name}`) // Usa o parâmetro 'search' para buscar pelo nome
      return response.json(data)
    } catch (error) {
      return response.status(500).json({ error: 'Unable to search data from Star Wars API' })
    }
  }

  async favorite({ params, response }) {
    try {
      const { id } = params
      const key = `favorite:${id}`

      // Fetch the character data from the Star Wars API
      const { data } = await axios.get(`https://swapi.dev/api/people/${id}/`)

      // Save to Redis
      await Redis.set(key, JSON.stringify(data))

      return response.json({ message: 'Character added to favorites', data })
    } catch (error) {
      return response.status(500).json({ error: 'Unable to add character to favorites' })
    }
  }

  async getFavorites({ response }) {
    try {
      const keys = await Redis.keys('favorite:*')
      const favorites = await Promise.all(keys.map(async (key) => {
        const data = await Redis.get(key)
        return JSON.parse(data)
      }))
      return response.json(favorites)
    } catch (error) {
      return response.status(500).json({ error: 'Unable to fetch favorite characters' })
    }
  }
}

module.exports = PeopleController
