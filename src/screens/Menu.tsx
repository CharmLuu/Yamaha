import React from 'react'
import {Text, View} from "react-native";
import {CATEGORY_TREE} from "../data/queries/categoryTree";
import { useQuery } from '@apollo/client'
import CategoryTree from "../components/CategoryTree";

export default function Menu() {
  return(
      <CategoryTree id={2}/>
  )
}
