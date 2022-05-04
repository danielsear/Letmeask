import './styles.css'

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'

import { useNavigate, useParams } from 'react-router-dom'
//import useAuth from '../../hooks/useAuth'
import useRoom from '../../hooks/useRoom'

import Button from '../../components/Button'
import RoomCode from '../../components/RoomCode'
import Question from '../../components/Question'

import { database } from '../../services/firebase'





type RoomParams = {
  id: string
}


function AdminRoom(){
 // const {user} = useAuth()
  const navegate = useNavigate()
  const params = useParams<RoomParams>()

  const roomId = params.id

  const{questions, title} = useRoom(roomId)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt:new Date()
    })

    navegate('/')
  }

  async function handleDeleteQuestion(questionId : string){
   
  if (window.confirm('Tem certeza que deseja excluir essa pergunta?')){
     await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
  }
 }
 

  return (
    <div id="page_room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar</Button>
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
            >
              <button type='button' onClick={()=> handleDeleteQuestion(question.id)}>
                <img src={deleteImg} alt="Remover pergunta"/>
              </button>

            </Question>
            )}
          )
        }
        </div>
      </main>
    </div>
  )
}

export default AdminRoom