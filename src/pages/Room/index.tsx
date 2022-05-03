import './styles.css'

import logoImg from '../../assets/images/logo.svg'

import { useParams } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import useAuth from '../../hooks/useAuth'

import Button from '../../components/Button'
import RoomCode from '../../components/RoomCode'
import { database } from '../../services/firebase'




type RoomParams = {
  id: string
}


function Room(){
  const [newQuestion, setNewQuestion] = useState('')
  
  const {user} = useAuth()
  const params = useParams<RoomParams>()
  const roomId = params.id
  
  async function handleSendQuestion(event : FormEvent) {
    event.preventDefault()

    if(newQuestion.trim() === ''){
      return
    }

    if(!user){
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author:{
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }

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
        <form  onSubmit={handleSendQuestion}>
          <textarea 
          placeholder='O que você quer perguntar'
          onChange={event => setNewQuestion(event.target.value)}
          value={newQuestion}
          />
          <div className="form_footer">
            {user ? (
              <div className='user_info'>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta,  <a href='#'>  faça seu login</a></span>
            )}
            <Button type='submit' disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Room