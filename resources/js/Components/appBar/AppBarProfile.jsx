
const Icons = {
    ChevronDownDark: '/icons/chevron_down_dark.svg'
}

const AppBarProfile = () => {
  return (
    <div className="appbar-profile profile-dropdown">
      <div className="drop-info">
        <div className="drop-info-img">
          <img src="/images/profile_image.png" alt="" />
        </div>
        <div className="drop-info-text">
          <div className="info-text-group">
            <span>Musfiq</span>
            <span>Admin</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AppBarProfile;
