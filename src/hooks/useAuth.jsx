import { useContext } from "react"
import Authcontext from "../components/Authcontext"

export const useAuth=()=>{
    return useContext(Authcontext)
}