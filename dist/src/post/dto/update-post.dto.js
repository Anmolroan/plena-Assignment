"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatepostDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_post_dto_1 = require("./create-post.dto");
class UpdatepostDto extends (0, mapped_types_1.PartialType)(create_post_dto_1.CreatePostDto) {
}
exports.UpdatepostDto = UpdatepostDto;
//# sourceMappingURL=update-post.dto.js.map