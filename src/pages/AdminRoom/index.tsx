import './styles.css'

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'


import { useNavigate, useParams } from 'react-router-dom'
import useRoom from '../../hooks/useRoom'
import { useEffect, useState } from 'react'

import Button from '../../components/Button'
import RoomCode from '../../components/RoomCode'
import Question from '../../components/Question'

import { database } from '../../services/firebase'


import {ThemePage} from '../Home'


type RoomParams = {
  id: string
}



function AdminRoom(){
  const navegate = useNavigate()
  const params = useParams<RoomParams>()
  

  const roomId = params.id

  const{questions, title} = useRoom(roomId)


  const [stateThemePage, setStateThemePage] = useState<ThemePage>()
  

  useEffect(()=>{
    async function theme() {
      await database
      .ref('rooms')
      .child('pageTheme')
      .once('value', theme => {
        const themeValue = theme.val()
    
        const nameButton = themeValue === true ? 'Tema Light':'Tema Dark'
     
          setStateThemePage ({ 
            themePage: themeValue,
            nameButtonChangeThemePage: nameButton
          })
      }) 
     }
     theme()
   },[])

   function handleThemePage(){  
     if(stateThemePage?.themePage === false){
      database.ref('rooms').child(`pageTheme`).set(true)
      
      setStateThemePage({
        themePage: true,
        nameButtonChangeThemePage: 'Tema Light'
      })
     }else{ 
      database.ref('rooms').child(`pageTheme`).set(false)
      
      setStateThemePage({
        themePage: false,
        nameButtonChangeThemePage: 'Tema Dark'
      })
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
    <div id="page_room" className={` ${stateThemePage?.themePage ? 'dark_AdminRoom' : ''}`}>
      <button 
      className='button_tema' 
      onClick={handleThemePage}>{stateThemePage?.nameButtonChangeThemePage}
      </button>
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