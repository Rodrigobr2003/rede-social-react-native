import { useSegments } from "expo-router";
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
}

export const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const segments = useSegments();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentPath = segments.join("/");

        if (currentPath !== "") {
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

          setUser(data);
        } else {
          return;
        }
      } catch (error) {
        console.log("Erro ao buscar dados no fetch: ", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
