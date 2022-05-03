import './styles.css'

type QuestionProps ={
  content: string,
  author: {
    name: string,
    avatar: string
  }
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
        <div></div>
      </footer>
    </div>
  )
}

export default Question