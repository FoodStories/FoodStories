import { ILogger } from "@food-stories/common/logger";
import { IPost, IUpdatePostMediaUrlsRequest } from "@food-stories/common/typings";
import { IUpdateMediaUrlsUseCase } from "../interfaces/usecases/updateMediaUrls.interface";
import { IUpdateMediaUrlsRepo } from "../interfaces/repository/updateMediaUrls.interface";

export class UpdateMediaUrls implements IUpdateMediaUrlsUseCase {
  constructor(private repo: IUpdateMediaUrlsRepo, private logger: ILogger) {}


 async execute(request: IUpdatePostMediaUrlsRequest): Promise<IPost> {
      const post =  await this.repo.updateMediaUrls(request)
      this.logger.info('Updated mediaUrls for post' + request.postId)
      return post;
  }
}