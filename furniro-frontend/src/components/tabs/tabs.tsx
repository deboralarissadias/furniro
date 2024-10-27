import React, { useState } from 'react';
import './tabs.css';

interface TabProps {
  description: string;
  additional: string;
}

const Tabs: React.FC<TabProps> = (props) => {
  const [activeTab, setActiveTab] = useState<string>('description');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const formatText = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <span key={index}>
        {paragraph}
        <br /><br />
      </span>
    ));
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
            <p>
              {formatText(props.description)}
            </p>
          </div>
        )}

        {activeTab === 'additional' && (
          <div className="tab-pane">
            <p>
              {formatText(props.additional)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
