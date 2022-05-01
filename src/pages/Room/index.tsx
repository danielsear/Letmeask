import './styles.css'

import logoImg from '../../assets/images/logo.svg'

import Button from '../../components/Button'

function Room(){
  return (
    <div id="page_room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>codigo da sala</div>
        </div>
      </header>
      <main >
        <div className="room_title">
          <h1>Sala React</h1>
          <span>numero de perguntas</span>
        </div>
        <form >
          <textarea placeholder='O que você quer perguntar'/>
          <div className="form_footer">
            <span>Para enviar uma pergunta,<a href='#'>faça seu login</a></span>
            <Button type='submit'>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Room