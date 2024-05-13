import { FC, useContext, useState } from 'react';
import { AuthContext } from '../providers/auth-provider';

const Status: FC = () => {
    const { token } = useContext(AuthContext);
    const [ userInfo, setUserInfo ] = useState("");

    async function fetchUserInfo(token: string) {
        const response = await fetch('https://api.lennardvanderplas.com', {
            method: 'POST',
            //mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
                Accept: '*/*',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                hello: 'world',
            }),
        });
    
        if (!response.ok) {
            console.error('Failed to fetch user info');
            return;
        }
    
        setUserInfo(await response.json());
    }

    function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        console.log('clicked');
        if (!token) return;
        fetchUserInfo(token.idToken);
    }

    //const loginUrl = 'https://auth.lennardvanderplas.com/login?client_id=2r1po1ganeb8fctkubs6lch5ke&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Flennardvanderplas.com';
    const loginUrl = 'https://auth.lennardvanderplas.com/login?client_id=2r1po1ganeb8fctkubs6lch5ke&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost:5173/';

    return (
        <div>
            { token ? <div><button onClick={handleSubmit}>click</button><p>{`${JSON.stringify(userInfo)}`}</p></div> : <a href={loginUrl}>login</a> }
        </div>
    );
};

export default Status;