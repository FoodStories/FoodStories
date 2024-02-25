import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiGatewayPostService } from './post.service';
import { IsNotEmpty} from 'class-validator'
import { AuthGuard } from '@food-stories/api-gateway/common';


export class CreatePostDto {
  @IsNotEmpty()
  userId!: string
  caption?: string
}

@Controller()
@UseGuards(AuthGuard)
export class ApiGatewayPostController {
  constructor(private apiGatewayPostService: ApiGatewayPostService) {}
  

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.apiGatewayPostService.createPost({userId: createPostDto.userId, caption: createPostDto.caption})
  }

  @Put('/mediaUrls/:postId')
  updatePostMediaUrls(@Body() body: {mediaUrls: string[]}, @Param('postId') postId: string) {
    return this.apiGatewayPostService.updatPostMediaUrls({postId, mediaUrls: body.mediaUrls})
  }
}

