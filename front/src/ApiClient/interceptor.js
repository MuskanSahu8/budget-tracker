import axios from "axios";
const apiClient = axios.create({
    baseURL:"http://localhost:3000/api/",
    withCredentials:true
})
//request
apiClient.interceptors.request.use(
    (config)=>{
        console.log("request send",config.method ,config.url)
        return config
    },
    (error)=>{
        console.log("request error",error.message);
        return Promise.reject(error);
    }
)
//response
apiClient.interceptors.response.use(
    (response) => {
        console.log(response, "response")
        return response
    },
    (error)=>{
         console.log(
      "Response error:",
      error.response?.status,
      error.response?.data
    );
        if(error.response.status ==401 || error.response.status ==403){
            console.log("unauthorized || forbidden");
            //redirct to  login page
        }
            return Promise.reject(error);
    
    });
    export default apiClient