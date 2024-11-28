import * as React from "react";
import Box from "@mui/material/Box";
import DeleteForm from "../../components/auth/delete/DeleteForm";

export default function UserDelete() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DeleteForm />
      </Box>
    </>
  );
}
