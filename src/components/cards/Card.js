import React from 'react';
import {Card,CardContent,Typography,Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import styles from './Cards.module.css'
import cx from 'classnames';
function Cards( props) {
    
    //console.log(props.data);
    return(
       
        <div className={styles.container}>
        
        
            <Grid container spacing={.5} justify="center">
                <Grid item component={Card}  className={cx(styles.card,styles.active)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Active</Typography>
                        <Typography variant="h4">
                            <CountUp
                            start={0}
                            end={props.data.active} 
                            duration ={1}
                            separator=","
                            />
                        </Typography>
                        
                    </CardContent>   
                </Grid>
                <Grid item component={Card}  className={cx(styles.card,styles.confirmed)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Confirmed</Typography>
                        <Typography variant="h4">
                            <CountUp
                            start={0}
                            end={props.data.confirmed} 
                            duration ={1}
                            separator=","
                            />
                        </Typography>
                        
                    </CardContent>   
                </Grid>
                <Grid item component={Card}  className={cx(styles.card,styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h4">
                            <CountUp
                            start={0}
                            end={props.data.recovered}  
                            duration ={1}
                            separator=","
                            />  
                        </Typography>
                        
                    </CardContent>   
                </Grid>
                <Grid item component={Card}  className={cx(styles.card,styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                            <Typography variant="h4">
                            <CountUp
                            start={0}
                            end={props.data.deaths} 
                            duration ={1}
                            separator=","
                            />  
                        </Typography>    
                        
                    </CardContent>   
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;