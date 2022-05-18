
import { useState, useEffect } from 'react';

const useAdmin = user => {
    const [admin, setAdmin] = useState();
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(() => {
        const email = user?.email;
        fetch(`https://pacific-badlands-31165.herokuapp.com/admin/${email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin);
                setAdminLoading(false);
            })
    }, [user, adminLoading])

    return [admin, adminLoading]
}
export default useAdmin;