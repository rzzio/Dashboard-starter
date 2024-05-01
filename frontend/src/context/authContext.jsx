import { createContext, useContext, useState } from "react";
const authContext = createContext();

function useAuth() {
    const [authed, setAuthed] = useState(false);
    const [isSuperAdmin, setSuperAdmin] = useState(false)
    const [isTechnician, setTechnician] = useState(false)

    const login = async (email, password) => {
        try {
            const url = process.env.REACT_APP_API_URL + '/api/login'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                setAuthed(true);
                response.json().then((data) =>{
                    console.log(data)
                    sessionStorage.setItem('isSuperAdmin', data.user.is_super_admin)
                    sessionStorage.setItem('isTechnician', data.user.is_technician)
                    setSuperAdmin(data.user.is_super_admin)
                    setTechnician(data.user.is_technician)
                })
                sessionStorage.setItem('loggedIn', 'true')

                return {success: true}
            } else {
               return {success:false, message: 'Invalid Credentials'}
            }
        } catch (error) {
            return {success: false, message: 'Something wrong with server'}
        }
    };

    const logout = async () => {
        try {
            sessionStorage.setItem('loggedIn', 'false')
            setAuthed(false);
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    return {
        authed,
        isTechnician,
        isSuperAdmin,
        login,
        logout,
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();

    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return useContext(authContext);
}
