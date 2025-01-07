import { createContext, ReactNode, useEffect, useState } from "react";

interface User {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  genero: string;
  descicao: string;
  amigos: Object[];
  notificacoes: Object[];
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUserData: () => Promise<void>;
  setUserNull: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function fetchUserData() {
    console.log("userprov:", user);

    try {
      const response = await fetch("http://10.0.2.2:3008/getUserData", {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na resposta do servidor: ${response.status}`);
      }

      const data = await response.json();

      if (user != null) {
        return setUser(user);
      }

      if (data) {
        return setUser(data);
      } else {
        return fetchUserData();
      }
    } catch (error) {
      console.log("Erro ao buscar dados no fetch: ", error);
    }
  }

  function setUserNull() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData, setUserNull }}>
      {children}
    </UserContext.Provider>
  );
}
