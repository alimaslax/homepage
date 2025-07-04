import React, { useState, useEffect } from "react";
import Link from "next/link";
import useSiteStore from "../store/useSiteStore";

function Header(props) {
  const [navBottom, setNavBottom] = useState(false);
  const [reloaded, setReloaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { PanOpen, togglePan, activeLink, setActiveLink } = useSiteStore();


  const isActive = (divName) => {
    return divName === activeLink ? "current" : "";
  };

  const handleScroll = () => {
    const bottom =
      Math.ceil(document.documentElement.scrollHeight * 0.08) < window.scrollY;
    if (bottom && window.innerWidth > 768) {
      setNavBottom(true);
    } else {
      setNavBottom(false);
    }
  };

  useEffect(() => {
    // Client-side-only code
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);

      window.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [PanOpen]);

  if(isMobile && !reloaded){
    togglePan();
    setReloaded(true);
  }

  return (
    <header className="home">
      <nav id="nav-wrap">
        <a className="mobile-btn" title="Show navigation" onClick={() => {togglePan()}}>
          Show navigation
        </a>
        <a className="mobile-btn" title="Hide navigation">
          Hide navigation
        </a>
        <ul
          id="nav"
          className={navBottom ? "nav opaque" : "nav"}
          style={{
            display: PanOpen ? "block" : "none",
          }}
          onClick={() => (isMobile && !PanOpen ? togglePan() : null)}
        >
          <li className={isActive("Home")}>
            <Link
              href="/"
              onClick={() => {
                setActiveLink("Home");
                if (isMobile){
                  togglePan();
                }
              }}
            >
              Home
            </Link>
          </li>

          <li className={isActive("Resume")}>
            <Link
              href="/resume"
              onClick={() => {
                setActiveLink("Resume");
                if (isMobile){
                  togglePan();
                }
              }}
            >
              Resume
            </Link>
          </li>

          <li className={isActive("Notebook")}>
            <Link
              href="/notebook"
              onClick={() => {
                setActiveLink("Notebook");
                if (isMobile){
                  togglePan();
                }
              }}
            >
              Notebook
            </Link>
          </li>

          <li className={isActive("Social")}>
            <Link
              href="/social"
              onClick={() => {
                setActiveLink("Social");
                if (isMobile){
                  togglePan();
                }
              }}
            >
              Social 📸
            </Link>
          </li>

          <li className={isActive("Contact")}>
            <Link
              href="/contact"
              onClick={() => {
                setActiveLink("Contact");
                if (isMobile){
                  togglePan();
                }
              }}
            >
              Contact Me
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
