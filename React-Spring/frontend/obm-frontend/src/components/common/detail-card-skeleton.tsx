import { Card, Grid, CardHeader, CardContent, CardMedia, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const useStyles = makeStyles({
    root: {
        minWidth: 575,
        margin: 25,
        display: 'flex',
        alignContent: 'flex-start',
    },
    cover: {
        margin: 25,
        minHeight: 300,
        minWidth: 300,
    },
    skeletonCover: {
        minHeight: 300,
        minWidth: 300,
    },
    skeleton: {
        marginBottom: 6,
    },
});

const skeletonWidthList = [250, 235, 220, 240, 200, 215, 240] as const;

export const DetailCardSkeleton = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="elevation">
            <Grid alignItems="flex-start" container direction="column">
                <CardHeader
                    subheader={<Skeleton animation="wave" width={200} />}
                    title={<Skeleton animation="wave" style={{ marginBottom: 6 }} width={200} />}
                />
                <CardContent>
                    {skeletonWidthList.map((width, i) => (
                        <Skeleton
                            animation="wave"
                            className={classes.skeleton}
                            // eslint-disable-next-line react/no-array-index-key
                            key={i}
                            width={width}
                        />
                    ))}
                </CardContent>
            </Grid>
            <CardMedia className={classes.cover}>
                <Skeleton className={classes.skeletonCover} variant="rect" />
            </CardMedia>
        </Card>
    );
};
