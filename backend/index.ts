import { Server, ic } from 'azle';
import cors from "cors";
import express from 'express';


type peli = {
    id: number,
    titulo: string,
    autor: string,
    diaLanzado: number,
    genero: string,
    Duracion: number,
    pais: string,
    director: string,
}
let peliculas: peli[] = [{
    id: 1,
    titulo: "titanic",
    autor: "James Cameron",
    diaLanzado: 1994,
    genero: "romance",
    Duracion: 120,
    pais: "Baja California",
    director: "James Cameron",
}]; 

export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());


//GET
app.get("/peliculas", (req, res) => {
    if (peliculas.length === 0) {
        res.status(404).json({ message: "No hay registros de películas disponibles." });
    } else {
        res.json(peliculas);
    }
});

//POST

    app.post("/peliculas", (req, res) => {
        const nuevo = req.body;
        const existente = peliculas.find(pelis => pelis.id ===nuevo.id);
        if(!existente){
            peliculas = [...peliculas, req.body]
            res.send("Ok");
        }
        else{
            res.status(404).send("El id que intentas crear ya existe");
            return;
        }
       
    });

//PUT

app.put("/peliculas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const peli = peliculas.find((peli) => peli.id === id);

    if (!peli) {
        res.status(404).send("Not found");
        return;
    }

    const updatedpeli = { ...peli, ...req.body };
    
    peliculas = peliculas.map((b) => b.id === updatedpeli.id ? updatedpeli : b);

    res.send("Registro actualizado correctamente");
});
//DELETE

app.delete("/peliculas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    peliculas = peliculas.filter((peli) => peli.id !== id);
    res.send("Registro eliminado correctamente");
});

    return app.listen();
});
