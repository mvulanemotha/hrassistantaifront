// src/components/Header.jsx
const Header = () => {
  return (
    <>
      <nav className="flex justify-between items-center px-8 py-4 shadow">
        <h1 className="text-2xl font-bold text-gray-800">
          <a href="/" className="hover:text-blue-600">
            HR Assistant AI
          </a>
        </h1>
        <div className="space-x-4">
          <a
            href="/login"
            className="hover:text-blue-600 font-bold text-gray-600"
          >
            Login
          </a>
          <a
            href="/register"
            className="hover:text-blue-600 font-bold text-gray-600"
          >
            Register
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
