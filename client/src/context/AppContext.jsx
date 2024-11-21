import { createContext } from "react"
import {Toaster} from "react-hot-toast"


export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    return <AppContext.Provider value={{}}>
        <>
        <Toaster/>
        {children}
        </>
        
    </AppContext.Provider>
}