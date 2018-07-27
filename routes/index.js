const path = require("path");
const router = require("express").Router();
const articleController = require("../controllers/articleController");

router
  .route("/articles")
  .get(articleController.findAll)
  .post(articleController.create);

router
  .route("/articles/:id")
  .get(articleController.findById)
  .put(articleController.update)
  .delete(articleController.remove);


router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

module.exports = router;
