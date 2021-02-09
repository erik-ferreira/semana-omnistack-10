const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage, sendMessageDevDeleted } = require('../websocket')

module.exports = {
  async index(req, res) {
    const devs = await Dev.find()

    return res.json(devs)
  },
  
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body

    let dev = await Dev.findOne({ github_username })

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
  
      const { name = login, avatar_url, bio } = apiResponse.data
    
      const techsArray = parseStringAsArray(techs)
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })

      // Filtrar as conexões que estão há no máximo 10km de distância
      // e que o novo dev tenha pelo menos uma das tecnologias filtradas

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      )

      sendMessage(sendSocketMessageTo, 'new-dev', dev)
    }
  
    return res.json(dev)
  },

  async update(req, res) {
    const { name, techs, bio } = req.body
    const techsArray = parseStringAsArray(techs)

    await Dev.findByIdAndUpdate(req.params.id, {
      name,
      techs: techsArray,
      bio,
    })

    return res.send('Dev atualizado com sucesso!')
  },

  async destroy(req, res) {
    const dev = await Dev.findByIdAndDelete(req.params.id)

    sendMessageDevDeleted('dev-deleted', dev)

    return res.send('Dev deletado com sucesso!')
  }
}