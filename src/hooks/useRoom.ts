import { useEffect, useState } from 'react'
import { database } from '../services/firebase'
import useAuth from './useAuth'

type QuestionType = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isHighLighted: false
  isAnswered: false
  likeCount: number
  hasLiked: boolean
}
type firebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isHighLighted: false
    isAnswered: false
    likes: Record<
      string,
      {
        authorId: string
      }
    >
  }
>

function useRoom(roomId: any) {
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('')

  const { user } = useAuth()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: firebaseQuestions = databaseRoom.questions ?? {}
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered,
            likeCount: Object.values(value.likes ?? {}).length,
            hasLiked: Object.values(value.likes ?? {}).some(
              like => like.authorId === user?.id
            )
          }
        }
      )

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomId, user?.id])

  return { questions, title }
}

export default useRoom
