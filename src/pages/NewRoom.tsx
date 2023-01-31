import { child, getDatabase, push, ref, set } from 'firebase/database';
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
    // set ->	Write or replace data to a defined path, like messages/users/<username>
    // update ->	Update some of the keys for a defined path without replacing all of the data
    // push ->	Add to a list of data in the database. Every time you push a new node onto a list, your database generates a unique key, like messages/users/<unique-user-id>/<username>
    // transaction ->	Use transactions when working with complex data that could be corrupted by concurrent updates

    const firebaseRoom = await push(ref(db, 'rooms'), {
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`/room/${firebaseRoom.key}`);
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
