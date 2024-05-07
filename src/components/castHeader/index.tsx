import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { CastInfo } from "../../types/interfaces";
import { useNavigate } from "react-router-dom";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
};

const CastHeader: React.FC<CastInfo> = (props) => {
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  }
  const handleClickForward = () => {
    navigate(1);
  }

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back" onClick={handleClickBack}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Box display="flex" alignItems="center">
        <Typography variant="h4" component="h3" sx={{ mr: 1 }}>
          {props.name}
        </Typography>
        <a href={props.homepage}>
          <HomeIcon color="primary" fontSize="large" />
        </a>
      </Box>

      <IconButton aria-label="go forward" onClick={handleClickForward}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default CastHeader;