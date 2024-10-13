import axios from "axios";

export const axiosJWT = axios.create()
 
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
export const getDetailsUser = async (id, access_token) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, {
           headers: {
                token: `Bearer ${access_token}`,
            }
        });  
        return res.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Ném lỗi để có thể xử lý phía trên
    }
}

export const refreshToken = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
          withCredentials: true // có cookie sẽ tự động truyền xuống backend
        }); 
        return res.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;  
    }
}


export const logoutUser = async () => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`)  
  
        return res.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;  
    }
}