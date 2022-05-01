import './styles.css'

import { Link, useNavigate } from 'react-router-dom'
import {useState, FormEvent} from 'react'
import useAuth from '../../hooks/useAuth'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'

import Button from '../../components/Button'

import {database} from '../../services/firebase'





function NewRoom(){
  const {user} = useAuth()
  const [newRoom,setNewRoom] = useState('') 
  const navigate =useNavigate()

 async function handleCreateRoom(event: FormEvent) {
   event.preventDefault()

   if(newRoom.trim() === ''){//retira os espaços tanto da direita quanto da esquerda
    return
   }
   
   const roomRef = database.ref('rooms')//seção criada no banco de dados

   const firebaseRoom = await roomRef.push({
     title: newRoom,
     authorID: user?.id
   })
   navigate(`/rooms/${firebaseRoom.key}`)
 }

  return(
    <div id='page_auth'>
      <aside>
        <img src={illustrationImg} alt="Ilustração de perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className='main_content'>
           <img src={logoImg} alt="logo do app" />
          <h2>Criar uma nova sala</h2>
          <form  onSubmit={handleCreateRoom}>
            <input 
            type="text" 
            placeholder='Nome da sala' 
            onChange={event => setNewRoom(event.target.value)} 
            value={newRoom}
            />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente?<Link to="/">Clique aqui</Link></p>
        </div>
      </main>
  </div>
  )
}

export default NewRoom

