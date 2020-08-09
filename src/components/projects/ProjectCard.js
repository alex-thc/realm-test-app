import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import {RealmContext} from "../../context/RealmContext";

const useStyles = makeStyles({
    root: {
        minWidth: '55vh',
        marginBottom: 5
    },
    info: {
        display: 'inline-block',
        width: '100%'
    },
    leftInfo: {
        float: 'left'
    },
    rightInfo: {
        float: 'right'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

ProjectCard.propTypes = {
    psproject: PropTypes.object.isRequired
};

export default function ProjectCard(props) {
    const classes = useStyles();

    const {psproject} = props;
    const {setProjectWithCurrentMilestone} = useContext(RealmContext);

    const handleOnClickMilestone = (milestone) => {
        setProjectWithCurrentMilestone({
            ...psproject,
            currentMilestone: milestone
        });
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.info}>
                    <div className={classes.leftInfo}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {psproject.account}
                        </Typography>
                    </div>
                    <div className={classes.rightInfo}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {psproject.region}
                        </Typography>
                    </div>
                </div>

                <Typography variant="h5" component="h2">
                    {psproject.name}
                </Typography>

                <div className={classes.info}>
                    <div className={classes.leftInfo}>
                        <Typography className={classes.pos} color="textSecondary" gutterBottom>
                            Owner: {psproject.owner}
                        </Typography>
                    </div>
                    <div className={classes.rightInfo}>
                        <Typography className={classes.pos} color="textSecondary" gutterBottom>
                            PM: {psproject.project_manager}
                        </Typography>
                    </div>
                </div>

                <Typography variant="body2" component="p">
                    <b>Stage:</b> {psproject.details.pm_stage}
                </Typography>
                <Typography variant="body2" component="p">
                    <b>Status:</b> {psproject.details.pm_project_status}
                </Typography>
                <Typography variant="body2" component="p">
                    <b>Expires:</b> {psproject.details.product_end_date}
                </Typography>
                <Divider />

                <MilestonesList
                    milestones={psproject.milestones}
                    onClickMilestone={handleOnClickMilestone}
                />
            </CardContent>
        </Card>
    );
}

function MilestonesList(props) {
    const {milestones, onClickMilestone} = props;

    return (
        <List subheader={<li />}>
            <ListSubheader>Milestones</ListSubheader>
            {milestones.map(milestone => {
                return (
                    <ListItem button onClick={() => onClickMilestone(milestone)}>
                        <ListItemText primary={milestone.name} />
                    </ListItem>
                )
            })}
        </List>
    )
}