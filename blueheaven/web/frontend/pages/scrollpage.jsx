import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductsScrollCards } from "../components/ProductsScrollCard";
import { servLoadProducts } from "../services/servLoadProducts";
import  SelectProducts  from "../components/ProductList/selectproducts"

export default function ScrollPage() {

  const [loadPage, setLoadPage] = useState(false);
  const [items, setItems] = useState(Array.from({ length: 30 }));

  useEffect(() => {
    console.log("carregando...1");
    const getItems = async () => {

      console.log("carregando...2");

     // const tmp = SelectProducts();
      
      const list = async () => {
        const response = await servLoadProducts();

        console.log("carregando...3", response);

      };

      // Promise.all(
        
      // ).then(async () => {
      //   const response = await servLoadProducts(); 
      //   console.log("Response", response);
      // });


      // const { data } = useShopifyQuery(
      //   {     
      //     "key": "KEY",
      //     "query": ALLPRODUCTSWITHDETAILS,
      //   });

     console.log("carregando...4", list());
      if (!data.isSuccess) return <div>Carregando...</div>

      if (data.isSuccess) {
        setItems(data.data.data.products.edges.map((item) => item.node))
        console.log("Items", items);

        setLoadPage(false);
      }
    }
    getItems();
  }, []);

  const fetchMoreData = () => {
    console.log("Passou..");
    setTimeout(() => {
      setItems([...items, ...allProducts])
      console.log("Passou items..", items);
    }, 1500);
  };

  return (
    <>
      {
        loadPage ? (<div>carregando...</div>) :
          (
            <>
              <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
              >

               {/* <ProductsScrollCards>
                
              </ProductsScrollCards>  */}


              </InfiniteScroll>
            </>
          )
      }
    </>
  );
};