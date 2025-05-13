import { useEffect, useState, createContext , useContext } from "react";
import { fetchProfile } from "../../services/operations/auth";
import { useSelector } from "react-redux";

// Create a context
export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileData,setProfileData] = useState(localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const check =  await fetchProfile();
        if(!check){
           setProfileData(null);
        }
      } catch (error) {
        setProfileData(null);
        console.error("Failed to fetch profile:", error);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <ProfileContext.Provider value={{ profileData , setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a profileProvider");
  }
  return context;
};
