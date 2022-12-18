import { 
    useState,
    useEffect,
    createContext,
    useContext,
} from 'react';

const AuthContext = createContext();
const AuthUpdateContext = createContext();

const useAuth = () => useContext(AuthContext);
const useAuthUpdate = () => useContext(AuthUpdateContext);

function AuthProvider({children}) {

    const [data, setData] = useState({});

    async function storeData(new_data) {
        let user;

        if (new_data.hasOwnProperty("user")) {
            user = new_data.user;
        }

        if (new_data === 'clear') {
            // ===== CLEAR ALL DATA (data state & local storage) =====
            localStorage.removeItem("user");
            setData({});
        } else {
            // ===== ADD NEW DATA TO EXISTING DATA (only data state) =====
            setData( d => ({...d, ...new_data}));
        }

        if (user) {
            // ===== ADD NEW USER DATA TO EXISTING USER DATA (in local storage) =====
            // But Only username & photo
            let username = user?.username;
            let photo = user?.photo;

            let local_user = JSON.parse(localStorage.getItem("user"));
            if (local_user === null) { local_user = {}; };

            if (username) { local_user.username = username; };
            if (photo) { local_user.photo = photo; };
            
            localStorage.setItem("user", JSON.stringify(local_user));
        }
    };

    /**
     * Retrieves data from local storage and combines with data state.
     * Used primarily when a page has been refreshed.
     * Less expensive to retrieve from local storage once and then retrieve from state x amount of times
     */
    async function getData() {
        try {
            // Check if user was logged in previously by searching for 'user' in local storage
            const local_user = JSON.parse(localStorage.getItem("user"));
            console.log("local user :", local_user);
            if (local_user !== null) {
                setData( d => ({...d, user: local_user}) );
            }
        } catch(e) {
            console.error(e);
        }
    }

    async function updateData(new_data) {
        const updated = await storeData(new_data);
        if (updated) {
            getData(new_data);
        }
    }

    useEffect( () => {
        getData();
    }, []);

    return (
        <AuthContext.Provider value={data}>
            <AuthUpdateContext.Provider value={updateData}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}

export { useAuth, useAuthUpdate, AuthProvider };