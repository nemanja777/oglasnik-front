import TestAxios from "../apis/TestAxios"

export const login = async function (username, password) {
    const data = {
        username: username,
        password: password
    }
    try {
        const ret = await TestAxios.post('korisnici/auth', data);
        window.localStorage.setItem('jwt', ret.data);
        window.localStorage.setItem('korisnik', JSON.parse(ret.config.data).username);
        console.log(ret.config);
    } catch (error) {
        console.log(error);

    }
    window.location.reload();
    window.location.href = "/#/oglasi";
}

export const logout = function () {
    window.localStorage.removeItem('jwt');
    window.location.reload();
}