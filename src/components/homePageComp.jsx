
import React, { useState, useEffect } from 'react';
import ProjectItem from './ProjectItem';
import FilterPanel from './FilterPanel';
import projects from '../data';

export default function HomePageComp() {
    const [expandedId, setExpandedId] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const [search, setSearch] = useState("");
    const [project, setProject] = useState("");

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    useEffect(() => {
        fetch(`http://localhost:3001/project?name=${search}`)
        .then(res => res.json())
        .then(data => setProject(data));
    }, [search]);

    return(
    <div className="flex">
      <div className="w-2/3 p-4 border">
        <h1 className="text-xl mb-4 text-center">NORDISKA BRAND DATABASE</h1>

        <div className="flex mb-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border p-1 flex-grow"
          />
          <pre>{JSON.stringify(project, null, 2)}</pre>

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