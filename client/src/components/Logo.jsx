import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex">
      <img src="/CrackerlogoPurple.png" width="70px" alt="Logo" />
      <h1 className="text-4xl font-semibold tracking-wide text-[#a66dd4]">
        Cracker.
      </h1>
    </Link>
  );
};

export default Logo;
