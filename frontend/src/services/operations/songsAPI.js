import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector";
import { songEndpoints } from "../apis";

const {
   GET_SONG,
   AUTOSUGGETION_API,

} = songEndpoints;

export const fetchSuggetions = async(data)=> {
    let result = [];
    
    try {
        const response = await apiConnector("GET",AUTOSUGGETION_API,null,null,{q:data});
        console.log("suggestion data", response);
        if(!response.data.success){
            throw new Error(response);
        }
        
        result = response.data.data;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
    return result;
}