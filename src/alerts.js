const express = require("express");
const router = express.Router();
const { version } = require("./versions");

router.all("/", function(req, res, next) {
  // Log the request
  console.log("alerts request: ");
  console.log("  method: ", req.method);
  console.log("  query parameters: ", req.query);
  console.log("  headers: ", req.headers);
  console.log("  body: ", req.body);

  if (req.method === 'OPTIONS'){
    return res.status(200).json({title: "HELLO"});
  }
  
  // Check method
  if (req.method !== version.method) {
    return res.status(405).json({ title: "Method not allowed" });
  }

  // Locality parameter in body
  if (!(version.localityParameter in req.body)) {
    res.status(400);
    return res.json({
      title: "Missing required parameter",
      detail: `missing required address locality parameter '${version.localityParameter}'`
    });
  }

  // Find the locality
  const locality = req.body[version.localityParameter];
  if (!(locality in responses)) {
    res.status(404);
    return res.json({
      title: "Not found",
      detail: `address locality '${locality}' not found`
    });
  }

  res.status(200);
  res.json(responses[locality]);
});


//
// Mock the data
//
const responses = {
  'Arbordale': {
    caption: "Earthquake 4.2M",
    detail:
      "Earthquake 4.2M",
    level: "warning",
    start: "2019-12-9T16:24:08Z",
    end: "2019-11-14T16:24:08Z"    
  },
  'Lexington': {
    caption: "Heavy Rain & Storms",
    detail:
      "Extensive rain. Flooding is possible.",
    level: "advisory",
    start: "2019-12-9T16:24:08Z",
    end: "2019-11-14T16:24:08Z"
  }
};

module.exports = router;
