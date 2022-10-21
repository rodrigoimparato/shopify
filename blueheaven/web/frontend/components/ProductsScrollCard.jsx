import { gql } from "graphql-request";
import { useShopifyQuery, useShopifyMutation } from '../hooks';
import { useEffect, useState } from "react";


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
async function LoadProdructs() {

  console.log("Teste");
  const data = useShopifyQuery(
    {
      key: "KEY",
      query: ALLPRODUCTSWITHDETAILS,
    });

  console.log("Data", data);
  return data;
}

export function ProductsScrollCards() {

  console.log("carregando 1..");
  const [populateProduct, setPopulateProduct] = useState({});

  useEffect(() => {
    console.log("carregando...2");
    const getItems = async () => {

      console.log("carregando...3");

      Promise.all(
        
        ).then(async () => {
          const response = await LoadProdructs(); 
          console.log("Response", response);
        });
      
      console.log("carregando...4", populateProduct);
      if (!populateProduct.isSuccess) return <div>Carregando...</div>

      if (populateProduct.isSuccess) {
        return populateProduct;
      }
    }
    getItems();
  }, []);

  return <div>Carregando...</div>

}