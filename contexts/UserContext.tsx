import React, { useState, useEffect, createContext } from "react";
import { supabase } from "../utils/supabase";
import { useAccount } from "wagmi";

interface IUserContextData {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<object>>;
}

export const UserContext = createContext<IUserContextData>(
  {} as IUserContextData
);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({});
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      getUser(address);
    }
  }, [address]);

  async function getUser(address: string) {
    if (address) {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("address", address)
          .single();

        if (error) {
          throw error;
        } else {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  }

  return (
    <UserContext.Provider
      value={
        {
          user,
          setUser,
        } as IUserContextData
      }
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
