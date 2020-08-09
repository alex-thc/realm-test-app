import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ProjectsList from "./projects/ProjectsList";
import MilestonesInfo from "./projects/MilestonesInfo";
import {useQuery} from "@apollo/client";
import {FIND_PROJECTS} from "../graphql/graphql-operations";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 70,
        display: 'flex',
        flexDirection: 'row'
    },
    root: {
        width: '90vh',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: '90vh'
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary,
        whiteSpace: 'normal',
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        height: '90vh'
    },
}));

export default function ProjectsContainer() {
    const classes = useStyles();

    const { loading, data } = useQuery(
        FIND_PROJECTS,
        {variables: {query: {active: true}}}
    );

    return (
        <div className={classes.container}>
            <ProjectsList classes={{listRoot: classes.root}} loading={loading} data={data} />
            <MilestonesInfo classes={{paper: classes.paper}} />
        </div>
    )
}