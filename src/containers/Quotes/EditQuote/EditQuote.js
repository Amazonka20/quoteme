import CreateQuote from "../CreateQuote/CreateQuote";
import React, {useEffect, useState} from 'react';
import {useHistory, withRouter} from "react-router-dom";
import * as quoteClient from "../../../utility/serviceRequest/quoteClient/quoteClient";
import * as userRepository from "../../../utility/repository/userRepository";

const EditQuote = (props) => {
    const [editQuoteForm, setEditQuoteForm] = useState('');
    let history = useHistory();

    useEffect(() => {
        getQuote();
    }, []);
    const headers = {
        headers: {'Authorization': "Bearer " + userRepository.getToken()},
    };

    const showQuote = (data) => {
        setEditQuoteForm(prevState => ({
            ...prevState,
            author: data.author,
            category: data.category,
            private: data.private,
            text: data.text,
            userId: data.userId,
            id: data.id,
        }))
    }

    const updateQuote = (data) => {
        const onSuccess = () => {
            history.push("/myQuotes")
        }
        quoteClient.update(editQuoteForm.id, data, headers, onSuccess);
    }

    const getQuote = () => {
        quoteClient.getQuote(props.match.params.quoteId, headers, showQuote)
    }

    let createQuote = <CreateQuote
        button={"Edit"}
        titleEditPage={'Edit Quote'}
        categoryValue={editQuoteForm.category}
        authorValue={editQuoteForm.author}
        QuoteValue={editQuoteForm.text}
        privatValue={editQuoteForm.private}
        updateQuote={updateQuote}/>

    let spinner = editQuoteForm.author ? createQuote : <h1>Loading...</h1>;
    return (
        <React.Fragment>
            {spinner}
        </React.Fragment>
    );
};

export default withRouter(EditQuote);