// import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import {
	HomePage,
	ProjectsPage,
	ArticlesPage,

	// Site
	AboutPage,
	PoliciesPage,
	ContactPage,

	// Auth
	LoginPage,
	SignupPage,
	VerificationPage,
	SettingsPage,
	PasswordChangePage,
	PasswordResetPage,
} from 'pages/exports';
import NavigationDrawer from 'layout/navigationDrawer';
import { useReady, useAxios, useAuthData } from 'hooks/exports';
import { useAuth, useAuthUpdate } from 'contexts/exports';
import { getCookieInfo, deleteCookie } from 'utils/cookies';
import LoadingScreen from 'LoadingScreen';


export default function App() {

	const api = useAxios();
	const updateAuth = useAuthUpdate();
	const auth = useAuth();

	const { username } = useAuthData();
	const { isLoading, isLoggedIn } = useReady();

	function getAccessToken() {
		try {
			console.log("username :", username);
			console.log("auth.accessToken :", auth?.accessToken);
            if (username && !auth?.accessToken) {
                    // ===== REFRESH ACCESS TOKEN =====
                    api.post("/auth/refresh/")
                        .then( res => {
                            if (res?.data?.accessToken) {
                                // ===== UPDATE DATA WITH LOCAL STORAGE USER =====
                                updateAuth({ accessToken: res.data.accessToken });
                            } else {
                                updateAuth("clear");
                            }
                        }).catch( err => {
                            console.error(err);
                            updateAuth("clear");
                        })
            }
        } catch(e) {
            console.error(e);
        }
	}

	function getGoogleUserInfo() {
		if (isLoading || !isLoggedIn) return;
		// TODO: Add loading screen while retrieving user info
		
		
		// TODO: Change this to use access token in auth to get user data
		// TODO: On second thought create a useAccountInfo hook
		const cookie_info = getCookieInfo();
		if (cookie_info.type === null) return;
		api.get(`/${cookie_info.type}/me`)
			.then(res => {
				console.log(!!res?.data?.user_info, res?.data?.user_info)
				if (!!res?.data?.user_info) {
						updateAuth({ user: res.data.user_info });
					}
				})
			.catch(err => { });
	}

	function updateAccessToken() {
		const cookie_info = getCookieInfo();
		// console.table(cookie_info);
		if (cookie_info.val !== null) {
			deleteCookie(cookie_info.name);
			updateAuth({ accessToken: cookie_info.val });
		}
	}

	useEffect(() => {
		updateAccessToken();
		getAccessToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [username]);

	// useEffect( () => console.log("Logged In:", isLoggedIn), [isLoggedIn]);

	if (isLoading) return <LoadingScreen />;

	return (
		<>
			{/* <NavigationDrawer /> */}
			<NavigationDrawer />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="projects" element={<ProjectsPage />} />
				<Route path="articles" element={<ArticlesPage />} />
				<Route path="about" element={<AboutPage />} />
				<Route path="policies" element={<PoliciesPage />} />
				<Route path="contact" element={<ContactPage />} />

				{isLoggedIn
					? <>
						<Route path="settings" element={<SettingsPage />} />
						<Route path="password-change" element={<PasswordChangePage />} />
					</>
					:
					<>
						<Route path="login" element={<LoginPage />} />
						<Route path="signup" element={<SignupPage />} />
						<Route path="verify" element={<VerificationPage />} />
						<Route path="password-reset" element={<PasswordResetPage />} />
					</>
				}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</>
	);
}