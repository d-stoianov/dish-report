import React, { useState, useRef, useEffect } from "react";
import "../styles/Accordion.css";
import { AiFillCaretDown } from "react-icons/ai";

const Accordion = ({ title, children, defaultActive }) => {
  const [isActive, setIsActive] = useState(defaultActive ?? true);
  const [contentHeight, setContentHeight] = useState("0px");
  const contentRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      setContentHeight(`${contentRef.current.scrollHeight}px`)
    } else {
      setContentHeight("0px")
    }
  }, [isActive])

  return (
    <div className={`accordion ${isActive ? "active" : ""}`}>
      <div className="accordion-header" onClick={() => setIsActive(!isActive)}>
        <h1 className="text-xl font-semibold cursor-pointer">{title}</h1>
        <div className={`arrow-icon ${isActive ? "active" : ""}`}>
            <AiFillCaretDown />
        </div>
      </div>
      <div
        className={`accordion-content`}
        style={{
          maxHeight: contentHeight,
          transition: "max-height 0.3s ease-in-out",
          overflow: "hidden",
        }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion