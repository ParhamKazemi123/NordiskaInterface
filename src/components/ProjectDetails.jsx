import React from 'react';

function ProjectDetails({ project }) {
  return (
    <div className="mt-2 pl-4 text-sm">
      <p><strong>Kvartersnamn:</strong> {project.kvartersnamn}</p>
      <p><strong>Ort:</strong> {project.ort}</p>
      <p><strong>Verksamhet:</strong> {project.verksamhet}</p>
      <p><strong>Datum:</strong> {project.datum}</p>
      <p><strong>Skede:</strong> {project.skede}</p>
      <p><strong>Entreprenad:</strong> {project.entreprenad}</p>
      <p><strong>Regelverk:</strong> {project.regelverk}</p>
      <p><strong>Vattenkälla:</strong> {project.vattenkalla}</p>
      <p><strong>Typ:</strong> {project.typ}</p>
      <p><strong>Systemtyper:</strong> {project.systemtyper}</p>
      <p><strong>Programvaror:</strong> {project.programvaror}</p>
      <p><strong>Portal:</strong> {project.portal}</p>
    </div>
  );
}

export default ProjectDetails;