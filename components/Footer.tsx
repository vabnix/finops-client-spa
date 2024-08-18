export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">AWS Checker</h2>
              <p className="text-sm text-gray-400">Simplifying AWS management</p>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#" className="hover:text-blue-400">About</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              </ul>
            </nav>
          </div>
          <div className="mt-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} AWS Checker. All rights reserved.
          </div>
        </div>
      </footer>
    )
  }