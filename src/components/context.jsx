import { createContext, useState } from "react"

export const context = createContext()
const Provider = context.Provider

const CustomProvider = (props) => {

    const [rol, setRol] = useState(() => localStorage.getItem("userRol") || null);
    const [id, setId] = useState(() => localStorage.getItem("userId") || null);
    const [token, setToken] = useState(() => localStorage.getItem("authToken") || null);


    const ctx = {
  
        rol : rol,
        setRol: setRol,
        id : id, 
        setId : setId,
        token : token,
        setToken : setToken
  
    }  

    return (
        <Provider value={ctx}>
            {props.children}
        </Provider>
    )
}
export default CustomProvider