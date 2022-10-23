import { Key } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";

export const Selector = ({ artist, iter, callback, title }) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  return (
    <div>
      <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
      <Select
        id="demo-multiple-chip"
        labelId="demo-multiple-chip-label"
        multiple
        value={artist}
        defaultValue=""
        onChange={callback}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected: typeof iter) => (
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              color: "white",
            }}
          >
            {selected.map((value: typeof iter, i: Key) => (
              <Chip key={i} label={value.name} />
            ))}
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
              width: 250,
            },
          },
        }}
      >
        {iter.map((item: typeof iter, i: Key) => (
          <MenuItem key={i} value={item}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
