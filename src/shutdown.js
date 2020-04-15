const express = require("express");
const router = express.Router();
const { unregister } = require("./register");

router.all("/", async function(req, res, next) {
  let report = "service was shot down ᕦ(ツ)ᕤ";
  await unregister().catch(e => {
    report = "problem shutting down the service:<br/>" + e
  });

  res.status(200);
  res.send(`
    <div class='center'>
      <span class='yellow'>${report}</span>
    </div>
    <style>
    .center  {
      margin: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }

    .yellow {
      background: yellow;
    }
    </style>
`);
});

module.exports = router;
