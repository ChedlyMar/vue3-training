import axios from axios

export function usePost(){
  const uri = "https://jsonplaceholder.typicode.com/posts"
  
  const fetchPostList = async()=>{
    try {
      const data = await axios.get(uri)
      console.log(data);
      
      
    } catch (error) {
      trow error
    }
  }
}