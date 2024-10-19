import React, { useState } from 'react';
import './tabs.css';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('description');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        <button
          className={activeTab === 'description' ? 'active' : ''}
          onClick={() => handleTabClick('description')}
        >
          Description
        </button>
        <button
          className={activeTab === 'additional' ? 'active' : ''}
          onClick={() => handleTabClick('additional')}
        >
          Additional Information
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'description' && (
          <div className="tab-pane">
            <h2>Description</h2>
            <p>
              Here is the product description. It gives detailed information
              about the features and benefits of the product.
            </p>
          </div>
        )}

        {activeTab === 'additional' && (
          <div className="tab-pane">
            <h2>Additional Information</h2>
            <p>
              This section contains additional information such as dimensions,
              weight, and other technical details about the product.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
