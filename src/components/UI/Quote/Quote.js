import React from 'react';
import classes from './Quote.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withRouter} from 'react-router-dom';
import {Link} from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';

const quote = (props) => {
    return (
        <div className={classes.box}>
            <div className={classes.infoBox}>
                <div className={classes.categoryBox}>
                    <FontAwesomeIcon className={classes.blockquote} icon='quote-right'/>
                    <div className={classes.category}><p>{props.category}</p></div>
                </div>
                {props.editQuote &&
                <Link to={'/editQuote/' + props.quoteId}>
                    <div className={classes.editQuote}><span><FontAwesomeIcon icon='edit'/></span>
                    </div>
                </Link>}
                {props.trash &&
                <div className={classes.delete}><span onClick={props.delete}><FontAwesomeIcon icon='trash'/></span>
                </div>}
            </div>
            <div className={classes.quoteBox}>
                <div className={classes.quote}><p>{ReactHtmlParser(props.quote)}</p></div>
                <div className={classes.author}><p>{props.author}</p></div>
            </div>
        </div>
    );
};

export default withRouter(quote);