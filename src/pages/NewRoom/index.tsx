import './styles.css'

import { Link, useNavigate } from 'react-router-dom'
import {useState, FormEvent, useEffect} from 'react'
import useAuth from '../../hooks/useAuth'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'

import Button from '../../components/Button'

import {database} from '../../services/firebase'


import { ThemePage } from '../Home'


function NewRoom(){
  const {user} = useAuth()
  const [newRoom,setNewRoom] = useState('') 
  const navigate =useNavigate()

  const [stateThemePage, setStateThemePage] = useState<ThemePage>()
 
  

  useEffect(() => {
    //verificando o tema inicial e retornando o id
    if(!stateThemePage ){
      database
    .ref('rooms')
    .child('pageTheme')
    .once('value', theme => {
      const themeValue = theme.val()
      

      if (themeValue === false) {

        setStateThemePage({
            themePage: false,
            nameButtonChangeThemePage: 'Tema Dark'
          })
        } else {

          setStateThemePage({
            themePage: true,   
            nameButtonChangeThemePage: 'Tema Padrão'
          })
        }
    })
    }
    

  }, [stateThemePage])

   function handleThemePage(){  
     if(stateThemePage?.themePage === false){
      database.ref('rooms').child(`pageTheme`).set(true)
      
      setStateThemePage({
        themePage: true,
        nameButtonChangeThemePage: 'Thema Dark'
      })
     }else{ 
      database.ref('rooms').child(`pageTheme`).set(false)
      
      setStateThemePage({
        themePage: false,
        nameButtonChangeThemePage: 'Thema Padrão'
      })
     }
        
    }




 async function handleCreateRoom(event: FormEvent) {
   event.preventDefault()

   if(newRoom.trim() === ''){//retira os espaços tanto da direita quanto da esquerda
    return
   }
   
   const roomRef = database.ref('rooms')//seção criada no banco de dados

   const firebaseRoom = await roomRef.push({
     title: newRoom,
     authorID: user?.id,
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
      <main  className={` ${stateThemePage?.themePage ? 'dark' : ''}`}>
      <button 
      className='button_tema' 
      onClick={handleThemePage}>{stateThemePage?.nameButtonChangeThemePage}
      </button>
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

