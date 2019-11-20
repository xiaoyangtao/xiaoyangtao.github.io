var angularTemplate = angular.module('angularTemplate', []);

angularTemplate.controller('AngularTemplateCtrl', function($scope) {
  
  // initialize all the models (i.e., data structures) that you'll reference in the HTML
  $scope.personalInfo = '';

  // load data from json file
  // $http.get('http://ranjithakumar.net/js/js/dataTemplate.json').then(function(d) {
   // $.getJSON('assets/dataTemplate.json',function(d) {
    $scope.personalInfo = data;
    console.log($scope.personalInfo);
  // });

});