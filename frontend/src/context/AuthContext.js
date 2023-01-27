import React, { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default: 
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        const fetchUser = async (user) => {
            const headers = {
                'Authorization': user.token
            }
            const response = await fetch('/api/user/'+user.id, { headers });
            const json = await response.json();
    
            if(response.ok) {
                // merge the json data with the user object
                const updatedUser = {...user, ...json}
                // update the state with the merged data
                dispatch({ type: 'LOGIN', payload: updatedUser})
            }
        }
    
        if (user) {
            try {
            fetchUser(user)
            } catch(err) {
                console.log(err)
            }
        }
    }, [])
    

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}