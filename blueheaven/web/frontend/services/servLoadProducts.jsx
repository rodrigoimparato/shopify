import { useShopifyQuery } from "../hooks";

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


export const servLoadProducts = async () => {
    
    const data = useShopifyQuery(
        {
          key: "KEY",
          query: ALLPRODUCTSWITHDETAILS,
        });
    
      console.log("Data", data);


    const status = {
        type: "success",
        mensagem: "Tudo azul!"
    }

    return data;
}