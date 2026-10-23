import states from 'datasets-us-states-abbr-names';

const stateData = new Map();

for (const [code, name] of Object.entries(states)) {
  const aliases = [code.toLowerCase(), name.toLowerCase()];

  stateData.set(code.toLowerCase(), aliases);
  stateData.set(name.toLowerCase(), aliases);
}

export default stateData;
