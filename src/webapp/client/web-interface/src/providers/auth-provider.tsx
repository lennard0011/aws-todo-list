import { FC, ReactNode, createContext, useEffect, useState } from 'react';


type Token = {
    idToken: string;
    accessToken: string;
    refreshToken: string;
}

type AuthContextProps = {
    token: Token | undefined;
}

export const AuthContext = createContext<AuthContextProps>({
    token: undefined,
});

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState(undefined as Token | undefined);

    // First check if user has a token, if so, set isAuthenticated to true
    // If no token, check if code in URL, if so, fetch token and set isAuthenticated to true
    // If no token or code, set isAuthenticated to false and redirect to login page

    useEffect(() => {
        async function fetchToken(code: string) {            
            const grantType = 'authorization_code';
            const clientId = '2r1po1ganeb8fctkubs6lch5ke';
            const redirectUri = 'http://localhost:5173/';

            const body = `grant_type=${grantType}&client_id=${clientId}&redirect_uri=${redirectUri}&code=${code}`
            const response = await fetch(`https://auth.lennardvanderplas.com/oauth2/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body,
            });

            if (!response.ok) {
                console.error('Failed to fetch token');
                setToken(undefined);
                return;
            }

            const responseJson = await response.json();
            const token: Token = {
                idToken: responseJson.id_token,
                accessToken: responseJson.access_token,
                refreshToken: responseJson.refresh_token,
            };
            document.cookie = `token=${JSON.stringify(token)}`;
            setToken(token);
        }

        if (token) return;

        const cookieTokenString = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");

        if (cookieTokenString) {
            const cookieToken = JSON.parse(cookieTokenString);
            setToken(cookieToken);
            //setIsAuthenticated(true);
            return;
        }

        // Check if code is in URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            fetchToken(code);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;