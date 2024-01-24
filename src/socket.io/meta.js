"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// The next line calls a function in a module that has not been updated to TS yet
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const user_1 = __importDefault(require("../user"));
// The next line calls a function in a module that has not been updated to TS yet
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const topics_1 = __importDefault(require("../topics"));
void  | never;
leaveCurrent(Socket, Date, () => void  | never);
void  | never;
reconnected(Socket, Date, (void ), void  | never);
void  | never;
;
SocketMeta.reconnected = function (socket, _data, callback, , , never) {
    callback = callback || function () { };
    if (socket.uid) {
        topics_1.default.pushUnreadCount(socket.uid);
        user_1.default.notifications.pushCount(socket.uid);
    }
    callback();
};
/* Rooms */
function leaveCurrentRoom(socket) {
    if (socket.currentRoom) {
        socket.leave(socket.currentRoom);
        socket.currentRoom = '';
    }
}
SocketMeta.rooms.enter = function (socket, data, callback) {
    if (!socket.uid) {
        return callback();
    }
    if (!data) {
        return callback(new Error('[[error:invalid-data]]'));
    }
    if (data.enter) {
        data.enter = data.enter.toString();
    }
    if (data.enter && data.enter.startsWith('uid_') && data.enter !== `uid_${socket.uid}`) {
        return callback(new Error('[[error:not-allowed]]'));
    }
    leaveCurrentRoom(socket);
    if (data.enter) {
        socket.join(data.enter);
        socket.currentRoom = data.enter;
    }
    callback();
};
SocketMeta.rooms.leaveCurrent = function (socket, _data, callback) {
    if (!socket.uid || !socket.currentRoom) {
        return callback();
    }
    leaveCurrentRoom(socket);
    callback();
};
module.exports = SocketMeta;
