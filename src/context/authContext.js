import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // user state (null = logged out)
    const [user, setUser] = useState(null);

    // load user from localStorage on app start
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
        setUser(JSON.parse(savedUser));
        }
    }, []);

    // login function
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
