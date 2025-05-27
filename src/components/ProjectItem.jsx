import React from 'react';
import ProjectDetails from './ProjectDetails';

function ProjectItem({ project, isExpanded, toggleExpand }) {
  return (
    <div className="border mb-2 p-2">
      <div className="flex justify-between items-center">
        <div>
          <strong>{project.id}</strong> — {project.name}
        </div>
        <button onClick={() => toggleExpand(project.id)}>➡️</button>
      </div>
      {isExpanded && <ProjectDetails project={project} />}
    </div>
  );
}

export default ProjectItem;