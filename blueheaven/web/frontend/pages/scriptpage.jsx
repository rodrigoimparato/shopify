import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import { useShopifyQuery } from "../hooks";
import { useState } from "react";
import store from "store-js";
import { EmptyState } from "@shopify/polaris"
import ProductList from "../components/ProductList/resourcelist";

const QUERY_SCRIPTTAGS = `
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

export default function ScriptPage() {

  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get("ids");


  function handleSelection(resources) {
    const idsFromResources = resources.selection.map((product) => product.id);
    setModal({ open: false });
    store.set("ids", idsFromResources);
  }

  // const result = useShopifyQuery(
  //   {
  //     "key": "KEY",
  //     "query": QUERY_SCRIPTTAGS,
  //     "variables": {
  //       "ids": store.get("ids")
  //     }
  //   });
  // console.log("Result", result);


  return (
    <Page>
      <ResourcePicker
        resourceType="Product"
        open={modal.open}
        onCancel={() => setModal({ open: false })}
        onSelection={(resources) => handleSelection(resources)}
      />
      <TitleBar
        title="Script page"
        primaryAction={{
          content: "Open Modal",
          onAction: () => setModal({ open: true }),
        }}
        secondaryActions={[
          {
            content: "Secondary botton",
            onAction: () => console.log("Secondary action"),
          },
        ]}
      />
      <Layout>
          {emptyState ? (
            <EmptyState
              heading="Manage Products"
              action={{
                content: "Select Products",
                onAction: () => setModal({ open: true }),
              }}
              image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            >
              <p>Select Products</p>
            </EmptyState>
          ) : (
            <ProductList />            
          )
        }


        {/* <Layout.Section>
          <Card sectioned>
            <Heading>Olá mundo!</Heading>
            <TextContainer>
              <p>Bem vindo!</p>
            </TextContainer>
          </Card>
        </Layout.Section> */}
      </Layout>
    </Page>
  );
}