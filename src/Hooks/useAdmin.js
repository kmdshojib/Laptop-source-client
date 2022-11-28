import { useEffect, useState } from "react";

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    useEffect(() => {
        if(email){
            fetch(`https://laptop-source-server-kmdshojib.vercel.app/users/admin/${email}`)
            .then((response) =>response.json())
            .then(data => {
                console.log(data)
                setIsAdmin(data.isAdmin)
                setIsAdminLoading(false)
            })
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;