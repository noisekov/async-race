import { ISendBodyData } from "../../type/type";
import { MAIN_URL } from "../data/global-var";

export class APIService {
  static async post(data: ISendBodyData): Promise<Response> {
    return await fetch(MAIN_URL + "/garage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  static async patch(id?: string | null, status?: string): Promise<Response> {
    return await fetch(MAIN_URL + `/engine?id=${id}&status=${status}`, {
      method: "PATCH",
    });
  }
  static async get(path: string): Promise<Response> {
    return await fetch(MAIN_URL + path);
  }
  static async delete(id: string): Promise<Response> {
    return await fetch(MAIN_URL + `/garage/${id}`, {
      method: "DELETE",
    });
  }
  static async put(
    id?: string | null,
    data?: ISendBodyData
  ): Promise<Response> {
    return await fetch(MAIN_URL + "/garage" + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}
