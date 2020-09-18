"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("../entity/user");
const exceptions_1 = require("../exceptions");
class UserController {
    static async listUsers(ctx) {
        const userRepository = typeorm_1.getManager().getRepository(user_1.User);
        const users = await userRepository.find();
        ctx.status = 200;
        ctx.body = users;
    }
    static async showUserDetail(ctx) {
        const userRepository = typeorm_1.getManager().getRepository(user_1.User);
        const user = await userRepository.findOne(+ctx.params.id);
        if (user) {
            ctx.status = 200;
            ctx.body = user;
        }
        else {
            throw new exceptions_1.NotFoundException();
        }
    }
    static async updateUser(ctx) {
        const userId = +ctx.params.id;
        if (userId !== +ctx.state.user.id) {
            throw new exceptions_1.ForbiddentException();
        }
        const userRepository = typeorm_1.getManager().getRepository(user_1.User);
        await userRepository.update(+ctx.params.id, ctx.request.body);
        const updatedUser = await userRepository.findOne(+ctx.params.id);
        if (updatedUser) {
            ctx.status = 200;
            ctx.body = updatedUser;
        }
        else {
            ctx.status = 404;
        }
    }
    static async deleteUser(ctx) {
        const userId = +ctx.params.id;
        if (userId !== +ctx.state.user.id) {
            throw new exceptions_1.ForbiddentException();
        }
        const userRepository = typeorm_1.getManager().getRepository(user_1.User);
        await userRepository.delete(+ctx.params.id);
        ctx.status = 204;
    }
}
exports.default = UserController;
