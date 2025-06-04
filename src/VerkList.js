import React, { useEffect, useState } from 'react';

function VerkList() {
  const [groupedByProject, setGroupedByProject] = useState({});
  const [expanded, setExpanded] = useState({}); // Keeps track of which projects are expanded
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(new Set());

  useEffect(() => {
    fetch('http://localhost:4000/nordiska-brand-data')
      .then(res => res.json())
      .then(data => {
        const grouped = {};

        data.forEach(item => {
          const { idproject, category, data } = item;

          if (!grouped[idproject]) {
            grouped[idproject] = {};
          }

          if (!grouped[idproject][category]) {
            grouped[idproject][category] = [];
          }

          grouped[idproject][category].push(data);
        });

        setGroupedByProject(grouped);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const toggleExpand = (idproject) => {
    setExpanded(prev => ({
      ...prev,
      [idproject]: !prev[idproject]
    }));
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel(prev => !prev);
  };

  const handleFilterChange = (value) => {
    setSelectedFilters(prev => {
      const updated = new Set(prev);
      if (updated.has(value)) {
        updated.delete(value);
      } else {
        updated.add(value);
      }
      return updated;
    });
  };

  const filteridprojects = Object.keys(groupedByProject).filter(idproject => {
    // Search term match
    const matchesSearch = idproject.toString().includes(searchTerm);

    // Filter match
    if (selectedFilters.size === 0) return matchesSearch;

    const categories = groupedByProject[idproject];
    const allEntries = Object.values(categories).flat(); // Flatten entries
    const matchesFilter = allEntries.some(entry =>
      Array.from(selectedFilters).some(filter =>
        entry.startsWith(filter)
     )
    );

    return matchesSearch && matchesFilter;
  });

const renderFilterPanel = () => {
  // 1) Your original data‐structure (keys and options)
  const categories = {
    Entreprenad: ['totalentreprenad', 'utförandeentreprenad', 'samverkansentreprenad'],
    Vattenkälla: ['kommunal', 'pump', 'bassäng'],
    Skede: ['programhandling', 'Systemhandling', 'bygghandling', 'förfrågningsunderlag'],
    System: ['våtrör', 'torrör', 'pre-action', 'deluge'],
    Typ: ['nyinstallation', 'ombyggnad', 'hyresgästanpassning', 'demon', 'utökning'],
    Regelverk: ['sbf 120 :', 'nfpa', 'fm', 'sbf 501', 'ss_3112', 'sbf 504:', 'sbf 500:4']
  };

  // 2) A simple “display‐name” mapping for categories:
  //    If you don’t provide an entry here, it’ll fall back to using the original key.
  const displayCategoryNames = {
    Entreprenad: 'Contract Type',
    Vattenkälla: 'Water Source',
    Skede: 'Project Phase',
    System: 'System Category',
    Typ: 'Installation Type',
    Regelverk: 'Regulations'
  };

  // 3) (Optional) If you also want to rename individual options, do the same:
  const displayOptionNames = {
    totalentreprenad: 'Totalentreprenad',
    utförandeentreprenad: 'Utförandeentreprenad',
    samverkansentreprenad: 'Samverkansentreprenad',
    kommunal: 'Kommunal vattenkälla',
    pump: 'Pumpar',
    bassäng: 'Bassäng',
    programhandling: 'Programhandling',
    systemhandling: 'Systemhandling',
    bygghandling: 'Bygghandling',
    förfrågningsunderlag: 'Förfrågningsunderlag',
    våtrör: 'Våtrör',
    torrör: 'Torrör',
    'pre-action': 'Pre‐action System',
    deluge: 'Deluge System',
    nyinstallation: 'Nyinstallation',
    ombyggnad: 'Ombyggnad',
    hyresgästanpassning: 'Hyresgästanpassning',
    demon: 'Demontage',
    utökning: 'Utökning',
    'sbf 120 :': 'SBF 120',
    nfpa: 'NFPA Standard',
    fm: 'FM',
    'sbf 501': 'SBF 501',
    ss_3112: 'SS-3112',
    'sbf 504:': 'SBF 504',
    'sbf 500:4': 'SBF 500:4'
  };

  return (
    <div
      style={{
        marginTop: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9'
      }}
    >
      {Object.entries(categories).map(([categoryKey, options]) => {
        // Look up the “friendly” name, or fall back to the key itself
        const heading = displayCategoryNames[categoryKey] || categoryKey;

        return (
          <div key={categoryKey} style={{ marginBottom: '10px' }}>
            <strong>{heading}</strong>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '5px' }}>
              {options.map(option => {
                // Look up a friendly label for the option, or fall back to `option`
                const label = displayOptionNames[option] || option;
                return (
                  <label key={`${categoryKey}-${option}`}>
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedFilters.has(option)}
                      onChange={() => handleFilterChange(option)}
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );


};

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Project Overview</h2>

      {/* Search and Filter Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search project ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            flex: '1',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <button onClick={toggleFilterPanel}>
          {showFilterPanel ? 'Hide Filter' : 'Filter'}
        </button>
      </div>

      {showFilterPanel && renderFilterPanel()}

      {/* Results */}
      {filteridprojects.length === 0 ? (
        <p>No matching projects found.</p>
      ) : (
        filteridprojects.map(idproject => (
          <div
            key={idproject}
            style={{
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>Project ID: {idproject}</h3>
              <button onClick={() => toggleExpand(idproject)}>
                {expanded[idproject] ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

            {expanded[idproject] && (
              <div style={{ marginTop: '10px', marginLeft: '10px' }}>
                {Object.entries(groupedByProject[idproject]).map(([category, entries]) => (
                  <div key={category} style={{ marginBottom: '10px' }}>
                    <strong>{category}</strong>
                    <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                      {entries.map((entry, i) => (
                        <li key={i}>{entry}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default VerkList;