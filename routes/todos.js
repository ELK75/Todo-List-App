var express = require("express"),
router = express.Router();

const middleware = require('../middleware/index');

router.get("/", middleware.isLoggedIn, function(req, res) {
    console.log('here');
    console.log(req.user);
    res.render("todos", {user: req.user});
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    var todo = req.body.todo;
    req.user.todos.push(todo);
    req.user.save();
    res.redirect('/todos');
});

router.delete("/:todoItem", middleware.isLoggedIn, function(req, res) {
    req.user.todos.splice(req.params.todoItem, 1);
    req.user.save();
    res.json(req.user);
});

module.exports = router;