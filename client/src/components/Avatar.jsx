const UserAvatar = ({ name }) => {
  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <div className="avatar placeholder">
      <div className="bg-neutral text-neutral-content w-12 rounded-full">
        <span className="text-2xl">{getInitials(name)}</span>
      </div>
    </div>
  );
};

export default UserAvatar;
