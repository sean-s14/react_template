import { 
    useState,
    useEffect,
    createContext,
    useContext,
} from 'react';

const AuthContext = createContext();
const AuthUpdateContext = createContext();

const useAuth = () => {
    return useContext(AuthContext);
}

const useAuthUpdate = () => {
    return useContext(AuthUpdateContext);
}

function AuthProvider({children}) {

    const [userData, setUserData] = useState({});

    const storeUserData = async (newUserData) => {
        console.log("New User Data :", newUserData)
        if (newUserData === 'clear') {
            // Clear Auth Data
            localStorage.setItem('userData', {});
            setUserData({});
        } else {
            try {
                let oldUserData = localStorage.getItem('userData');
                console.log('Old User Data :', typeof oldUserData, ':', oldUserData);
                newUserData = {
                    ...oldUserData, 
                    ...newUserData
                };
                // await AsyncStorage.setItem('userData', newUserData);
                localStorage.setItem('userData', newUserData);
                setUserData(newUserData);
            } catch (e) { console.log(e); }
        }
    };

    const getUserData = async () => {
        try {
            const newUserData = localStorage.getItem('userData');
            console.log("New User Data :", newUserData);
            if (newUserData !== null && newUserData !== '') { 
                setUserData(newUserData);
            }
        } catch(e) {
            console.log(e);
        }
    }

    const updateUserData = (newUserData) => {
        storeUserData(newUserData);
        getUserData(newUserData);
    };

    useEffect( () => {
        getUserData();
    }, []);


    return (
        <AuthContext.Provider value={userData}>
            <AuthUpdateContext.Provider value={updateUserData}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}

export { useAuth, useAuthUpdate, AuthProvider };