"use client";
import Chat from "@/Components/main/Chat";
import { Fragment } from "react";

export default function chatPage({ params }) {
  const name = params.userName;

  return (
    <Fragment>
      <Chat />
    </Fragment>
  );
}
