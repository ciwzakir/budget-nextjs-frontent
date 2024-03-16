import React from "react";
type ActionBarProps = {
  title?: string;
  children?: React.ReactElement | React.ReactNode;
};
const ActionBarComponent = ({ title, children }: ActionBarProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <div className="children" style={{ display: "flex" }}>
        {children}
      </div>
    </div>
  );
};

export default ActionBarComponent;
