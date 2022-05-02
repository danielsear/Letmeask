import './styles.css'
import copyImg from '../../assets/images/copy.svg'

function RoomCode(){
  return (
    <div className="room_code">
      <div>
        <img src={copyImg} alt="Copy room code " />
      </div>
      <span>Sala  #4451515215</span>
    </div>
  )
}

export default RoomCode