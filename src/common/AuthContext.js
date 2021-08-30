const auth = {
    login: false,
    setLogin: function (value) {
      this.login = value;
    },
  };
  
  const AuthContext = React.createContext(auth);
  
  export default AuthContext;
  