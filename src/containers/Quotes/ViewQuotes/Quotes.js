import React, {useState, useEffect} from 'react';
import Quote from '../../../components/UI/Quote/Quote';
import Input from '../../../components/UI/Input/Input';
import classes from './Quotes.module.css';
import {initCategory} from "../../../utility/serviceRequest/quoteClient/quoteClient";
import axios from "../../../utility/axios-utility";
import * as userRepository from '../../../utility/repository/userRepository';
import ReactPaginate from 'react-paginate';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {withRouter} from "react-router-dom";
import Spinner from "../../../components/UI/Spinner/Spinner";


const Quotes = (props) => {

    const [categoryBox, setCategoryBox] = useState({
        elementType: 'select',
        elementConfig: {
            placeholder: "Category",
            options: []
        },
        value: '',
        categoryTitle: 'Category:'
    });

    const [searchBox, setSearchBox] = useState({
        elementType: 'input',
        elementConfig: {
            placeholder: "Search",
            type: 'text',
        },
        value: '',
        icon: 'search'
    });

    const [quoteList, setQuoteList] = useState([]);
    const [paginationData, setPaginationData] = useState({
        pageSize: 30,
        totalElements: 0,
    });
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initQuotesPage();
    }, [currentPage]);

    function updateCategoryForm(response) {
        let categories = response.data.map(elem => {
            return {value: elem, displayValue: elem}
        });
        categories = [{value: "", displayValue: "All"}, ...categories];
        setCategoryBox(prevState => ({
            ...prevState,
            value: "",
            elementConfig: {
                ...prevState.elementConfig,
                options: categories
            }
        }))
    }

    let token = userRepository.getToken();

    const initQuotesList = () => {
        let headers = token ? {'Authorization': "Bearer " + token} : null;
        const userData = {
            headers: headers,
            params: {
                userId: props.userId,
                category: categoryBox.value,
                text: searchBox.value,
                page: currentPage,
                size: paginationData.pageSize,
            },
        };
        axios.get('/quotes', userData)
            .then(response => {
                setLoading(true);
                setQuoteList(response.data.content)
                setPaginationData(prevState => ({
                    ...prevState,
                    totalElements: response.data.totalElements
                }));
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const initQuotesPage = () => {
        initCategory(updateCategoryForm);
        initQuotesList();
    }

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    }

    const confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure you want to delete this quote?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => quoteDeleteHandler(id),
                },
                {
                    label: 'No',
                }
            ],
            overlayClassName: classes.notification,
        });
    }

    const quoteDeleteHandler = (id) => {
        const quoteData = {
            headers: {'Authorization': "Bearer " + token},
        };
        axios.delete(`/quotes/${id}`, quoteData)
            .then(response => {
                initQuotesList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    const categoryChangeHandler = (event) => {
        setCategoryBox(prevState => ({
            ...prevState,
            value: event.target.value
        }));
    }

    const searchChangeHandler = (event) => {
        setSearchBox(prevState => ({
            ...prevState,
            value: event.target.value
        }));
    }

    let quoteListView = (
        <div>
            {quoteList.map(element => (
                <Quote
                    key={element.id}
                    category={element.category}
                    quote={element.text}
                    author={element.author}
                    trash={props.userId === element.userId}
                    editQuote={props.userId === element.userId}
                    quoteId={element.id}
                    delete={() =>
                        confirmDelete(element.id)
                    }
                />
            ))}
            {quoteList.length === 0 ? <h3>No quotes were found.</h3> : null}
        </div>
    );

    let pageCount = Math.ceil(paginationData.totalElements / paginationData.pageSize);
    let data = loading ? <Spinner/> : quoteListView;

    return (
        <React.Fragment>
            <h1 className={classes.title}>{props.title ? props.title : "Quotes"}</h1>
            <div className={classes.funcBar}>
                <div className={classes.category}>
                    <Input
                        elementType={categoryBox.elementType}
                        elementConfig={categoryBox.elementConfig}
                        changed={event => categoryChangeHandler(event)}
                        categoryTitle={categoryBox.categoryTitle}
                    /></div>
                <div className={classes.searchBox}>
                    <Input
                        elementType={searchBox.elementType}
                        elementConfig={searchBox.elementConfig}
                        icon={searchBox.icon}
                        iconClick={() => initQuotesList()}
                        changed={event => searchChangeHandler(event)}
                    />
                </div>
            </div>
            {data}
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={(event) => {
                    handlePageClick(event)
                }}
                breakLabel={'...'}
                containerClassName={classes.pagination}
                previousLinkClassName={classes.pagination__link}
                nextLinkClassName={classes.pagination__link}
                disabledClassName={classes.pagination__link_disabled}
                activeClassName={classes.pagination__link_active}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
            />
        </React.Fragment>
    );
};

export default withRouter(Quotes);
