import { useEffect, useState } from 'react';

const Icons = {
    ChevronDownDark: '/icons/chevron_down_dark.svg'
}

const AppBarProfile = ({userProfile}) => {
    const [profileData, setProfileData] = useState(userProfile);

    useEffect(() => {
        if (userProfile) {
          // Update profileData setiap kali userProfile berubah
          setProfileData(userProfile);
        }
      }, [userProfile]);

    console.log("User profile in AppBarProfile:", userProfile);

  return (
    <div className="appbar-profile profile-dropdown">
      <div className="drop-info">
        <div className="drop-info-img">
        <img
          src={userProfile && userProfile.user && userProfile.user.img_user ?
             `http://127.0.0.1:8000/storage/${userProfile.user.img_user}`
            : '/images/profile_image.png'}

        />
        </div>
        <div className="drop-info-text">
          <div className="info-text-group">
            <span>{userProfile && userProfile.user && userProfile.user.username}</span>
            <span>{userProfile && userProfile.user && userProfile.user.role}</span>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AppBarProfile;
