import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white text-center py-4">
      <h1 className="text-2xl font-bold">REVIEW APP</h1>
      <nav className="mt-2">
        <ul className="flex justify-center space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stats">Stats</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
