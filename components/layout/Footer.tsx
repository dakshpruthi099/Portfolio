import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Daksh Pruthi. All rights reserved.
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://github.com/dakshpruthi099" className="text-gray-600 dark:text-gray-400 hover:text-primary">
              <FaGithub className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/dakshpruthi" className="text-gray-600 dark:text-gray-400 hover:text-primary">
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a href="https://twitter.com/elonmusk" className="text-gray-600 dark:text-gray-400 hover:text-primary">
              <FaTwitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}