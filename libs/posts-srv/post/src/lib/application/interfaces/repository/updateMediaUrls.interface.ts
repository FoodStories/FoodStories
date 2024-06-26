import { IPost, IUpdatePostMediaUrlsRequest } from "@food-stories/common/typings";

export interface IUpdateMediaUrlsRepo {
  updateMediaUrls(data: IUpdatePostMediaUrlsRequest): Promise<IPost>;
}