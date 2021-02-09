import React from 'react'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'

import api from '../../services/api'

import './style.css'

function DevItem({ dev, updateListDevs, history }) {
  const { 
    _id, 
    name, 
    avatar_url, 
    techs, bio, 
    github_username,  
  } = dev

  async function handleDeleteDev() {
    let answer = window.confirm(`Deseja excluir o dev ${name}?`)

    if(answer) {
      await api.delete(`/devs/${_id}`)
      alert('Dev deletado com sucesso!')

      updateListDevs()
    }
  }

  function handleEditDev() {
    localStorage.setItem('dev', JSON.stringify(dev))

    history.push('/update')
  }

  return (
    <li className="dev-item">
      <header>
        <img src={avatar_url} alt={name} />
        <div className="user-info">
          <strong> {name} </strong>
          <span> {techs.join(', ')} </span>
        </div>
        <FaEdit className="icon-edit" onClick={handleEditDev} />
        <FaTrashAlt className="icon-delete" onClick={handleDeleteDev} />
      </header>
      <p> {bio} </p>
      <a href={`https://github.com/${github_username}`}> Acessar perfil no Github </a>
    </li>
  )
}

export default DevItem