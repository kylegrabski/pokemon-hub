import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// Import Modules
import './style.css';
import { PokemonData } from '../../../types/index';
import { useState } from 'react';

interface PokemonProps {
    allPokemon: PokemonData[];
    search: string;
    addExpandedPokemon: (item: PokemonData) => void;
}


export function Pokemon({ allPokemon, search, addExpandedPokemon }: PokemonProps) {
    const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

    const filteredPokemon = allPokemon.filter((element: PokemonData) => element.name.toLowerCase().includes(search));

    const toggleHover = (id: number) => {
        setHoveredItemId(id);
    }

    return (
        <>
            <Grid container spacing={2}>
                {filteredPokemon.map((item: PokemonData) => (
                    <Grid className='pokemon-card' item xs={12} sm={6} md={4} lg={3} key={item.id} onClick={() => addExpandedPokemon(item)} onMouseEnter={() => toggleHover(item.id)} onMouseLeave={() => toggleHover(0)}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                className='pokemon-image'
                                component="img"
                                alt={item.name}
                                height="140"
                                image={item.id === hoveredItemId ? item.sprites.versions['generation-v']['black-white'].animated.front_default : item.sprites.front_default}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    #{item.id}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Select Favorite</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

/* // <div className='pokemon-card' key={item.id} onClick={() => addExpandedPokemon(item)} onMouseEnter={() => toggleHover(item.id)} onMouseLeave={() => toggleHover(0)}>
//     <hr />
//     <p>Entry number: {item.id}</p>
//     <p>Name: {item.name}</p>
//     <div >
//         <img
//             src={item.id === hoveredItemId ? item.sprites.versions['generation-v']['black-white'].animated.front_default : item.sprites.front_default}
//             alt={item.name}
//         />
//     </div>
// </div> */