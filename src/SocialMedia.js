import React from "react";
import { AiFillTelegram, AiFillFacebook } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";


function SocialMedia() {
  const listStyle = {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
    padding: 0,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  };

  const iconWrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    textDecoration: "none",
  };

  const iconStyle = {
    color: "#333",
    fontSize: "24px",
  };

  return (
    <ul style={listStyle}>
      <li>
        <a
          href="https://www.facebook.com/share/1G5NehS8rs/"
          target="_blank"
          rel="noreferrer"
          style={iconWrapperStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
        >
          <AiFillFacebook style={iconStyle} />
        </a>
      </li>
      <li>
        <a
          href="https://t.me/+GmLqbBPHIgRjYjc8"
          target="_blank"
          rel="noreferrer"
          style={iconWrapperStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
        >
    <FaTelegramPlane style={iconStyle} />
</a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/tarekegn-legesse-ba7b87191/"
          target="_blank"
          rel="noreferrer"
          style={iconWrapperStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
        >
          <FaLinkedinIn style={iconStyle} />
        </a>
      </li>
      <li>
        <a
          href="mailto:tarekegnlegesse@gmail.com"
          target="_blank"
          rel="noreferrer"
          style={iconWrapperStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
        >
          <MdEmail style={iconStyle} />
        </a>
      </li>
    </ul>
  );
}

export default SocialMedia;
