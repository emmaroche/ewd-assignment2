import React, { useEffect, useState } from "react";
import { Card, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type MovieRecord = {
    title: string;
    overview: string;
    genres: string;
    releaseDate: string;
    runtime: string;
    productionCompanies: string;
    cast: { name: string; role: string; description: string }[];
    poster: string;
};

const formContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    marginBottom: "20px",
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
};

const inputStyle = {
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
};

const buttonStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#1e90ff",
    color: "white",
    cursor: "pointer",
};

const buttonStyle2 = {
    padding: "10px",
    borderRadius: "5px",
    border: "2px solid #1e90ff",
    backgroundColor: "transparent",
    marginTop: "10px",
    color: "#1e90ff",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
};

const cardContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
};

const cardStyle = {
    width: "272px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    marginBottom: "20px",
    marginRight: "20px",
    marginLeft: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
};

const FantasyMovieForm: React.FC = () => {
    const [movieRecord, setMovieRecord] = useState<MovieRecord>({
        title: "",
        overview: "",
        genres: "",
        releaseDate: "",
        runtime: "",
        productionCompanies: "",
        cast: [],
        poster: ""
    });

    const [submittedRecords, setSubmittedRecords] = useState<MovieRecord[]>(() => {
        const storedRecords = localStorage.getItem("submittedRecords");
        return storedRecords ? JSON.parse(storedRecords) : [];
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMovieRecord({
            ...movieRecord,
            [name]: value
        });
    };

    const handleCastChange = (index: number, field: keyof typeof movieRecord.cast[0], e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMovieRecord({
            ...movieRecord,
            cast: movieRecord.cast.map((actor, i) =>
                i === index ? { ...actor, [field]: value } : actor
            )
        });
    };

    const handleAddActor = () => {
        setMovieRecord(movieRecord => ({
            ...movieRecord,
            cast: [...movieRecord.cast, { name: "", role: "", description: "" }]
        }));
    };

    // Reference: https://stackoverflow.com/questions/43692479/how-to-upload-an-image-in-react-js
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        const localImageUrl = URL.createObjectURL(file);
        setMovieRecord(prevState => ({ ...prevState, poster: localImageUrl }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedRecords([...submittedRecords, movieRecord]);
        setMovieRecord({
            title: "",
            overview: "",
            genres: "",
            releaseDate: "",
            runtime: "",
            productionCompanies: "",
            cast: [],
            poster: ""
        });
    };

    // Reference: https://stackoverflow.com/questions/36326612/how-to-delete-an-item-from-state-array
    const handleDelete = (index: number) => {
        setSubmittedRecords(prevRecords => prevRecords.filter((_, i) => i !== index));
    };

    useEffect(() => {
        localStorage.setItem("submittedRecords", JSON.stringify(submittedRecords));
    }, [submittedRecords]);

    return (
        <div style={formContainerStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input name="title" value={movieRecord.title} onChange={handleChange} placeholder="Title" style={inputStyle} />
                <input name="overview" value={movieRecord.overview} onChange={handleChange} placeholder="Overview" style={inputStyle} />
                <input name="genres" value={movieRecord.genres} onChange={handleChange} placeholder="Genres" style={inputStyle} />
                <input name="releaseDate" value={movieRecord.releaseDate} onChange={handleChange} placeholder="Release Date" style={inputStyle} />
                <input name="runtime" value={movieRecord.runtime} onChange={handleChange} placeholder="Runtime" style={inputStyle} />
                <input name="productionCompanies" value={movieRecord.productionCompanies} onChange={handleChange} placeholder="Production Companies" style={inputStyle} />
                <button type="button" onClick={handleAddActor} style={buttonStyle2}>Add Cast Member</button>
                {movieRecord.cast.map((actor, index) => (
                    <div key={index} style={{ marginTop: "20px", marginBottom: "20px" }}>
                        <input name={`cast[${index}].name`} value={actor.name} onChange={(e) => handleCastChange(index, "name", e)} placeholder="Name" style={inputStyle} />
                        <input name={`cast[${index}].role`} value={actor.role} onChange={(e) => handleCastChange(index, "role", e)} placeholder="Role" style={inputStyle} />
                        <input name={`cast[${index}].description`} value={actor.description} onChange={(e) => handleCastChange(index, "description", e)} placeholder="Description" style={inputStyle} />
                    </div>
                ))}
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: "20px", marginBottom: "20px" }} />
                <button type="submit" style={buttonStyle}>Add Dream Movie Record</button>
            </form>
            <div style={cardContainerStyle}>
                {submittedRecords.map((record, index) => (
                    <Card key={index} style={{ ...cardStyle }}>
                        {record.poster && <img src={record.poster} alt="Movie Poster" style={{ maxWidth: "100%", marginBottom: "10px" }} />}
                        <Typography variant="h5" component="h2" gutterBottom>{record.title}</Typography>
                        <Typography variant="body1" component="p" gutterBottom>{record.overview}</Typography>
                        <Typography variant="body2" component="p" gutterBottom><strong>Genres:</strong> {record.genres}</Typography>
                        <Typography variant="body2" component="p" gutterBottom><strong>Release Date:</strong> {record.releaseDate}</Typography>
                        <Typography variant="body2" component="p" gutterBottom><strong>Runtime:</strong> {record.runtime}</Typography>
                        <Typography variant="body2" component="p" gutterBottom><strong>Production Companies:</strong> {record.productionCompanies}</Typography>
                        <Typography variant="body2" component="p" gutterBottom><strong>Cast:</strong></Typography>
                        <ul>
                            {record.cast && record.cast.map((actor, idx) => (
                                <li key={idx}>
                                    <Typography variant="body2" component="span"><strong>{actor.name}</strong> as {actor.role} - {actor.description}</Typography>
                                </li>
                            ))}
                        </ul>
                        <IconButton onClick={() => handleDelete(index)} color="primary" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Card>
                ))}
            </div>

        </div>
    );
};

export default FantasyMovieForm;
