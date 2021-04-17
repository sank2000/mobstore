import { useState } from "react";

import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "../components";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const initialValue = {
  name: "",
  brand: "",
  price: "",
  color: "",
  ram: "",
  rom: ""
};

export default function Add() {
  const classes = useStyles();
  const [data, setData] = useState(initialValue);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((old) => ({
      ...old,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const localData = localStorage.getItem("product")
      ? JSON.parse(localStorage.getItem("product"))
      : [];
    localData.push(data);
    localStorage.setItem("product", JSON.stringify(localData));
    setOpen(true);
    setData(initialValue);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Container fixed style={{ padding: "30px 0" }}>
        <Typography component="h1" variant="h4" align="center">
          Add Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            className={classes.root}
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={3}
          >
            <TextField
              label="Mobile Name"
              variant="outlined"
              required
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <TextField
              label="Brand"
              variant="outlined"
              required
              name="brand"
              value={data.brand}
              onChange={handleChange}
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              required
              name="price"
              value={data.price}
              onChange={handleChange}
            />
            <TextField
              label="Color"
              variant="outlined"
              required
              name="color"
              value={data.color}
              onChange={handleChange}
            />
            <TextField
              label="RAM"
              variant="outlined"
              required
              name="ram"
              value={data.ram}
              onChange={handleChange}
            />
            <TextField
              label="ROM"
              variant="outlined"
              required
              name="rom"
              value={data.rom}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </Box>
        </form>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Added successfully !!!
        </Alert>
      </Snackbar>
    </>
  );
}
