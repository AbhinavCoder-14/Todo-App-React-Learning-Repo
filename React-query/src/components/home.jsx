import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Axios from "axios";

function Home() {
  const { data, isLoading } = useQuery({queryKey:["cat"],
  queryFn: async () => {
    return await Axios.get("https://catfact.ninja/fact").then((res) => {
      return res.data;
    }).catch((error)=> error);
  }});

  // if (isLoading) {
  //   return <h1>Loading Please Wait for a moment...</h1>;
  // }

  return (
    <>
    {(isLoading) ? (<h1>Loading Please Wait for a moment...</h1>) : (<h1>{data?.fact}</h1>) }
     
    </>
  );
}

export default Home;
