import './styles.css'

import {ButtonHTMLAttributes} from 'react' 

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
  


function Button(props: ButtonProps){
  return <button className="button" {...props}/>
}

export default Button