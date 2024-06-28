import * as commonCommands from "./commands/common";
import * as profileCommands from "./commands/profile";
import * as articleCommands from "./commands/article";
import * as commentsCommands from "./commands/comments";
import * as ratingCommands from "./commands/rating";

Cypress.Commands.addAll(commonCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentsCommands);
Cypress.Commands.addAll(ratingCommands);
// обертку переопределить
// Cypress.Commands.overwrite("mount")

// Cypress.Commands.overwrite("intercept", (req) => {
//   const FIXTURE_MODE = process.env.FIXTURE_MODE;
//   const fixtureName = req.METHOD + req.url + hash(req.body);
//   if (FIXTURE_MODE == "READ") {
//     readFixture(fixtureName);
//   }
//   if (FIXTURE_MODE == "WRITE") {
//     createFixture(fixtureName, req.body);
//   }
//   if (FIXTURE_MODE == "API") {
//     // real data reelease
//   }
// });
export {};
