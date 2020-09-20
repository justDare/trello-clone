import React from "react";

// Material
import Typography from "@material-ui/core/Typography";

import AddList from "./AddList";

export default function Lists(props) {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        My Lists
      </Typography>
      <AddList />
    </div>
  );
}
