import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../../CreateClient";
import { Menu, ChevronDown, X, Home, Users, Phone, LogIn } from "lucide-react";
import { authenticatedNavItems, publicNavItems } from "./constantes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error obteniendo la session", error);
      } else {
        setSession(data.session);
      }
    };
    fetchSession();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //Funciones para desplazamiento sobre subtitulos de navbar
  const handleItemMouseEnter = (title) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
    setActiveDropdown(title);
  }

  const handleItemMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); //Tiempo reducido para mejor experiencia
    setHoverTimeout(timeout);
  }

  const handleDropdownMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
  }

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
    setHoverTimeout(timeout);
  }


  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(
        "Se presentaron los siguientes errores cerrando la session:",
        error
      );
    } else {
      setSession(null);
      navigate("/");
    }
  };

  const handleDropdown = (title) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  return (
    <nav className="w-full flex py-4 justify-between items-center fixed top-0 left-0 bg-gradient-to-r from-gray-800 via-gray-900 to-black z-50 shadow-lg">
      <div className="w-full px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl hover:text-blue-400 transition-colors">
          FastCali
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {session ? (
            // Authenticated Navigation
            <>
              {authenticatedNavItems.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() => handleItemMouseEnter(item.title)}
                  onMouseLeave={handleItemMouseLeave}
                >
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-white flex items-center space-x-1 py-2 transition-colors"
                  >
                    <span>{item.title}</span>
                    <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                  </Link>
                  {activeDropdown === item.title && (
                    <div
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                      style={{ top: "100%", marginTop: "0.5rem" }}
                      className="absolute top-full left-0 w-64 bg-gray-800 rounded-md shadow-lg py-2 mt-1 animate-fadeIn">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={handleSignOut}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            // Public Navigation
            <>
              {publicNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-300 hover:text-white flex items-center space-x-2 transition-colors"
                >
                  <item.icon size={18} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white hover:text-gray-300 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-800 shadow-lg animate-slideDown">
          {session ? (
            // Authenticated Mobile Navigation
            <>
              {authenticatedNavItems.map((item) => (
                <div key={item.title} className="px-4 border-b border-gray-700">
                  <button
                    onClick={() => handleDropdown(item.title)}
                    className="w-full flex justify-between items-center py-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform duration-200 ${activeDropdown === item.title ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {activeDropdown === item.title && (
                    <div className="pl-4 pb-3 animate-fadeIn">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block py-2 text-sm text-gray-400 hover:text-white transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-3 text-red-400 hover:text-red-300 transition-colors"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            // Public Mobile Navigation
            <>
              {publicNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-300 hover:text-white transition-colors border-b border-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={18} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;