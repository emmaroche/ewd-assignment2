import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 3,
        marginBottom: 3,
    },
};

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    const title = props.title
    const navigate = useNavigate();
    const handleClickBack = () => {
      navigate(-1);
    }
    const handleClickForward = () => {
      navigate(1);
    }

    return (
        <Paper component="div" sx={styles.root}>
            <IconButton
                aria-label="go back"
                onClick={handleClickBack}>
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>

            <Typography variant="h4" component="h3">
                {title}
            </Typography>
            <IconButton
                aria-label="go forward"
                onClick={handleClickForward}>
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default Header;