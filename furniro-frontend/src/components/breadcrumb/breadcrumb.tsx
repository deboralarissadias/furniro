import React from "react";
import { Link } from "react-router-dom";

import "./breadcrumb.css";

interface BreadcrumbProps {
  paths: { name: string; path: string }[];
  isSingleProduct?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  paths,
  isSingleProduct = false,
}) => {
  return (
    <>
      {isSingleProduct && (
        <div className="breadcrumb-container">
          <nav className="breadcrumb breadcrumb-single">
            {paths.map((crumb, index) => (
              <span key={index}>
                {index !== paths.length - 1 ? (
                  <Link to={crumb.path} className="breadcrumb-link">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="breadcrumb-current">{crumb.name}</span>
                )}
                {index !== paths.length - 1 && (
                  <span className="breadcrumb-divider"> {">"} </span>
                )}
              </span>
            ))}
          </nav>
        </div>
      )}
      {!isSingleProduct && (
        <nav
          className="breadcrumb"
        >
          {paths.map((crumb, index) => (
            <span key={index}>
              {index !== paths.length - 1 ? (
                <Link to={crumb.path} className="breadcrumb-link">
                  {crumb.name}
                </Link>
              ) : (
                <span className="breadcrumb-current">{crumb.name}</span>
              )}
              {index !== paths.length - 1 && (
                <span className="breadcrumb-divider"> {">"} </span>
              )}
            </span>
          ))}
        </nav>
      )}
    </>
  );
};

export default Breadcrumb;
