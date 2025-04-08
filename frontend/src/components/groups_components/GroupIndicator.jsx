import { Users, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useGroup } from "../../pages/contexts/GroupContext";
import { deleteGroup, exitGroup } from "../../services/operations/groups";

export default function GroupIndicator() {
  const [groupName, setGroupName] = useState("Design Team");
  const { groupState, updateGroupState } = useGroup();

  const token = localStorage.getItem("token");
  const handleLeaveGroup = async (data) => {
    try {
        if(groupState.isAdmin){
            const response = await deleteGroup({groupId:groupState.groupId},token);
        }else{
            const response = await exitGroup({groupId:groupState.groupId}, token);
        }

      await updateGroupState({
        isInGroup: false,
        groupId: null,
        isAdmin: false,
        groupName: null,
      });
    } catch (error) {
      console.log("error while leaving group");
    }
  };

  const [position, setPosition] = useState("top-[70px]");

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setPosition("top-0"); // Change position to top-0 when scrolled more than 30px
      } else {
        setPosition("top-[70px]"); // Reset to top-30 when scroll is less than or equal to 30px
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: Remove the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed ${position} transition-all duration-300 left-0 right-0 z-0 flex justify-center`}
    >
      <div className="flex items-center justify-between px-4 py-2 mt-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 text-white">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-green-400" />
          <span className="text-sm font-medium">{groupState.groupName}</span>
        </div>

        <button
          onClick={handleLeaveGroup}
          className="flex items-center gap-1 ml-6 text-xs text-gray-300 hover:text-red-400 transition-colors duration-200"
        >
          <LogOut size={14} />
          <span>Leave</span>
        </button>
      </div>
    </div>
  );
}
