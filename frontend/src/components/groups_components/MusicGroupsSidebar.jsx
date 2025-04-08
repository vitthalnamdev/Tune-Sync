import React, { useEffect, useState } from "react";
import {
  Headphones,
  Users,
  Music,
  ChevronDown,
  ChevronRight,
  User,
  Plus,
  Play,
  Pause,
} from "lucide-react";
import { useGroup } from "../../pages/contexts/GroupContext";
import { deleteGroup, exitGroup } from "../../services/operations/groups";

const MusicGroupsSidebar = ({ groups, toggleGroup }) => {
  const { groupState, updateGroupState } = useGroup();
  // Sample data for music listening groups
  // const [groups, setGroups] = useState([
  //   {
  //     id: 1,
  //     name: "Rock Enthusiasts",
  //     expanded: true,
  //     currentlyPlaying: "Bohemian Rhapsody - Queen",
  //     isPlaying: true,
  //     members: [
  //       { id: 1, name: "Alex Johnson", host: true, online: true },
  //       { id: 2, name: "Jamie Smith", host: false, online: true },
  //       { id: 3, name: "Taylor Brown", host: false, online: true }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: "Chill Vibes",
  //     expanded: false,
  //     currentlyPlaying: "Lofi Study Mix",
  //     isPlaying: true,
  //     members: [
  //       { id: 4, name: "Sam Wilson", host: true, online: true },
  //       { id: 5, name: "Morgan Lee", host: false, online: true },
  //       { id: 6, name: "Casey Martinez", host: false, online: false }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     name: "Friday Night Party",
  //     expanded: false,
  //     currentlyPlaying: null,
  //     isPlaying: false,
  //     members: [
  //       { id: 7, name: "Riley Cooper", host: true, online: true },
  //       { id: 8, name: "Jordan Evans", host: false, online: false }
  //     ]
  //   }
  // ]);
  console.log("groups", groups);
  // Toggle group expansion

  // Join a group
  const joinGroup = (groupId) => {
    // This would be implemented with your actual join logic
    console.log(`Joining group ${groupId}`);
  };

  const token = localStorage.getItem("token");
  const leaveGroup = async (data) => {
    try {
      if (groupState.isAdmin) {
        const response = await deleteGroup(data, token);
      } else {
        const response = await exitGroup(data, token);
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

  return (
    <div className=" w-full h-[560px] bg-gray-900 border-r border-gray-700 flex flex-col text-gray-200">
      {/* Header */}
      <div className="p-4 bg-gray-800 text-white font-semibold flex items-center justify-between">
        <div className="flex items-center">
          <Headphones className="mr-2" size={20} />
          <span>Listening Groups</span>
        </div>
        <button className="text-gray-300 hover:text-white bg-gray-700 p-1 rounded-full">
          <Plus size={18} />
        </button>
      </div>

      {/* Create Group Button */}
      <div className="px-4 py-3">
        <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center">
          <Users className="mr-2" size={16} />
          <span>Create New Group</span>
        </button>
      </div>

      {/* Groups */}
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        {groups.map((group) => (
          <div key={group._id} className="border-b border-gray-700">
            <div
              className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-800"
              onClick={() => toggleGroup(group._id)}
            >
              <div className="flex items-center">
                {group.expanded ? (
                  <ChevronDown size={16} className="mr-2 text-gray-400" />
                ) : (
                  <ChevronRight size={16} className="mr-2 text-gray-400" />
                )}
                <span className="font-medium">{group.name}</span>
              </div>
              <div className="flex gap-2 items-center">
                {group._id == groupState.groupId && (
                  <button
                    className=" text-red-500 font-semibold hover:scale-110 "
                    onClick={(e) => {
                      e.preventDefault();
                      leaveGroup({ groupId: group._id });
                    }}
                  >
                    Leave
                  </button>
                )}

                {group.isPlaying && (
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                )}
                <span className="text-xs text-gray-400">
                  {group.members.length}
                </span>
              </div>
            </div>

            {/* Group details when expanded */}
            {group.expanded && (
              <div className="bg-gray-800 pb-2">
                {/* Currently playing song */}
                {/* {group.currentlyPlaying && (
                  <div className="px-6 py-2 flex items-center">
                    {group.isPlaying ? 
                      <Pause size={14} className="text-green-400 mr-2" /> : 
                      <Play size={14} className="text-gray-400 mr-2" />
                    }
                    <div className="text-xs">
                      <div className="text-green-400">Now Playing:</div>
                      <div className="text-gray-300">{group.currentlyPlaying}</div>
                    </div>
                  </div>
                )}  */}

                {/* Members in group */}
                <div className="mt-1">
                  {group.members.map((member) => (
                    <div
                      key={member.id}
                      className="px-6 py-2 flex items-center hover:bg-gray-700"
                    >
                      <div className="relative mr-3">
                        <User size={16} className="text-gray-400" />
                        <div
                          className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full ${
                            member.online ? "bg-green-500" : "bg-gray-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm">{member.firstName}</span>
                        {member._id == group.admin._id && (
                          <span className="ml-2 text-xs text-purple-400">
                            (Host)
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Join button */}
                <div className="px-6 pt-2">
                  <button
                    className="w-full py-1 text-xs bg-purple-700 hover:bg-purple-600 rounded text-white"
                    onClick={() => joinGroup(group.id)}
                  >
                    Join Session
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Status footer */}
      <div className="px-4 py-3 bg-gray-800 text-xs text-gray-400 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span>6 friends listening</span>
        </div>
        <div className="flex items-center">
          <Music size={14} className="mr-1" />
          <span>3 active groups</span>
        </div>
      </div>
    </div>
  );
};

export default MusicGroupsSidebar;
