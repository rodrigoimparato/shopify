import { useState } from "react";
import { useShopifyQuery } from "../../hooks";



const ALLPRODUCTSWITHDETAILS = `
  {
    products(first: 50) {
      edges {
        cursor
        node {
          title
          handle
          id
          images(first: 1) {
            edges {
              node {
                altText
              }
            }
          }
          variants(first: 1){
            edges {
              node {
                price
                id
              }
            }
          }
        }
      }
    }
  }  
  `
function Soma() {
  
  const { data } = useShopifyQuery(
    {     
      "key": "KEY",
      "query": ALLPRODUCTSWITHDETAILS,
    });

    console.log("carregando...3.1.1");
  return data;
}


function SelectProducts() {

  console.log("carregando...3.0");  
  const [teste, setTeste] = useState(0);

  // const { data } = useShopifyQuery(
  //   {     
  //     "key": "KEY",
  //     "query": ALLPRODUCTSWITHDETAILS,
  //   });
    
  
  // useEffect(() => {
  //   console.log("carregando...4 Count:", count);

  //   return count;
  // }, []);



  console.log("carregando...3.1");

  // setItems(data);
  //return items;
}

export default SelectProducts;