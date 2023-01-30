import { getDatabase, ref, set } from 'firebase/database';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { app } from '../services/firebase';

export function NewRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }
    const db = getDatabase(app);
    set(ref(db, 'rooms'), {
      id: user?.id + newRoom,
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`/rooms/${user?.id + newRoom}`);
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <main className="mx-auto flex flex-col justify-center items-center w-full gap-6">
        <img src={logoImg} alt="letmeask" className="self-center my-5" />

        <div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg">Create a new room</span>
          </div>

          <form
            onSubmit={handleCreateRoom}
            className="flex flex-col items-center justify-center gap-5"
          >
            <input
              type="text"
              placeholder="Name of the room"
              className="h-12 border rounded-md p-4 w-96"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button>Create</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
