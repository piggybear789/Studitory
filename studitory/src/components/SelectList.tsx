import { useState } from 'react';
import { Checkbox, Combobox, Group, TextInput, useCombobox } from '@mantine/core';
import classes from './SelectList.module.css';

type SelectListProps = {
  value: string[];
  onChange: (value: string[]) => void;
  data: string[];
};

export function SelectList({ value, onChange, data }: SelectListProps) {
  const combobox = useCombobox();
  const [search, setSearch] = useState('');

  const handleValueSelect = (val: string) => {
    if (val === 'Select All') {
      if (value.length === data.length) {
        // Deselect all if all are selected
        onChange([]);
      } else {
        // Select all if not all are selected
        onChange(data);
      }
    } else {
      onChange(value.includes(val) ? value.filter((v) => v !== val) : [...value, val]);
    }
  };

  const options = data
    .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
    .map((item) => (
      <Combobox.Option
        key={item}
        value={item}
        active={value.includes(item)}
        onClick={() => handleValueSelect(item)} // Change this line to use onClick
        className={classes.option}
      >
        <Group gap="sm">
          <Checkbox
            checked={value.includes(item)}
            readOnly
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: 'none' }} // Prevent clicking the checkbox from closing dropdown
          />
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  return (
    <Combobox store={combobox}>
      <Combobox.EventsTarget>
        <TextInput
          placeholder="Search topics"
          classNames={{ input: classes.input }}
          value={search}
          onChange={(event) => {
            setSearch(event.currentTarget.value);
            combobox.updateSelectedOptionIndex();
          }}
        />
      </Combobox.EventsTarget>

      <div className={classes.list}>
        <Combobox.Options>
          {options.length > 0 ? options : <Combobox.Empty>Nothing found....</Combobox.Empty>}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
