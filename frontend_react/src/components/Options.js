import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const options = [
  'Nom',
  'Note',
  'Avis',
  'Abordabilité',
  'Catégorie',
  'Adresse',
  'Statut',
  'Heure d\'ouverture',
  'Image',
  'Services',
  'Description',
  'Site web',
  'Télephone',
];

function getStyles(name, optionName, theme) {
  return {
    fontWeight:
      optionName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Options = () => {
  const theme = useTheme();
  const [optionName, setOptionName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setOptionName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ width: 250 }}>
        <Select
          multiple
          size='small'
          displayEmpty
          value={optionName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{ color: "#8c8c8c" }}>Sélectionner les filtres</em>;
            }

            return selected.join(', ');
          }}
          // MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Sélectionner les filtres</em>
          </MenuItem>
          {options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, optionName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Options