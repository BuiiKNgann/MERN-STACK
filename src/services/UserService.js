import axios from "axios";

export const loginUser = async (data) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data); // Sửa thành axios.post và truyền data
        return res.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Ném lỗi để có thể xử lý phía trên
    }
}

    export const signupUser = async (data) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data); // Sửa thành axios.post và truyền data
            return res.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error; // Ném lỗi để có thể xử lý phía trên
        }
}
