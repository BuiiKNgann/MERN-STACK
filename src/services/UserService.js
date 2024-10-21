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
        },);  
        return res.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Ném lỗi để có thể xử lý phía trên
    }
}

export const deleteUser = async (id, access_token,data) => {
 
        const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
           headers: {
                token: `Bearer ${access_token}`,
            }
        },);  
        return res.data;
    
}



// export const getAllUser = async (access_token) => {
//     try {
//       // In token ra console để kiểm tra
//       console.log('Access token:', access_token);
      
//       const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`, {
//         headers: {
//           token: `Bearer ${access_token}`,
//         },
//       });
  
//       console.log('API Response:', res.data); // Kiểm tra phản hồi từ API
//       return res.data;
//     } catch (error) {
//       console.error('Error fetching users from API:', error.response ? error.response.data : error.message); // Log lỗi chi tiết
//       throw error; // Ném lỗi để cho phía gọi xử lý
//     }
//   };
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
export const getAllUser = async(access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`,{
        headers: {
            token: `Bearer ${access_token}`,
        }
    },)
    return res.data
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

export const updateUser = async (id,data,access_token) => {
        const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {  
        headers: {
            token: `Bearer ${access_token}`,
        }
    });  
        return res.data;
 

}

 