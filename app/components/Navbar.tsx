import { Link } from "react-router";

export default function Navbar() {
  console.log('in navbar')
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>  
  );
}