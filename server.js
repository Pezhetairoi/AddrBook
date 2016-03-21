/**
 * Created by sijiehao on 21/02/2016.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

var id = 7;
var data = {
    1: { id: 1, firstName: 'Danny',    lastName: 'Stork',  contactNumber: 51517432, email: 'dannystork@example.com' },
    2: { id: 2, firstName: 'Carlotta', lastName: 'McOwen', contactNumber: 56512130, email: 'carlottamcowen@example.com' },
    3: { id: 3, firstName: 'Luther',   lastName: 'Ellery', contactNumber: 43001212, email: 'lutherellery@example.com' },
    4: { id: 4, firstName: 'Finch',    lastName: 'Hosky', contactNumber: 96512976, email: 'finchhosky@example.com' },
    5: { id: 5, firstName: 'Carson',   lastName: 'Andrews', contactNumber: 13514192, email: 'carsonandrews@example.com' },
    6: { id: 6, firstName: 'Mac',      lastName: 'Parker', contactNumber: 56675098, email: 'macparker@example.com' },
    7: { id: 7, firstName: 'J. D.',    lastName: 'Barney', contactNumber: 56001123, email: 'jdbarney@example.com' }
};

//parse json string containing in HTTP request from browser
app.use(bodyParser.json());
app.use(express.static('./'));

//route
app.route('/api/contacts')
    .get(function(req, res){
        res.json(Object.keys(data).map(function(key){
            return data[key];
        }));
    })

    .post(function(req, res){
        var record = req.body;
        record.id = ++id;
        data[record.id] = record;
        res.json(record);
    });

app.route('/api/contacts/:id')
    .get(function(req, res){
        res.json(data[req.params.id]);
    })
    .put(function(req, res){
        data[req.params.id] = req.body;
        res.json(req.body);
    })
    .delete(function(req, res){
        delete data[req.params.id];
        res.json(null);
    });


//get every route doesn't match above routes
app.get('*', function(req, res){
   res.sendFile(__dirname + '/index.html');
});

app.listen(3000);

