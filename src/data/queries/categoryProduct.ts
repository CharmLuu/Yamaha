import { gql } from '@apollo/client';

export const CATEGORY_PRODUCT = gql` 
query Products($cateId: String){
    products (filter: {category_id: {eq: $cateId}}){
        total_count
        items{
            id
            sku
            name
            url_key
            stock_status
            thumbnail{
                url
                label
                position
            }
            image{
                url
                label
                position
            }
            price_range{
                minimum_price{
                    regular_price{
                        value
                        currency
                    }
                    final_price{
                        value
                        currency
                    }
                    discount {
                        amount_off
                        percent_off
                    }
                }
                maximum_price{
                    regular_price{
                        value
                        currency
                    }
                    final_price{
                        value
                        currency
                    }
                    discount {
                        amount_off
                        percent_off
                    }
                }
            }
        }
    }
}`;