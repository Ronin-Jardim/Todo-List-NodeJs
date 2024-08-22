var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var mongoDb = require('mongodb')

//connect to db

mongoose.connect('mongodb+srv://roninstormjardim:test@to-do-list.rl7jz.mongodb.net/?retryWrites=true&w=majority&appName=To-Do-List')

//create a schema , this is like a blueprint

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var itemOne = Todo({item: 'get flowers'}).save(function(err){
if (err) throw err;
console.log('item saved');
});



var data = [{item: 'get milk'}, { item: 'walk dog'}, { item: 'kick some coding ass'}]

var urlencodedParser = bodyParser.urlencoded({extended: true})

module.exports = function(app){

    app.get('/todo', function(req, res){
res.render('todo', {todos: data})
    });
    app.post('/todo',urlencodedParser ,
        function(req, res){
            data.push(req.body);
            res.json(data);
    });

    app.delete('/todo/:item',  function(req, res){
       data = data.filter(function(todo){
        return todo.item.replace(/ /g, '-') !== req.params.item
       });
       res.json(data)
    });
}



// user password npm install mongodb