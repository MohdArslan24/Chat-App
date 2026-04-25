import React from 'react'
import { useSelector } from 'react-redux'
import { FiMapPin, FiChevronRight, FiMessageCircle, FiArchive, FiUser, FiSettings } from 'react-icons/fi'


function Profile() {
  const { userData } = useSelector(state => state.user)
  // Mock data - replace with actual data from backend
  const profileData = {
    name: userData?.name || "Ismael Regan",
    location: "NY, New York",
    followers: 1501,
    following: 792,
    avatar: userData?.image || null
  }

  const menuItems = [
    {
      icon: FiMessageCircle,
      title: "Chats",
      subtitle: "Check your chat history",
      color: "text-blue-500"
    },
    {
      icon: FiArchive,
      title: "Archived",
      subtitle: "Find your archived chats",
      color: "text-purple-500"
    },
    {
      icon: FiUser,
      title: "My Profile",
      subtitle: "Change your profile details",
      color: "text-green-500"
    },
    {
      icon: FiSettings,
      title: "Settings",
      subtitle: "Password and Security",
      color: "text-orange-500"
    }
  ]

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U'
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-md mx-auto">
        
        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          
          {/* Avatar Section */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 p-1 shadow-md">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {profileData.avatar ? (
                  <img 
                    src={profileData.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                    {getInitials(profileData.name)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Name and Location */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {profileData.name}
            </h2>
            <div className="flex items-center justify-center gap-1 text-gray-500">
              <FiMapPin size={16} />
              <span className="text-sm">{profileData.location}</span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex items-center justify-between mb-8 px-4">
            {/* Followers */}
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {profileData.followers.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">
                Followers
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-12 bg-gray-200 mx-4"></div>

            {/* Following */}
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {profileData.following.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-1">
                Following
              </div>
            </div>
          </div>

        </div>

        {/* Menu Section */}
        <div className="space-y-0">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon
            const isLast = index === menuItems.length - 1
            
            return (
              <div key={index}>
                <button className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 text-left">
                  
                  {/* Icon */}
                  <div className={`flex-shrink-0 ${item.color}`}>
                    <IconComponent size={24} strokeWidth={1.5} />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>

                  {/* Chevron */}
                  <div className="flex-shrink-0 text-gray-300">
                    <FiChevronRight size={20} strokeWidth={1.5} />
                  </div>

                </button>

                {/* Separator */}
                {!isLast && (
                  <div className="h-px bg-gray-100 mx-6"></div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default Profile
