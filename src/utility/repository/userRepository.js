export {setToken, getToken, setUser, getUser, clearStorage}

const setToken = (token) => {
    localStorage.setItem('token', token);
}

const getToken = () => {
    return localStorage.getItem('token');
}

const removeToken = () => {
    localStorage.removeItem('token');
}

const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
}

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const removeUser = () => {
    localStorage.removeItem('user');
}

const clearStorage = () => {
    removeToken();
    removeUser();
}

