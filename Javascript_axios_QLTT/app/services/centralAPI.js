function apiGetUsers(searchTerm) {
    return axios({
        url: "https://62f50939ac59075124c9d3b7.mockapi.io/QLTT",
        method: "GET",
        params:{
            email: searchTerm,
            name: searchTerm,
            typeLangue: searchTerm,
            account: searchTerm,
            typeUser: searchTerm,
        }
    })
}

function apiAddUsers(user) {
    return axios({
        url: `https://62f50939ac59075124c9d3b7.mockapi.io/QLTT`,
        method: "POST",
        data: user,
    })
}

function apiDeleteUsers(userID) {
    return axios({
        url: `https://62f50939ac59075124c9d3b7.mockapi.io/QLTT/${userID}`,
        method: "DELETE",
    })
}

function apiSelectUser(userID) {
    return axios({
        url: `https://62f50939ac59075124c9d3b7.mockapi.io/QLTT/${userID}`,
        method: "GET",
    })
}

function apiUpdateUsers(userID, user) {
    return axios({
        url: `https://62f50939ac59075124c9d3b7.mockapi.io/QLTT/${userID}`,
        method: "PUT",
        data: user
    });
}