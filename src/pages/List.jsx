import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import SearchContext from "../contexts/SearchContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    margin: theme.spacing(2)
  },
  media: {
    height: 140
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function List() {
  const [originalData] = useState(() => {
    return localStorage.getItem("product")
      ? JSON.parse(localStorage.getItem("product"))
      : [];
  });
  const [resultData, setResutData] = useState([]);
  const [filter, setFilter] = useState("");
  const { search } = useContext(SearchContext);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (search === "") {
      setResutData(originalData);
    } else {
      setResutData(
        originalData.filter((r) =>
          r.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, originalData]);

  useEffect(() => {
    if (filter === "") {
      setResutData(originalData);
    }
    setResutData(
      originalData.filter((r) => {
        if (filter === "samsung") {
          return r.brand.toLowerCase() === "samsung";
        } else if (filter === "apple") {
          return r.brand.toLowerCase() === "apple";
        } else if (filter === "below 25000") {
          return r.price < 25000;
        } else if (filter === "below 40000") {
          return r.price < 40000;
        } else if (filter === "below 50000") {
          return r.price < 50000;
        }
        return true;
      })
    );
  }, [filter, originalData]);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container fixed style={{ padding: "30px 0" }}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Filter</InputLabel>
        <Select value={filter} onChange={handleChange} label="Filter">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"samsung"}>Samsung only</MenuItem>
          <MenuItem value={"apple"}>Apple only</MenuItem>
          <MenuItem value={"below 25000"}>Below 25000 rps</MenuItem>
          <MenuItem value={"below 40000"}>Below 40000 rps</MenuItem>
          <MenuItem value={"below 50000"}>Below 50000 rps</MenuItem>
        </Select>
      </FormControl>
      {resultData.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "80vh" }}
        >
          <Typography gutterBottom variant="h4" component="h3">
            No items Found !!!
          </Typography>
          <Typography gutterBottom variant="h6" component="h3">
            (you can add some new item)
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push("/add")}
          >
            Add
          </Button>
        </Box>
      )}
      <Box display="flex" flexWrap="wrap">
        {resultData.map((data, ind) => {
          return (
            <ItemCard
              name={data.name}
              brand={data.brand}
              price={data.price}
              color={data.color}
              ram={data.ram}
              rom={data.rom}
              key={ind}
            />
          );
        })}
      </Box>
    </Container>
  );
}

function ItemCard({ name, brand, price, color, ram, rom }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} key={name}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://source.unsplash.com/600x600/?mobile,phone"
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography gutterBottom variant="h6" component="h3">
            {brand}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography gutterBottom variant="body1" component="h4">
                Price : {price}
              </Typography>
              <Typography gutterBottom variant="body1" component="h4">
                Color : {color}
              </Typography>
            </Box>
            <Box>
              <Typography gutterBottom variant="body1" component="h4">
                Ram : {ram}
              </Typography>
              <Typography gutterBottom variant="body1" component="h4">
                Rom : {rom}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
