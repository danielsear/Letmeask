import './styles.css'

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'


import { useNavigate, useParams } from 'react-router-dom'
import useRoom from '../../hooks/useRoom'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'

import Button from '../../components/Button'
import RoomCode from '../../components/RoomCode'
import Question from '../../components/Question'

import { database } from '../../services/firebase'



type RoomParams = {
  id: string
}


function AdminRoom(){
  const navegate = useNavigate()
  const params = useParams<RoomParams>()
  const {themeDark} = useAuth()

  const roomId = params.id

  const{questions, title} = useRoom(roomId)

  const [themeDarkVar, setThemeDarkVar] = useState(themeDark)
  const [nameTheme,setNameTheme] = useState('Tema Dark')

   async function handleThemeDark(){
    
    if(!themeDarkVar){
      setThemeDarkVar(true)
      setNameTheme('Tema padrão')
    }else{
      setThemeDarkVar(false)
      setNameTheme('Tema Dark')
    }
  }

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

 async function handleCheckQuestionsAsAnswered(questionId : string){
   
     await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
       isAnswered:true
     })
  
 }

 async function handleHighLightQuestion(questionId : string){
   
     await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
       isHighLighted: true
     })
  
 }
 

  return (
    <div id="page_room" className={` ${themeDarkVar ? 'dark' : ''}`}>
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
      <button className='button_tema' onClick={handleThemeDark}>{nameTheme}</button>
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
            isAnswered={question.isAnswered}
            isHighLighted ={question.isHighLighted}
            >
              {!question.isAnswered && (
               <>
                 <button type='button' onClick={()=> handleCheckQuestionsAsAnswered(question.id)}>
                 <img src={checkImg} alt="Marcar pergunta como respondida"/>
                 </button>

                 <button type='button' onClick={()=> handleHighLightQuestion(question.id)}>
                 <img src={answerImg} alt="Dar destaque a pergunta"/>
                 </button>
               </>
              )}

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