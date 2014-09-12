/*global Ember */
'use strict';

var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});
/*
regular routes: adjectives, verbs, adverbs
resource routes are typically nouns (singular or plural. resource rate templates are declared the same way)
*/
App.Router.map(function() {
  this.route('credits', {
    path: '/thanks'
  }); // the name (href and LOG_TRANSITIONS) is 'credits', the URL is 'thanks'
  this.route('about');
  this.resource('products');
  this.resource('product', {path: 'products/:title'});
  this.resource('contacts');
  this.resource('contact', {path: '/contacts/:name'});
});
// you must call .property() at the end of any method to call it in a controller. See productsCount().property() for proof
// a method cannot access a variable that is declared after the method: ex. productsCount() could not return App.PRODUCTS.length
// Controllers decorate the model and provide default values
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


// This resourse route returns a resource, in this case App.products which is intuitively tied to the model method. Can call {{#each}} on the model (which can be an object or an array). The route is responsible for fetching the model!!!!
// ROUTER !== ROUTE
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

// Check out that sick ass findBy method that Ember gave us. SWEET!
App.ProductRoute = Ember.Route.extend({
  model: function(params) {
    return App.PRODUCTS.findBy('title', params.title);
  }
});

App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return App.CONTACTS;
  }
});
App.CONTACTS = [
  {
    name: 'Giamia',
    about: 'Although Giamia came from a humble spark of lightning, he quickly grew to be a great craftsman, providing all the warming instruments needed by those close to him.',
    avatar: 'images/contacts/giamia.png'
  },
  {
    name: 'Anostagia',
    about: 'Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.',
    avatar: 'images/contacts/anostagia.png'
  }
];

App.ContactRoute = Ember.Route.extend ({
  model: function(params) {
    return App.CONTACTS.findBy('name', params.name);
  }
});




/*

App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: 'images/logo-small.png',
  time: function() {
    return (new Date()).toDateString();
  }.property()
});
App.AboutController = Ember.Controller.extend({
  contactName: 'Anostagia',
  avatar: 'images/avatar.png',
  open: function() {
    return ((new Date()).getDay() === 0) ? "Closed" : "Open";
  }.property()
});

App.ProductsRoute = Ember.Route.extend({
  model: function() {
    return App.PRODUCTS;
  }
});
App.ProductRoute = Ember.Route.extend({
  model: function(params) {
    return App.PRODUCTS.findBy('title', params.title);
  }
});


App.PRODUCTS = [
  {
    title: 'Flint',
    price: 99,
    description: 'Flint is a hard, sedimentary cryptocrystalline form of the mineral quartz, categorized as a variety of chert.',
    isOnSale: true,
    image: 'images/products/flint.png'
  },
  {
    title: 'Kindling',
    price: 249,
    description: 'Easily combustible small sticks or twigs used for starting a fire.',
    isOnSale: false,
    image: 'images/products/kindling.png'
  }
];



*/