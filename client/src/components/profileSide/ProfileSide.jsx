import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import './ProfileSide.css'
const ProfileSide = () => {
  return (
    <div className="ProfileSide">
        {/* <LogoSearch/> */}
        
        <ProfileCard location = 'homepage'/>
        <div className="responsive-followers-card">
  <FollowersCard />
</div>
    </div>
    )
}

export default ProfileSide