//This is the component displayed whe an invalid/unknown route is accessed in the website
const ErrorNotFound = () => {
    return (
        <section className=" flex items-center justify-center min-h-screen bg-gray-100 p-5">
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
                <p className="text-gray-600 mt-2">Sorry, but the page you were trying to view does not exist.</p>
                <a href="/" className="inline-block mt-5 px-6 py-2 text-sm font-medium text-white bg-lime-700 rounded hover:bg-lime-600">
                    Go Home
                </a>
            </div>
        </section>
    );
};

export default ErrorNotFound;
