import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import React from "react";
import { defineReactNode } from "../../noodl-sdk";

function List() {
  return <ListPlugin />;
}

export default defineReactNode({
  name: "Lexical List",
  category: "Lexical",
  getReactComponent() {
    return List;
  },
});
