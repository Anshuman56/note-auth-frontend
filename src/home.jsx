import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4 text-center">
      <div>
        <Link className="p-4 underline" to={"/login"}>
          Login
        </Link>
        <Link className="p-4 underline" to={"/register"}>
          Register
        </Link>
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
        Welcome back{" "}
        <Link className=" underline" to={"/notes"}>
          notes
        </Link>
      </h1>
    </div>
  );
}
