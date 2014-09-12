/*global Ember */
'use strict';

var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});
App.Router.map(function() {
  this.route('credits', {
    path: '/thanks'
  }); // the name (href and LOG_TRANSITIONS) is 'credits', the URL is 'thanks'
  this.route('about');
  this.resource('products');
});
// you must call .property() at the end of any method to call it in a controller. See productsCount().property() for proof
// a method cannot access a variable that is declared after the method: ex. productsCount() could not return App.PRODUCTS.length
App.IndexController = Ember.Controller.extend({
  productsCount: function() {
    return App.PRODUCTS.length;
  }.property(),
  logo: 'images/logo-small.png',
  time: function() {
    return (new Date()).toDateString();
  }.property()
});
App.AboutController = Ember.Controller.extend({
  contactName: 'Anostagia',
  avatar: 'images/avatar.png',
  day: function() {
    var today = (new Date()).getDay();
    return this.days[today];
  }.property(),
  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
});


// This resourse route returns a resource, in this case App.products which is intuitively tied to the model method. Can call {{#each}} on the model
App.ProductsRoute = Ember.Route.extend({
  model: function() {
    return App.PRODUCTS;
  }
});
App.PRODUCTS = [{
  title: 'Flint',
  price: 99,
  description: 'Flint is a hard, sedimentary cryptocrystalline form of the mineral quartz, categorized as a variety of chert.',
  isOnSale: true,
  image: 'images/products/flint.png'
}, {
  title: 'Kindling',
  price: 249,
  description: 'Easily combustible small sticks or twigs used for starting a fire.',
  isOnSale: false,
  image: 'images/products/kindling.png'
}];