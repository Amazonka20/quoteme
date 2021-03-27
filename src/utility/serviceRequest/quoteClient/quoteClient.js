import axios from "../../axios-utility";

export const initCategory = (func) => {
    axios.get("/quotes/categories")
        .then(response => {
            func(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export const getQuote = (id, token, func) => {
    axios.get(`/quotes/${id}`, token)
        .then(response => {
            func({
                author: response.data.author,
                category: response.data.category,
                private: response.data.private,
                text: response.data.text,
                userId: response.data.userId,
                id: response.data.id,
            })
        })
        .catch(error => {
            console.log(error);
        });
}

export const createQuote = (data, token, successFunc, errorFunc) => {
    axios.post("/quotes", data, {
        headers: {
            "Authorization": "Bearer " + token,
        }
    }).then(response => {
            successFunc("Quote successfully added");
        }
    ).catch(error => {
        console.log(error);
        errorFunc("Error occurred during quote creation: " + error);
    });
}

export const update = (id, data, token, onSuccess) => {
    axios.put(`/quotes/${id}`, data, token)
        .then(response => {
            onSuccess();
        })
        .catch(error => {
            console.log(error);
        });
}
