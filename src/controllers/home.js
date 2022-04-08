const path = require("path");
const home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../../../../FRONT/PWEB3TC-front/PWEB/src/app/user-file/user-file.component.html`));
};
module.exports = {
  getHome: home
};
