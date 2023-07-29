import { IPostData } from "../../type/type";
import { MAIN_URL } from "../data/global-var";

export class SendRequest {
  static async post(data: IPostData) {
    await fetch(MAIN_URL + "/garage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}
