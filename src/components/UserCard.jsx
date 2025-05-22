const UserCard = ({ user }) => {
  // user: { id, name, location, avatarColor }
  const avatarColors = {
    blue: '#4A90E2',
    orange: '#F5A623',
    red: '#D0021B',
  };

  const avatarColor = avatarColors[user.avatarColor] || '#4A90E2';

  return (
    <div className="user-card">
      <div className="avatar" style={{ backgroundColor: avatarColor }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="7" r="5" fill="#F5D6B4" />
          <circle cx="12" cy="7" r="5" fillOpacity="0.2" />
          <path d="M4 21c0-4 8-4 8-4s8 0 8 4v1H4v-1z" fill={avatarColor} />
        </svg>
      </div>
      <div className="user-info">
        <div className="user-name">{user.name}</div>
        <div className="user-location">Locatie: {user.location}</div>
      </div>
    </div>
  );
};

export default UserCard;
