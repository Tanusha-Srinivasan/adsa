import React from "react";
import { Twitter, Instagram, Facebook } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col font-sans">
      {/* Hero Section */}
      <main className="flex-1 w-full flex flex-col md:flex-row py-16 px-8 md:px-16 items-center">
        {/* Left Section */}
        <div className="md:w-2/5 mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-6xl md:text-7xl font-bold mb-8">
            Plan Your <br />
            <span className="text-blue-500">Optimal Routes</span>
          </h1>
          <p className="text-gray-600 mb-12 max-w-md mx-auto md:mx-0 text-2xl">
            Simplify your logistics with our easy-to-use route planner. Select
            your depot, add delivery points, and calculate the most efficient
            route in seconds.
          </p>
          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href="/map"
              className="bg-blue-500 text-white py-4 px-10 rounded-md hover:bg-blue-600 text-2xl"
            >
              Get Started
            </a>
            <a
              href="/optimal-route"
              className="bg-gray-200 text-gray-800 py-4 px-10 rounded-md hover:bg-gray-300 text-2xl"
            >
              View Routes
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-3/5 flex justify-center relative">
          <div className="bg-blue-500 rounded-full w-96 h-96 md:w-[30rem] md:h-[30rem] lg:w-[40rem] lg:h-[40rem] flex items-center justify-center">
            <img
              src="/assets/images/delivery-truck.png"
              alt="Delivery truck"
              className="max-w-full h-auto object-cover transform scale-110"
            />
          </div>

          

          
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-6 text-center">
        <p className="text-lg">
          Route Planner
        </p>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Twitter size={30} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Instagram size={30} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <Facebook size={30} />
          </a>
        </div>
      </footer>
    </div>
  );
}