import {  Server } from '@grpc/grpc-js';
import { join } from 'path';
import { createStartGRPCServer, getGrpcServiceDefinition } from '@food-stories/common/grpc'
import { UsersServiceImpl } from '../remote-methods/users.rpc-methods';

const PROTO_PATH = join(__dirname, 'proto', 'users_service.proto')

const usersService = getGrpcServiceDefinition({
  packageName: 'users_service',
  protoPath: PROTO_PATH,
  serviceName: 'UsersService',
})

const grpcServer = new Server();


// eslint-disable-next-line @typescript-eslint/no-explicit-any
grpcServer.addService(usersService, UsersServiceImpl as any);

const startGRPCServer = createStartGRPCServer(grpcServer);

export  { startGRPCServer };