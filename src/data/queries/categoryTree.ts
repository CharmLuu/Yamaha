import { gql } from '@apollo/client';

export const CATEGORY_TREE = gql` 
query GetCategoryList($cateId: [String]){
    categoryList(filters: {ids: {in: $cateId}}) {
        children {
          id
          level
          name
        }
    }
}`;