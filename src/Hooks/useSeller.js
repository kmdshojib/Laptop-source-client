import { useEffect, useState } from "react";

const useSeller = email => {
    const [isSeller, setisSeller] = useState(false);
    const [isSellerLoading, setisSellerLoading] = useState(true)
    useEffect(() => {
        if(email){
            fetch(`https://laptop-source-server-kmdshojib.vercel.app/users/seller/${email}`)
            .then((response) =>response.json())
            .then(data => {
                console.log(data)
                setisSeller(data.isSeller)
                setisSellerLoading(false)
            })
        }
    }, [email])
    return [isSeller, isSellerLoading]
}

export default useSeller;