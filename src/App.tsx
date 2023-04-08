import { useEffect, useState } from 'react';
import Index from './pages'
import { socket } from './services/socket';
import { mouseMove } from './hooks/mouseMove';

interface IUser {
  id: number;
  x: number;
  y: number;
}

function App() {
  const [id, setId] = useState(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const mousePos = mouseMove();

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('id', (id) => {
      console.log(id)
      setId(id);
    });

    socket.on('mouseMove', (users: IUser[]) => {
      console.log(users)
      setUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.emit('mouseMove', mousePos);
  }, [mousePos]);

  return (
    <>
      {users.map((user) => {
        if (user.id === id) return null;
        return (
          <div
            key={user.id}
            style={{
              position: 'absolute',
              top: user.y,
              left: user.x,
              width: 10,
              height: 10,
              backgroundColor: user.id === id ? 'red' : 'blue',
            }}
          />
        );
      })}
      <Index />
    </>
  )
}

export default App
