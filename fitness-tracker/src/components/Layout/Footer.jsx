function Footer() {
  return (
    <footer className="bg-lime-800/85 text-gray-800 p-6 font-poppins shadow-inner min-h-40 mt-5 flex items-center">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-lg font-bold text-white">Mark Gichora</h2>
          <p className="text-sm">Frontend Developer | Fitness Tracker Project</p>
        </div>

        <div className="flex space-x-4 mb-4 lg:mb-0">
          <a
            href="https://github.com/WilliamGichora"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-white"
          >
            GitHub
          </a>
          <a
            href="www.linkedin.com/in/mark-gichora"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/MarkGichora"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 hover:text-white"
          >
            Twitter
          </a>
        </div>

        <div className="text-center lg:text-right font-semibold">
          <p className="text-sm">Fitness Tracker Capstone Project: ALX Cohort 2 Front End Bootcamp</p>
          <p className="text-sm">Empowering the Next Generation of Developers</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
