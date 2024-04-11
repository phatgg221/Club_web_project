// ClientSideUsername.js
import { useAuth } from "../contexts/AuthContext";

export default function ClientSideUsername() {
  const { username } = useAuth();

  return (
    <p>
      Username: <span>{username}</span>
    </p>
  );
}
