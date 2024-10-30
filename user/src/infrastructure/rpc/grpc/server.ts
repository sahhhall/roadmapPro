import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

import { CreateUserProfileRequest, CreateUserProfileResponse } from '@sahhhallroadmappro/common'

//loadin prorofile path currently on nodemodules that i created pacakge
const PROTO_PATH = path.join(__dirname,'../../../../node_modules/@sahhhallroadmappro/common/src/protos/auth.proto');

//it return ob
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});

console.log(packageDefinition,"package definitiob")
// convert into grpc obje with what we neamed definition in there
const userProto = (grpc.loadPackageDefinition(packageDefinition) as any).user;
console.log(userProto,"userproto")

class UserServiceGrpc {
    private server: grpc.Server;
    private port: number;

    constructor(port: number) {
        this.server = new grpc.Server();
        this.port = port;
        this.initializeService();
    };

    private initializeService() {
        const userService = {
            CreateUserProfile: (
                call: grpc.ServerUnaryCall<CreateUserProfileRequest, CreateUserProfileResponse>,
                callback: grpc.sendUnaryData<CreateUserProfileResponse>
            ) => {
                const { userId, email, name, isGoogle, avatar } = call.request;
                console.log(`Received request: userId=${userId}, email=${email} ${name}`);

                callback(null, { userId, success: true });
            },
        };
        this.server.addService(userProto.UserService.service, userService);
    }

    public start(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server.bindAsync(
                `0.0.0.0:${this.port}`,
                grpc.ServerCredentials.createInsecure(),
                () => {
                    console.log("Profile Service running on port 50051");
                    resolve();
                }
            );
        });
    }
}

export const grpcService = new UserServiceGrpc(process.env.GRPC_PORT as any || 50051);