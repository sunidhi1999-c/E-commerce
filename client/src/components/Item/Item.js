import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import * as actions from "../../store/actions/orderActions";
import * as productActions from "../../store/actions/products";
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 240,
    },
    actionArea: {
        "&:hover $focusHighlight": {
            opacity: 0
        }
    },
    focusHighlight: {}
});
//============= framer =================
const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const thumbnailVariants = {
    initial: { scale: 0.9, opacity: 0 },
    enter: { scale: 1, opacity: 1, transition },
    exit: {
        scale: 0.5,
        opacity: 0,
        transition: { duration: 1.5, ...transition }
    }
};

const frameVariants = {
    hover: { scale: 0.95 }
};

const imageVariants = {
    hover: { scale: 1.1 }
};

// ===================
const SimpleCard = (props) => {
    const classes = useStyles();
    console.log(props.data._id);

    return (
        <motion.div variants={thumbnailVariants}>
            <motion.div className="frame"
                whileHover="hover"
                variants={frameVariants}
                transition={transition}>
                <Card className={classes.root}>
                    <CardActionArea disableRipple disableTouchRipple classes={{
                        root: classes.actionArea,
                        focusHighlight: classes.focusHighlight
                    }} onClick={() => props.setSelect(props.data._id)} component={Link} to="/select" >
                        <motion.div variants={imageVariants}
                            transition={transition}>
                            <CardMedia
                                className={classes.media}
                                image={props.data.imageLink}
                                title="Contemplative Reptile"
                            />
                        </motion.div>

                        <CardContent >
                            <Typography gutterBottom variant="h5" component="h2">
                                {props.data.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.data.price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" onClick={() => props.addToCart(props.data)} color="primary">
                            Add to cart
                    </Button>
                        <Button size="small" color="primary">
                            Learn More
                    </Button>
                    </CardActions>
                </Card>
            </motion.div>
        </motion.div>

    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (data) => dispatch(actions.addToCart(data)),
        setSelect: (id) => dispatch(productActions.setSelect(id))
    }
}

export default connect(null, mapDispatchToProps)(SimpleCard);
// initial={{ opacity: 0 }} animate={{ y: -60, opacity: 1 }} transition={{ duration: 1 }}