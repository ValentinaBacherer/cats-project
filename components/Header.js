import Link from "next/link";

const Header = () => {
  return (
    <header id="header">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/new">New</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
