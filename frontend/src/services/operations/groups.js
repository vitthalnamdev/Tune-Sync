import { groupEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import toast from "react-hot-toast";

const {
    GET_ALL_GROUP,
    GET_USER_GROUP,
    CREATE_GROUP,
    EXIT_GROUP,
    DELETE_GROUP
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

export const exitGroup = async(data,token)=>{
    try {
        const response = await apiConnector("POST",EXIT_GROUP,data,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        );
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error("something went wrong");
    }
}

export const deleteGroup = async(data,token)=>{
    try {
        const response = await apiConnector("POST",DELETE_GROUP,data,
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        );
        toast.success(response.data.message);
        return response.data;
    } catch (error) {
        console.log(error);
        toast.error("something went wrong");
    }
}