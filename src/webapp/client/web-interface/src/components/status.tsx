import { FC, useContext, useState } from 'react';
import { AuthContext } from '../providers/auth-provider';

const Status: FC = () => {
    const { fetchFromBackend, isAuthenticated } = useContext(AuthContext);
    const [ userInfo, setUserInfo ] = useState("");

    async function fetchUserInfo() {
        // const response = await fetchFromBackend('https://api.lennardvanderplas.com/task', 
        //     'POST',
        //     {title: 'title', description: 'description'},
        // );

        const response = await fetchFromBackend('https://api.lennardvanderplas.com/task', 
            'GET',
        );
        
        setUserInfo(response);
    }

    function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        console.log('clicked');
        if (!isAuthenticated) return;
        fetchUserInfo();
    }

    const loginUrl = 'https://auth.lennardvanderplas.com/login?client_id=2r1po1ganeb8fctkubs6lch5ke&response_type=code&scope=email+openid+profile&redirect_uri=http%3A%2F%2Flocalhost:5173/';

    return (
        <div>
            { isAuthenticated ? 
                <div>
                    <button onClick={handleSubmit}>
                        click
                    </button>
                    <p>
                        {`${JSON.stringify(userInfo)}`}
                    </p>
                </div> 
                : 
                <a href={loginUrl}>
                    login
                </a> }
        </div>
    );
};

export default Status;