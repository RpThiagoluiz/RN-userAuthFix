import React, { createContext, useContext, useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as auth from "../services/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  signed: boolean;
  // token: string; -> nao tem necessidade de retornar o token.
  user: object | null; //de acordo com oq vc quer do usuario
  singIn: () => Promise<void>;
  singOut: () => void;
  loading: boolean; //-> pode usar aq tbm caso nao queira passar
}

const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
  //const [signed, setSigned] = useState(false); -> nao precisa retornar, caso exista um usuario ele ja retorna como true
  const [user, setuser] = useState<object | null>(null);
  //-> ele nao vai retornar como true, tanto essa variavel recebe null como um obj
  const [loading, setloading] = useState(true);

  useEffect(() => {
    //Loading aq pra nao ir na tela e voltar depois q pegar o valor
    const loadStoragedData = async () => {
      //const tokenAndUser= await AsyncStorage.multiGet(["@TestAuthTGL:user","@TestAuthTGL:token"])
      const storageUser = await AsyncStorage.getItem("@TestAuthTGL:user"); //vem como obj
      const storageToken = await AsyncStorage.getItem("@TestAuthTGL:token");

      //So pra mostrar o loading
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (storageUser && storageToken) {
        //Aq ja manda os dados existente do token para o server do back end
        setuser(JSON.parse(storageUser));
        setloading(false);
      }
    };
    loadStoragedData();
    clearTimeout();
  }, []);

  const singIn = async () => {
    const response = await auth.singIn();
    console.log(response);

    //tipar a chamada no services - ele saber oq ta vindo na resposta.
    //const { token, user:{email,name} } = response; -> desestruturar a responsa do obj user, pegando somente os dados la dentro
    const { token, user } = response;
    setuser(user);

    //Aq ja manda os dados existente do token para o server do back end

    await AsyncStorage.setItem("@TestAuthTGL:user", JSON.stringify(user)); //vem como obj
    await AsyncStorage.setItem("@TestAuthTGL:token", token);
  };

  const singOut = async () => {
    AsyncStorage.clear().then(() => {
      setuser(null);
    });
  };

  //Pode deixar aq se quiser
  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="purple" />
  //     </View>
  //   );
  // }

  //caso exista um user ele vai retornar um true or false
  //signed: Boolean(user)
  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, singIn, singOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
