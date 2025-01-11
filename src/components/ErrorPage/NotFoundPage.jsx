import { MdEngineering } from "react-icons/md";

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-500 flex justify-center">404</h1>
        <h1 className="text-9xl font-extrabold text-red-500 flex justify-center"><MdEngineering /></h1>
        <p className="mt-4 text-xl text-gray-700">Oops! The page you're looking for doesn't exist.</p>
        <p className="mt-2 text-lg text-gray-500">You might have mistyped the address or the page may have moved.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;
