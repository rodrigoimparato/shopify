import {
  Card,
  ResourceList,
  ResourceItem,
  Stack,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import store from "store-js";
import { useShopifyQuery } from "../../hooks";

const GET_PRODUCTS_BY_ID = `
  query getProducts($ids: [ID!]!){
    nodes(ids: $ids){
      ... on Product {
        title
        handle
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
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
  `;

function ProductList() {

  const result = useShopifyQuery(
    {
      "key": "KEY",
      "query": GET_PRODUCTS_BY_ID,
      "variables": {
        "ids": store.get("ids")
      }
    });

  if (result.isLoading) return <div>loading...</div>;

  if (result.isError) return <div>{result.error.response.message}</div>;

  console.log("this is result", result);

  return (

    <Card>
      <ResourceList
        showHeader
        resourceName={{ singular: "Product", plural: "Products" }}
        items={ result.data.data.nodes }
        renderItem={(item) => {
          const media = (
            <Thumbnail
              source={
                item.images.edges[0]
                  ? item.images.edges[0].node.originalSrc
                  : ""
              }
              alt={
                item.images.edges[0] ? item.images.edges[0].node.altText : ""
              }
            />
          );
          const price = item.variants.edges[0].node.price;
          return (
            <ResourceItem
              id={item.id}
              media={media}
              accessibilityLabel={`View details for ${item.title}`}
            >
              <Stack>
                <Stack.Item fill>
                  <h3>
                    <TextStyle variation="strong">{item.title}</TextStyle>
                  </h3>
                </Stack.Item>
                <Stack.Item>
                  <p>${price}</p>
                </Stack.Item>
              </Stack>
            </ResourceItem>
          );
        }}
      />
    </Card>
  );
}

export default ProductList;