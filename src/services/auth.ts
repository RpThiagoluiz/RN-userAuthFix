interface Reponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

//Tipando a resposta que vai vir dessa promise
export const singIn = (): Promise<Reponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        token: "udpaigiudgasud19023891jakgda",
        user: {
          name: "thiago",
          email: "admilson@gmail.com",
        },
      });
    }, 2000);
  });
};
