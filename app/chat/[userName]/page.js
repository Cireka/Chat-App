"use client";
import ContextProvider from "@/Components/Context/ContextProvider";
import Chat from "@/Components/main/Chat";
import { Fragment } from "react";

export default function chatPage({ params }) {
  const name = params.userName;

  return (
    <Fragment>
      <ContextProvider>
        <Chat userName={name} />
      </ContextProvider>
    </Fragment>
  );
}
