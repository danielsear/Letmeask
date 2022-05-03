import './styles.css'
import copyImg from '../../assets/images/copy.svg'




function RoomCode(props: any){

  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code)
  }
  

  return (
    <div className="room_code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code " />
      </div>
      <span>Sala  #{props.code}</span>
    </div>
  )
}

export default RoomCode