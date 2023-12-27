import { gql } from '@apollo/client';

export const PRODUCT_DETAIL = gql` 
query Products($sku: String){
  products(filter: { sku: { eq: $sku }}) {
    items {
      image {
        url
      }
      media_gallery {
        url
        label
      }
      name 
      sku
      __typename
      price_range {
        maximum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
          discount {
            amount_off
            percent_off
          }
        }
      }
      short_description {
        html
      }
      description {
        html
      }
      ... on ConfigurableProduct {
        configurable_options {
          label
          values {
            label
            value_index
          }
        }
        variants {
          product {
            sku
          }
          attributes {
            label
            code
            value_index
          }
        }
      }
      related_products {
        name
        sku
        image {
          url
        }
      }
    }
  }
}
`;