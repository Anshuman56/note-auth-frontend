import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Link className="p-4 underline" to={"/login"}>
        Login
      </Link>
      <Link className="p-4 underline" to={"/register"}>
        Register
      </Link>
      <h1>
        Welcome back{" "}
        <Link className=" underline" to={"/notes"}>
          notes
        </Link>
      </h1>
    </>
  );
}
