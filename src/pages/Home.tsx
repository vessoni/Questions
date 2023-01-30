import { useNavigate } from 'react-router-dom';

import googleIconImg from '../assets/images/google-icon.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function Home() {
  const navigate = useNavigate();

  const { user, signInwithGoogle } = useAuth();
  const handleCreateRoom = async () => {
    if (!user) {
      await signInwithGoogle();
    }
    navigate('/newRoom');
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <main className="mx-auto flex flex-col justify-center items-center w-full gap-6">
        <img src={logoImg} alt="letmeask" className="self-center my-5" />

        <button
          onClick={handleCreateRoom}
          className="flex items-center justify-center gap-3 h-12 rounded-md bg-red-500 px-8 delay-150 hover:bg-red-700 duration-150 text-white"
        >
          <img src={googleIconImg} alt="google logo" />
          Create room with Google
        </button>

        <div>
          <div className="flex flex-row items-center justify-center">
            <div className="h-[0.5px]  bg-gray-400 w-14" />
            <span className="text-sm p-1 text-gray-500">or enter a room</span>
            <div className="h-[0.5px]  bg-gray-400 w-14" />
          </div>

          <form className="flex flex-col items-center justify-center gap-5">
            <input
              type="text"
              placeholder="Type the room code"
              className="h-12 border rounded-md p-4 w-96"
            />
            <Button>Enter the room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
function collection(db: any, arg1: string): import('@firebase/database').Query {
  throw new Error('Function not implemented.');
}
