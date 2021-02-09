import React, { useState, useEffect } from 'react'
import api from '../../services/api'

import './style.css'

export default function UpdateDev({ history }) {
  const [name, setName] = useState('')
  const [techs, setTechs] = useState('')
  const [bio, setBio] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    const dev = JSON.parse(localStorage.getItem('dev'))
    const { _id, name, techs, bio } = dev

    setName(name)
    setTechs(techs.join(', '))
    setBio(bio)
    setId(_id)
  }, [])

  async function handleUpdateDev(event) {
    event.preventDefault()

    await api.put(`/devs/${id}`, {
      name,
      techs,
      bio
    })
    
    alert('Dev atualizado com sucesso!')
    handleCancelUpdateDev()
  }

  function handleCancelUpdateDev() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div id="div-form">
      <aside className="update-form">
        <strong> Editar perfil </strong>
        <form>
          <div className="input-block">
            <label htmlFor="name">Name</label>
            <input 
              name="name" 
              id="name" 
              required
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              id="techs"
              required
              placeholder="Tecnologias separadas por vírgula"
              value={techs}
              onChange={event => setTechs(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="bio">Biografia</label>
            <textarea
              name="bio" 
              id="bio" 
              required
              value={bio}
              onChange={event => setBio(event.target.value)}
            />
          </div>

          <button type="submit" onClick={handleUpdateDev}>Salvar</button>
          <button id="btn-cancel-update" onClick={handleCancelUpdateDev}>Cancelar</button>
        </form>
      </aside>
    </div>
  )
}

 // await api.put(`/devs/${_id}`, {
    //   name,
    //   avatar_url,
    //   techs,
    //   bio,
    //   longitude,
    //   latitude
    // })