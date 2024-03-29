import { handleUnaryCall } from "@grpc/grpc-js";
import { Observable } from "rxjs";

export  interface ISocialNetworkServiceServer {
   followAUser: handleUnaryCall<FollowOrUnollowAUserRequest, void>
   unfollowAUser: handleUnaryCall<FollowOrUnollowAUserRequest, void>
   isFollowing: handleUnaryCall<FollowOrUnollowAUserRequest, void>
}


export interface ISocialNetworkServiceClient {
  followAUser(request:FollowOrUnollowAUserRequest) :Observable<void>;
  unfollowAUser(request: FollowOrUnollowAUserRequest): Observable<void>;
  isFollowing(request: FollowOrUnollowAUserRequest): Observable<void>;

}

export interface IisFollowingResponse {
  isFollowing: boolean;
}

export interface FollowOrUnollowAUserRequest {
  followerId: string;
  followeeId: string;
}


