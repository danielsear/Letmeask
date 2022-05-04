import './styles.css'

import {ButtonHTMLAttributes} from 'react' 

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}
  

function Button({isOutlined = false, ...props}: ButtonProps){
  return (
    <button 
    className={`button ${isOutlined ? 'outlined' : ''}` }
    {...props}
    />
  ) 
}

export default Button