import { groupEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const {
    GET_ALL_GROUP,
    GET_USER_GROUP,
    CREATE_GROUP
} = groupEndpoints;


export const getUserGroup = async(data)=>{
    try {
        const response = await apiConnector("POST",GET_USER_GROUP,{userId:data});

        return response.data;
    } catch (error) {
        console.log("error",error);
    }
}

export const getAllGroup = async()=>{
    try {
        const response = await apiConnector("POST",GET_ALL_GROUP);

        return response.data;
    } catch (error) {
        console.log("error",error);
    }
}

export const createGroup = async(data) => {
    try {
        const response  = await apiConnector("POST",CREATE_GROUP,data);
        return response.data;
    } catch (error) {
        console.log("erroe",error);
    }
}