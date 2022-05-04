import './styles.css'

import logoImg from '../../assets/images/logo.svg'

import { useParams } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useRoom from '../../hooks/useRoom'

import Button from '../../components/Button'
import RoomCode from '../../components/RoomCode'
import Question from '../../components/Question'

import { database } from '../../services/firebase'



type RoomParams = {
  id: string
}


function AdminRoom(){
  const [newQuestion, setNewQuestion] = useState('')
 
  const {user} = useAuth()
  const params = useParams<RoomParams>()

  const roomId = params.id

  const{questions, title} = useRoom(roomId)

 
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
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar</Button>
          </div>
        </div>
      </header>
      <main >
        <div className="room_title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} de perguntas</span>}
        </div>
        <div className="question_list">
        {questions.map(question => {
          return (
            <Question 
            key={question.id} 
            content={question.content} 
            author={question.author} 
            />)}
          )
        }
        </div>
      </main>
    </div>
  )
}

export default AdminRoom