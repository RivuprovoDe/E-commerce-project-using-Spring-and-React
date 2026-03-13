import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ onSelectCategory }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNoProductsMessage, setShowNoProductsMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navbarRef = useRef(null);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavCollapsed(true);
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchInitialData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/products`);
      console.log(response.data, "navbar initial data");
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const handleNavbarToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleLinkClick = () => {
    setIsNavCollapsed(true);
  };

  const handleInputChange = async (value) => {
    setInput(value);

    if (value.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const response = await axios.get(
        `${baseUrl}/api/products/search?keyword=${value}`
      );

      setSearchResults(response.data);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    setShowNoProductsMessage(false);
    setIsLoading(true);
    setIsNavCollapsed(true);

    try {
      const response = await axios.get(
        `${baseUrl}/api/products/search?keyword=${input}`
      );

      if (response.data.length === 0) {
        setShowNoProductsMessage(true);
      } else {
        navigate(`/search-results`, { state: { searchData: response.data } });
      }
    } catch (error) {
      console.error("Error searching:", error);
      setShowNoProductsMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
    setIsNavCollapsed(true);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-white shadow-sm"
      ref={navbarRef}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Telusko
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={handleLinkClick}>
                Home
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="/add_product"
                onClick={handleLinkClick}
              >
                Add Product
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/orders" onClick={handleLinkClick}>
                Orders
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center position-relative">
            <a
              href="/cart"
              className="nav-link text-dark me-3"
              onClick={handleLinkClick}
            >
              <i className="bi bi-cart me-1"></i>
              Cart
            </a>

            <form
              className="d-flex position-relative"
              role="search"
              onSubmit={handleSubmit}
            >
              <input
                className="form-control me-2"
                type="search"
                placeholder="Type to search"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
              />

              <button className="btn btn-outline-success" type="submit">
                Search
              </button>

              {showSearchResults && searchResults.length > 0 && (
                <ul
                  className="list-group position-absolute"
                  style={{
                    top: "100%",
                    width: "250px",
                    zIndex: 1000,
                  }}
                >
                  {searchResults.map((product) => (
                    <li
                      key={product.id}
                      className="list-group-item list-group-item-action"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setShowSearchResults(false);
                        setInput("");
                      }}
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </form>

            {showNoProductsMessage && (
              <div
                className="alert alert-warning position-absolute mt-2"
                style={{ top: "100%", zIndex: 1000 }}
              >
                No products found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

