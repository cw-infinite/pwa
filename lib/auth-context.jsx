import { createContext, useContext, useEffect, useState } from "react"
import { account } from "./appwrite"
import { ID } from "react-native-appwrite"
// type AuthContextTypes {
//     user:
//      loadingUser
//     signUp:
//     signIn:
// }

const AuthContext = createContext(undefined)

export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try{
            const session = await account.get()
            setUser(session);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false)
        }
    }

    const signUp = async (email, password, name) => {
        try {
            console.log("worked")
            await account.create(ID.unique() ,email, password, name)
            await signIn(email, password);
            console.log("done?")
            return null;
        } catch (error) {
            if (error instanceof Error){
                return error.message;
            }
            return "An error occured during signup"
        }
    }
    const signIn = async (email, password) => {
        try {
            await account.createEmailPasswordSession(email, password)
            const session = await account.get();
            setUser(session);
            return null;
        } catch (error) {
            if (error instanceof Error){
                return error.message;
            }
            return "An error occured during sign in"
        }
    }

    const signOut = async () => {
        try{
            console.log("signout")
            await account.deleteSession("current");
            setUser(null);
            
        } catch (error) {
            console.log(error)
        }
    }
    return <AuthContext.Provider value={{user, isLoading, signUp, signIn, signOut}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined){
        throw new Error("userAuth must be inside of the AuthProvider");
    }

    return context;
}