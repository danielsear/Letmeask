import './styles.css'

import { ReactNode} from 'react'

type QuestionProps ={
  content: string,
  author: {
    name: string,
    avatar: string
  },
  children?:ReactNode
}

function Question(props: QuestionProps){
  return (
    <div className="question">
      <p>{props.content}</p>
      <footer>
        <div className="user_info">
          <img src={props.author.avatar} alt={props.author.name} />
          <span>{props.author.name}</span>
        </div>
        <div>
          {props.children}
        </div>
      </footer>
    </div>
  )
}

export default Question