import axios from "../Api/axiosInstance";

function Elastic() {

  const reindexshit = async () => {
    try {
      const result = await axios.post("/user/index-all");
      console.log(result)

    } catch (e: any) {
      console.error(e.response.data.message);
    }
  }


    return (
      <button onClick={() => reindexshit()}>
        Index all users
      </button>
    )
}

export default Elastic;