const UserInfoBox = ({ email, points }) => (
  <div className="user-info-box p-4 mb-4">
    <div className="mb-2">
      <span className="user-label">Email:</span>
      <span className="user-value">{email}</span>
    </div>
    <div className="mb-2">
      <span className="user-label">Puntos:</span>
      <span className="user-value">{points}</span>
    </div>
  </div>
);

export default UserInfoBox;