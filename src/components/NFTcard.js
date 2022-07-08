import axie from "../tile.jpeg";
import "./NFTcard.scss"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";

function NFTcard (data) {
    const newTo = {
        pathname:"/nftPage/"+data.data.tokenId
    } //pass the path to <CardActionArea>
    return (
        <Card sx={{ maxWidth: 345 }} className="nft-card">
            <CardActionArea component={Link} to={newTo}> 
                <CardMedia
                component="img"
                height="345"
                image={data.data.image}
                alt=""
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="nft-card-text">
                    {data.data.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="nft-card-text">
                    {data.data.description}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default NFTcard;