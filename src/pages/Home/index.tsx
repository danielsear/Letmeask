import './styles.css'

import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import googleIcon from '../../assets/images/google-icon.svg'

import Button from '../../components/Button'


function Home(){
  const navigate = useNavigate()

  const {user,signInWithGoogle} = useAuth()
    
    async function handleChangeRoom (){
    if(!user){
     await signInWithGoogle()
    }

    navigate('/rooms/new')
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
          <button className='create_room' onClick={handleChangeRoom }>  
            <img   src={googleIcon} alt="logo Google" />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form >
            <input type="text" placeholder='Digite o código da sala' />
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