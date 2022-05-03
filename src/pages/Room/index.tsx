import './styles.css'

import logoImg from '../../assets/images/logo.svg'

import { useParams } from 'react-router-dom'

import Button from '../../components/Button'
import RoomCode from '../../components/RoomCode'


type RoomParams = {
  id: string
}


function Room(){
  const params = useParams<RoomParams>()

  const roomId = params.id
  

  return (
    <div id="page_room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main >
        <div className="room_title">
          <h1>Sala React</h1>
          <span>numero de perguntas</span>
        </div>
        <form >
          <textarea placeholder='O que você quer perguntar'/>
          <div className="form_footer">
            <span>Para enviar uma pergunta,  <a href='#'>  faça seu login</a></span>
            <Button type='submit'>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Room