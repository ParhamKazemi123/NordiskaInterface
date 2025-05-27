import React, { useState } from 'react';
import ProjectItem from './components/ProjectItem';
import FilterPanel from './components/FilterPanel';
import projects from './data';
  
function App() {
  const [expandedId, setExpandedId] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex">
      <div className="w-2/3 p-4 border">
        <h1 className="text-xl mb-4 text-center">NORDISKA BRAND DATABASE</h1>

        <div className="flex mb-2">
          <input
            type="text"
            placeholder="Search..."
            className="border p-1 flex-grow"
          />
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="ml-2 px-4 py-1 border"
          >
            FILTER
          </button>
        </div>

        {showFilter && <FilterPanel />}

        <div>
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
