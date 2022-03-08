import useApi from "../composables/useApi"
import { ref } from "vue"

import { encryptData, decryptData } from "../_helpers/crypto";
import { useStore } from "vuex";

const authService = () => {
    const apiUrl = 'https://localhost:9001/api/auth';
    const { post } = useApi();
    const currentUser = ref(localStorage.auth ? JSON.parse(decryptData(localStorage.auth)) : null);
    const store = useStore();

    store.commit('setUser', currentUser.value); // for update data of user in layouts
    
    const login = async (data) => {
        var response = await post(apiUrl + "/Login", data);

        if (response.value) {
            if (response.value.status == 200) {
                setAuth(response.value.data);
            }
        }

        return response;
    }

    const setAuth = (data) => {

        localStorage.auth = encryptData(JSON.stringify(data.user).toString());
        localStorage.accessToken = data.token;
        localStorage.refreshToken = data.refreshToken;

        currentUser.value = JSON.parse(decryptData(localStorage.auth));
        store.commit('setUser', currentUser.value);
    }

    const setAuthUser = (user) => {
        localStorage.auth = encryptData(JSON.stringify(user).toString());
        currentUser.value = user;
        store.commit('setUser', currentUser.value);
    }

    const register = async (data) => {
        var response = await post(apiUrl + "/Register", data);

        if (response.value) {
            if (response.value.status == 200) {
                setAuth(response.value.data)
            }
        }

        return response;
    }


    const sendMessage = async (data) => {
        return await post(apiUrl + "/SendMessage", data);
    }

    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        currentUser.value = null;
        store.commit('setUser', currentUser.value);
    }
    return { currentUser,encryptData, decryptData, setAuth, setAuthUser, login, register, sendMessage, logOut }
}

export default authService