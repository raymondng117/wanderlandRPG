// initialize the angular module
// add any dependency you wanna use in the second parameter which is an array
const myApp = angular.module('myApp', ['ngRoute', 'ngAnimate'])

// place prepration codes that fire  before the application runs
// In this case, setting up the routes
myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix(''); // Use HTML5 mode for URLs
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
        })
        .when('/classdescription', {
            templateUrl: 'views/classdescription.html',
            controller: 'fighterListController'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'fighterListController'
        })
        .when('/addFighter', {
            templateUrl: 'views/addFighter.html',
            controller: 'fighterListController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

myApp.directive('classDescription', [function () {
    return {
        restrict: 'E',
        scope: {
            fighters: '=', // Use '=' for two-way binding
            title: '='    // Use '@' for string binding
        },
        templateUrl: 'views/classcontent.html',
        transclude: true,

        // replace is just used to replace the custom directive name to be the name of the most outside parent elment
        // which can be seen in broswer inspect 
        replace: true,
        controller: function ($scope) {
            $scope.random = Math.floor(Math.random() * 4);
            $scope.classes = [
                "Mage",
                "Hunter",
                "Priest",
                "Warrior",
            ]
            $scope.getClassContent = function (selectedClass) {
                // Find the selected class in the fighters array
                const selectedFighter = $scope.fighters.find(fighter => fighter.class === selectedClass);

                if (selectedFighter) {
                    return selectedFighter;
                }

                return {
                    role: 'Class not found',
                    description: 'This class is not available in the data.'
                };
            };
        }
    }
}]);


// create sepcific controller
// $scope can be thought of the angular controller's scope in which which elements should be applied
myApp.controller('fighterListController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.classes = [
        "Mage",
        "Hunter",
        "Priest",
        "Warrior",
    ]

    // if you wanna input data from public/data/fighters.json instead of using data below ($scope fighters), uncomment below codes and turn on the server by typing "node server.js" in the CLI.
    // $http.get('http://localhost:3000/data/fighters.json').then(function (response) {
    //     $scope.fighters = response.data;
    // });

    $scope.fightersJSON = localStorage.getItem('fightersData');

    if (!$scope.fightersJSON) {
        $scope.fighters = [
            {
                name: "Raymond",
                level: 29,
                class: "Mage",
                combatPower: 1000,
                classColor: "info",
                classThumb: "content/mage.jfif",
                content: {
                    role: "Spellcaster and Crowd Control",
                    description: "Mages harness the power of arcane magic to cast destructive spells and control the battlefield. They are masters of crowd control, able to freeze, burn, and manipulate enemies with a wide range of spells."
                },
                available: true
            },
            {
                name: "Tiffany",
                level: 26,
                class: "Hunter",
                combatPower: 1200,
                classColor: "success",
                classThumb: "content/hunter.jfif",
                content: {
                    role: "Ranged Damage Dealer",
                    description: "Hunters are skilled marksmen known for their precision and ranged combat abilities. They excel at dealing damage from a distance using bows or firearms. Hunters often have unique abilities for tracking and taming animals, which can be used in and out of combat."
                },
                available: true
            },
            {
                name: "Rachael",
                level: 30,
                class: "Priest",
                combatPower: 500,
                classColor: "warning",
                classThumb: "content/priest.jfif",
                content: {
                    role: "Healer and Support",
                    description: "The Priest class specializes in healing and supporting their allies. They possess powerful restorative spells and abilities to keep their team members alive in battle. Additionally, Priests often have crowd-control abilities and can remove harmful effects from their teammates."
                },
                available: true
            },
            {
                name: "Leon",
                level: 28,
                class: "Warrior",
                combatPower: 550,
                classColor: "danger",
                classThumb: "content/warrior.jfif",
                content: {
                    role: "Tank and Melee Damage Dealer",
                    description: "Warriors are formidable melee combatants and tanks. They can absorb a tremendous amount of damage and are often found at the front lines of battles. Warriors are known for their powerful strikes and abilities that enable them to control and disrupt opponents on the battlefield."
                },
                available: true
            }
        ]
    } else if (!$scope.fightersJSON && $scope.onceDeletedAll) {
        $scope.fighters = [];
    } 
    else {
        let fightersArray = JSON.parse($scope.fightersJSON);
        $scope.fighters = fightersArray
    }

    $scope.removeFighter = function (figther) {
        const removeFighter = $scope.fighters.indexOf(figther);
        $scope.fighters.splice(removeFighter, 1)
        const fightersJSON = JSON.stringify($scope.fighters);
        // Save the JSON string to localStorage
        localStorage.setItem('fightersData', fightersJSON);
    }

    $scope.resetAll = function () {
        $scope.fighters = [
            {
                name: "Raymond",
                level: 29,
                class: "Mage",
                combatPower: 1000,
                classColor: "info",
                classThumb: "content/mage.jfif",
                content: {
                    role: "Spellcaster and Crowd Control",
                    description: "Mages harness the power of arcane magic to cast destructive spells and control the battlefield. They are masters of crowd control, able to freeze, burn, and manipulate enemies with a wide range of spells."
                },
                available: true
            },
            {
                name: "Tiffany",
                level: 26,
                class: "Hunter",
                combatPower: 1200,
                classColor: "success",
                classThumb: "content/hunter.jfif",
                content: {
                    role: "Ranged Damage Dealer",
                    description: "Hunters are skilled marksmen known for their precision and ranged combat abilities. They excel at dealing damage from a distance using bows or firearms. Hunters often have unique abilities for tracking and taming animals, which can be used in and out of combat."
                },
                available: true
            },
            {
                name: "Rachael",
                level: 30,
                class: "Priest",
                combatPower: 500,
                classColor: "warning",
                classThumb: "content/priest.jfif",
                content: {
                    role: "Healer and Support",
                    description: "The Priest class specializes in healing and supporting their allies. They possess powerful restorative spells and abilities to keep their team members alive in battle. Additionally, Priests often have crowd-control abilities and can remove harmful effects from their teammates."
                },
                available: true
            },
            {
                name: "Leon",
                level: 28,
                class: "Warrior",
                combatPower: 550,
                classColor: "danger",
                classThumb: "content/warrior.jfif",
                content: {
                    role: "Tank and Melee Damage Dealer",
                    description: "Warriors are formidable melee combatants and tanks. They can absorb a tremendous amount of damage and are often found at the front lines of battles. Warriors are known for their powerful strikes and abilities that enable them to control and disrupt opponents on the battlefield."
                },
                available: true
            }
        ]
        const fightersJSON = JSON.stringify($scope.fighters);
        // Save the JSON string to localStorage
        localStorage.setItem('fightersData', fightersJSON);
    }

    $scope.addFighter = function () {
        let color = ""
        let thumb = ""

        switch ($scope.newFighter.class.toLowerCase()) {
            case "mage":
                color = "info";
                thumb = "content/mage.jfif";
                break;

            case "hunter":
                color = "success";
                thumb = "content/hunter.jfif";
                break;

            case "priest":
                color = "warning";
                thumb = "content/priest.jfif";
                break;

            case "warrior":
                color = "danger";
                thumb = "content/warrior.jfif";
                break;
        }

        $scope.fighters.push({
            name: $scope.newFighter.name,
            level: parseFloat($scope.newFighter.level),
            class: $scope.newFighter.class,
            combatPower: parseFloat($scope.newFighter.combatPower),
            classColor: color,
            classThumb: thumb,
            available: true
        });

        const fightersJSON = JSON.stringify($scope.fighters);
        // Save the JSON string to localStorage
        localStorage.setItem('fightersData', fightersJSON);
        $location.path('/directory');
    }

    $scope.goToAddFighter = function () {
        $location.path('/addFighter');
    };
}])