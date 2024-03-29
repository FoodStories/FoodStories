import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiGatewaySocialNetworkService } from './social-network.service';

@Controller('social-networks')
export class ApiGatewaySocialNetworkController {
  constructor(
    private apiGatewaySocialNetworkService: ApiGatewaySocialNetworkService
  ) {}


  @Post(':followeeId')
  followAAUser(@Param('followeeId') followeeId: string, @Body() body: {followerId: string}) {
    return this.apiGatewaySocialNetworkService.followAUser({followeeId, followerId: body.followerId});
  }

  @Delete(':followeeId')
  unfollowAUser(@Param('followeeId') followeeId: string, @Body() Body:  {followerId: string}) {
    return this.apiGatewaySocialNetworkService.unfollowAUser({followeeId, followerId: Body.followerId});
  }

  @Get(':followeeId')
  isFollowing(@Query('followerId') followerId: string, @Param('followeeId') followeeId: string) {
    return this.apiGatewaySocialNetworkService.isFollowing({followeeId, followerId })
  }
}
