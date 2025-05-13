import { Login, Register } from "../types/types";
import axiosInstance from "./axiosConfig";

export const authService = {
    login: (credentials: Login) => axiosInstance.post("/auth/login", credentials),
    register: (userData: Register) => axiosInstance.post("/auth/register", userData),
}