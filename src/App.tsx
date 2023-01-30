import { Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

export default function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newRoom" element={<NewRoom />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </AuthContextProvider>
  );
}
