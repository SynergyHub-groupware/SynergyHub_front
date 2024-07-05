import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const styles = {
  expandBtn: {
    width: "30px",
    height: "30px",
    margin: "auto",
    color: "#227c9d",
    backgroundColor: "#fef9ef",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #d3d3d3",
    borderRadius: "50%",
    cursor: "pointer",
  },
  flex: {
    display: "flex",
  },
};

const CustomExpandButton = ({ node }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      style={{
        ...styles.expandBtn,
        backgroundColor: expanded ? "#ffcb77" : "#fef9ef",
      }}
      onClick={toggleExpand}
    >
      <span>{node._directSubordinates}</span>
      <span style={styles.flex}>
        {expanded ? <FaAngleUp /> : <FaAngleDown />}
      </span>
    </div>
  );
};

export default CustomExpandButton;