import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async() => {
            setLoading(true);
            // const token = localStorage.getItem('token'); // Retrieve the token from local storage
            try {
                const res = await fetch("http://localhost:5000/users");
                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }

                setConversations(data)
            }
            catch(error){
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        } 
        getConversations();
    },[]);
    return {loading, conversations};
}

export default useGetConversation