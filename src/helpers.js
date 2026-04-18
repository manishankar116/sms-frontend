
export const checkUser = () => {
    const storedRole = localStorage.getItem('role')
    const storedToken = localStorage.getItem('token');


    if (storedRole && storedToken) {
      return { role: storedRole, token: storedToken }
    }
    else{
      return null;
    }

}