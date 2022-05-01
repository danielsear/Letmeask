import './styles.css'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'



import Button from '../../components/Button'
import { Link } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'



function NewRoom(){
 
  const {user} = useAuth()

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
          <form >
            <input type="text" placeholder='Nome da sala' />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala existente?<Link to="/">Clique aqui</Link></p>
        </div>
      </main>
  </div>
  )
}

export default NewRoom

/*
<div id='page_auth'>
      <aside>
        <img src={illustrationImg} alt="Ilustração de perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>
      <main>
      <div>
        <button>
          <img src={logoImg} alt="logo do Google" />
          Crie sua sala com o Google
        </button>
        <div>ou entre em uma sala</div>
        <form >
          <input type="text" placeholder='Digite o código da sala' />
          <button type="submit">Entrar na sala</button>
        </form>
      </div>
      </main>
    </div>
*/