import { get, getDatabase, onValue, push, ref } from 'firebase/database';
import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { app } from '../services/firebase';

type RoomCode = {
  id: string;
};

type FirebaseQuestion = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHightlighted: boolean;
  }
>;

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHightlighted: boolean;
};

export function Room() {
  const { user, signOutwithGoogle } = useAuth();
  const params = useParams<{ id: string }>();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');
  const roomId = params.id;

  useEffect(() => {
    const db = getDatabase(app);
    onValue(ref(db, `rooms/${roomId}`), (snapshot) => {
      const data = snapshot.val();
      const firebaseQuestions: FirebaseQuestion = data.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHightlighted: value.isHightlighted,
          isAnswered: value.isAnswered,
        };
      });
      setTitle(data.title);
      setQuestions(parsedQuestions);
      console.log(parsedQuestions);
    });
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: { username: user.name, avatar: user.avatar },
      isHightlighted: false,
      isAnswered: false,
    };
    const db = getDatabase(app);
    await push(ref(db, `rooms/${roomId}/questions`), question);
    setNewQuestion('');
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6">
      <button onClick={signOutwithGoogle}>Logout </button>

      {user && <h1>{user.name}</h1>}
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <img src={logoImg} alt="" className="h-12" />
          <RoomCode code={roomId || ''} />
        </div>
      </header>

      <main className="mt-6">
        <div className="content">
          <div className="room-title flex justify-between items-center mb-6">
            <h1 className="text-2xl font-medium">Room {title}</h1>
            <span className="ml-2 text-sm">
              {questions.length > 0 && questions.length}
            </span>
          </div>

          <form className="bg-white rounded-lg p-6" onSubmit={handleSendQuestion}>
            <textarea
              placeholder="what do you want to ask?"
              className="block w-full h-32 border border-gray-400 rounded-lg p-2"
              onChange={(event) => setNewQuestion(event.target.value)}
              value={newQuestion}
            />
            <div className="form-footer mt-6 flex justify-between items-center">
              {user ? (
                <div className="user-info flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="ml-2 text-lg font-medium">{user.name}</span>
                </div>
              ) : (
                <span className="text-sm">
                  To send a question,{' '}
                  <button
                    type="button"
                    className="text-blue-500 underline hover:text-blue-800"
                  >
                    sign in
                  </button>
                </span>
              )}

              <Button type="submit" disabled={!user}>
                Send question
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
