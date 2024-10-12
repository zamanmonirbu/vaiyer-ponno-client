import Cookies from 'js-cookie';

// Function to set a cookie
export const setCookie = (name, value, days) => {
    Cookies.set(name, value, { expires: days });
};

// Function to get a cookie
export const getCookie = (name) => {
    return Cookies.get(name);
};

// Function to remove a cookie
export const removeCookie = (name) => {
    Cookies.remove(name);
};
