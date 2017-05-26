var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static('app'));
var mongoose = require('mongoose');
mongoose.connect('mongodb://dungdinh:tthuyddung218@ds143241.mlab.com:43241/productmanagement');
var productList = [
  { id: 1, name: 'Harry Potter and Deathly Hallows', description: 'This is a fantastic book!', price: 20 },
  { id: 2, name: 'Kindle Paperwhite', description: 'This is a fantastic machine!', price: 100 }
];
var Product = require('./models/product');
function ProductTemplate() {
  return {
    id: -1,
    name: '',
    description: '',
    price: -1
  }
}
app.get('/api/products', function (req, res) {
  Product.find({
  }).select().exec(function (err, products) {
    if (err) {
      return res.status(404).send('Not found');
      console.log('Failed!!');
    } else {
      res.status(200).send({ "data": products });
    }
  });
});

app.get('/api/products-no-signin', function (req, res) {
  Product.find({
  }).select().exec(function (err, products) {
    if (err) {
      return res.status(404).send('Not found');
    } else {
      var result = [];
      if (products.length > 2) {
        result.push(products[0]);
        result.push(products[1]);
      } else {
        result = products;
      }
      res.status(200).send({ "data": result });
    }
  });
});


app.post('/api/products', function (req, res) {
  // create a sample user
  var product = new Product({
    id: null,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  });
  Product.findOne().sort({
    id: -1
  }).select('id -_id').limit(1).exec(function (err, number) {
    if (number.id == null)
      product.id = 100000;
    else {
      product.id = number.id + 1;
    }
    // save the sample product
    product.save(function (err) {
      Product.find({
      }).select().exec(function (err, products) {
        if (err) {
          return res.status(404).send('Not found');
          console.log('Failed!!');
        } else {
          res.status(200).send({ "data": products });
        }
      });
    });
  });
});

app.post('/api/products/:id', function (req, res) {
  var id = req.params.id;
  Product.remove({
    id: req.params.id
  }, function (err) {
    if (!err) {
      Product.find({
      }).select().exec(function (err, products) {
        if (err) {
          return res.status(404).send('Not found');
          console.log('Failed!!');
        } else {
          res.status(200).send({ "data": products });
          console.log(products);
        }
      });
    } else {
      console.log(error);
    }
  });
});

app.put('/api/products/:id', function (req, res) {
  var id = req.params.id;
  Product.findOne({ id: id }).exec(function (err, product) {
    product.id = req.body.id;
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;

    product.save(function (err) {
      res.status(200).send({ message: 'Rating saved' });
    });
  });
});

app.post('/api/login', function(req, res) {
  //dang nhap thanh cong
  res.status(200).send({
    isLoginSuccess: true,
    username: 'Dinh Thi Thuy Dung'
  });
  //dang nhap that bai
  // res.status(200).send({
  //   isLoginSuccess: false,
  //   message: 'Username of password is incorrect.',
  // });
});

app.put('/api/register', function(req, res) {
  //dang ky thanh cong
  res.status(200).send({
    isRegisterSuccess: true,
    username: 'Dinh Thi Thuy Dung'
  });
  //dang ky that bai
  res.status(200).send({
    isRegisterSuccess: false,
    message: 'Username is already exist.',
  });
})

var port = process.env.PORT || 8081;
app.listen(port);