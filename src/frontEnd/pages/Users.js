import React, { useEffect, useState } from 'react';

const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers = useState();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users'); //default fetch() type is a GET request
    
                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setLoadedUsers(responseData.users);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        }
        sendRequest();
    }, []);

    const errorHandler = () => {
        setError(null);
    }
    return (
        <>
            <ErrorModal error={error} onClear={errorHandler} />
            {
                isLoading && (
                    <div className="center">
                        <LoadingSpinner />
                    </div>
            )}
            {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
        </>
    )
};

export default Users;