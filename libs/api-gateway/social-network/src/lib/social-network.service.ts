import { handleGrpcError } from '@food-stories/api-gateway/common';
import { FollowOrUnollowAUserRequest, GetFollowingsRequest, IBlockUserRequest, IHasBlockedRequest, ISocialNetworkServiceClient } from '@food-stories/common/typings';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Injectable()
export class ApiGatewaySocialNetworkService implements OnModuleInit {
  private socialNetworksService!: ISocialNetworkServiceClient;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'social_networks_service.v1',
      protoPath: join(__dirname, 'proto', 'social_networks_service.proto'),
      url: process.env['USERS_SERVICE_URI'],
    },
  })
  client!: ClientGrpc;

  onModuleInit() {
    this.socialNetworksService = this.client.getService(
      'SocialNetworksService',
    );
  }

  followAUser(data: FollowOrUnollowAUserRequest) {
    return handleGrpcError(this.socialNetworksService.followAUser(data));
  }

  unfollowAUser(data: FollowOrUnollowAUserRequest) {
    return handleGrpcError(this.socialNetworksService.unfollowAUser(data));
  }

  getRelationships(data: FollowOrUnollowAUserRequest) {
    return handleGrpcError(this.socialNetworksService.isFollowing(data));
  }

  blockUser(data: IBlockUserRequest) {
    return handleGrpcError(this.socialNetworksService.BlockUser(data));
  }

  unblockUser(data: IBlockUserRequest) {
    return handleGrpcError(this.socialNetworksService.unblockUser(data));
  }

  hasBlocked(data: IHasBlockedRequest) {
    return handleGrpcError(this.socialNetworksService.hasBlocked(data));
  }

  getFollowings(data: GetFollowingsRequest) {
    return handleGrpcError(this.socialNetworksService.getFollowings(data));
  }

}