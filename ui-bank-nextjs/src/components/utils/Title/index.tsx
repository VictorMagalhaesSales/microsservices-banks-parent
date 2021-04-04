import classes from './Title.module.scss';

export default function Title(props) {
    return (
        <h1 className={classes.root}>
            {props.children}
        </h1>
    );
};
