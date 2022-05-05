import './styles.css'

import cx from 'classnames'

import { ReactNode} from 'react'

type QuestionProps ={
  content: string,
  author: {
    name: string,
    avatar: string
  },
  children?:ReactNode,
  isAnswered?: boolean,
  isHighLighted?: boolean
}

function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighLighted = false
}: QuestionProps){
  return (
    <div 
    className={cx('question',
      {answered: isAnswered},
      {highLighted :isHighLighted && !isAnswered}
    )}
    >
      <p>{content}</p>
      <footer>
        <div className="user_info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className='div_buttons'>
          {children}
        </div>
      </footer>
    </div>
  )
}

export default Question