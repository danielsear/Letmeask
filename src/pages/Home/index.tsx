import './styles.css'

import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { FormEvent, useEffect, useState } from 'react'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import googleIcon from '../../assets/images/google-icon.svg'

import Button from '../../components/Button'

import { database } from '../../services/firebase'


export type ThemePage = {
  themePage: boolean
  nameButtonChangeThemePage: string
}


function Home(){
  const navigate = useNavigate()
  const {user,signInWithGoogle} = useAuth()
  const [roomCode,setRoomCode] = useState('') 
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



  async function handleChangeRoom (){
    if(!user){
     await signInWithGoogle()
    }

    navigate('/rooms/new')
  }
  
  async function handleJoinRoom(event: FormEvent){
    event.preventDefault()

    if(roomCode.trim() === ''){
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()//vai buscar todas informações desta sala

    if(!roomRef.exists()){
      alert('Room does not exists.')
      return
    }

    if(roomRef.val().endedAt){
      alert('Room already closed')
      return
    }

    navigate(`/rooms/${roomCode}`)
  }

  return(
    <div id='page_auth'>
      <button 
      className='button_tema' 
      onClick={handleThemePage}>{stateThemePage?.nameButtonChangeThemePage}
      </button>
      <aside >
        <img src={illustrationImg} alt="Ilustração de perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>
      <main className={` ${stateThemePage?.themePage ? 'dark' : ''}`} >
        <div className='main_content'>
           <img src={logoImg} alt="logo do app" />
          <button className='create_room' onClick={handleChangeRoom }>  
            <img   src={googleIcon} alt="logo Google" />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form  onSubmit={handleJoinRoom}>
            <input 
            type="text"
            placeholder='Digite o código da sala'
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
            />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
  </div>
  )
}

export default Home

/*



*/