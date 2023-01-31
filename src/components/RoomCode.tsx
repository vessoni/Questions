import copyImg from '../assets/images/copy.svg';

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button
      className="room-code rounded-lg bg-white p-3 flex items-center"
      onClick={copyRoomCodeToClipboard}
    >
      <div className="w-8 h-8">
        <img src={copyImg} alt="google logo" className="w-full h-full object-cover" />
      </div>
      <span className="ml-2 text-lg font-medium">Sala #{props.code}</span>
    </button>
  );
}
