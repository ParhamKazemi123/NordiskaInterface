import React from 'react';

function FilterPanel() {
  return (
    <div className="border p-4 mb-4">
      <div>
        <strong>SKEDEN:</strong><br />
        <label><input type="checkbox" /> Programhandling</label><br />
        <label><input type="checkbox" /> Systemhandling</label><br />
        <label><input type="checkbox" /> Bygghandling</label><br />
        <label><input type="checkbox" /> Förfrågningsunderlag</label>
      </div>
      <div className="mt-2">
        <strong>ENTREPRENAD:</strong><br />
        <label><input type="checkbox" /> Totalentreprenad</label><br />
        <label><input type="checkbox" /> Utförande entreprenad</label>
      </div>
      <div className="mt-2">
        <strong>VATTENKÄLLA:</strong><br />
        <label><input type="checkbox" /> Kommunal</label><br />
        <label><input type="checkbox" /> Pumpar</label><br />
        <label><input type="checkbox" /> Bassäng</label>
      </div>
    </div>
  );
}

export default FilterPanel;