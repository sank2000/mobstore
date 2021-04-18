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
  Paper,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import SearchContext from "../contexts/SearchContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 250,
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    marginTop: 0
  },
  media: {
    height: 140,
    backgroundSize: "contain"
  }
}));

export default function List() {
  const [originalData] = useState(() => {
    return localStorage.getItem("product")
      ? JSON.parse(localStorage.getItem("product"))
      : [];
  });
  const [resultData, setResutData] = useState([]);
  const { search } = useContext(SearchContext);
  const history = useHistory();
  const [priceFilter, setPriceFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);

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
    if (
      priceFilter.length === 0 &&
      colorFilter.length === 0 &&
      brandFilter.length === 0
    ) {
      setResutData(originalData);
    } else {
      setResutData(
        originalData.filter((r) => {
          let found = [false, false, false];
          if (priceFilter.length === 0) found[0] = true;
          else {
            let priceExist = false;
            for (let limit of priceFilter) {
              let prices = limit.split(" - ");
              if (r.price >= prices[0] && r.price <= prices[1])
                priceExist = true;
            }
            found[0] = priceExist;
          }
          if (brandFilter.length === 0) found[1] = true;
          else {
            let brandExist = false;
            for (let br of brandFilter) {
              if (r.brand === br) brandExist = true;
            }
            found[1] = brandExist;
          }
          if (colorFilter.length === 0) found[2] = true;
          else {
            let colorExist = false;
            for (let clr of colorFilter) {
              if (r.color === clr) colorExist = true;
            }
            found[2] = colorExist;
          }
          return !found.includes(false);
        })
      );
    }
  }, [priceFilter, colorFilter, brandFilter, originalData]);

  const handleFilterChange = (e, setState) => {
    setState((old) => {
      if (old.includes(e.target.name)) {
        return old.filter((val) => val !== e.target.name);
      }
      return [...old, e.target.name];
    });
  };

  return (
    <Container fixed style={{ padding: "30px 0" }}>
      <Box display="flex" alignItems="flex-start">
        {originalData?.length !== 0 && (
          <Paper style={{ padding: "5px", maxWidth: "200px" }}>
            <Typography variant="body1" component="h6">
              Brand
            </Typography>
            {[...new Set(originalData.map((val) => val.brand))].map(
              (val, ind) => {
                return (
                  <FormControlLabel
                    key={ind}
                    style={{ width: "80%", margin: "0 auto" }}
                    control={
                      <Checkbox
                        checked={brandFilter.includes(val)}
                        name={val}
                      />
                    }
                    onChange={(e) => handleFilterChange(e, setBrandFilter)}
                    label={val}
                  />
                );
              }
            )}
            <Typography variant="body1" component="h6">
              Price
            </Typography>
            {["20000 - 30000", "30000 - 40000", "40000 - 50000"].map(
              (val, ind) => {
                return (
                  <FormControlLabel
                    key={ind}
                    style={{ width: "80%", margin: "0 auto" }}
                    control={
                      <Checkbox
                        checked={priceFilter.includes(val)}
                        onChange={(e) => handleFilterChange(e, setPriceFilter)}
                        name={val}
                      />
                    }
                    label={val}
                  />
                );
              }
            )}
            <Typography variant="body1" component="h6">
              Color
            </Typography>
            {[...new Set(originalData.map((val) => val.color))].map(
              (val, ind) => {
                return (
                  <FormControlLabel
                    key={ind}
                    style={{ width: "80%", margin: "0 auto" }}
                    control={
                      <Checkbox
                        checked={colorFilter.includes(val)}
                        name={val}
                      />
                    }
                    onChange={(e) => handleFilterChange(e, setColorFilter)}
                    label={val}
                  />
                );
              }
            )}
          </Paper>
        )}
        <Box display="flex" flexWrap="wrap">
          {resultData.length === 0 && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              style={{
                minHeight: "80vh",
                minWidth: originalData?.length === 0 ? "90vw" : "60vw"
              }}
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
          image={
            "https://media.croma.com/image/upload/f_auto,q_auto,d_Croma%20Assets:no-product-image.jpg,h_212,w_212/v1617701981/Croma%20Assets/Communication/Mobiles/Images/233917_r0h7cs.png"
          }
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
