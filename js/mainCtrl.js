angular.module('saturnQuiz')
    .controller('mainCtrl', function($scope, $http, $sce) {

        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswer = 0;
        $scope.percentage = 0;

        // $http.get('./quiz_data.json').then(function(quizData) {
        //     $scope.myQuestions = quizData.data;
        //     $scope.totalQuestions = $scope.myQuestions.length;
        // });

        $scope.selectAnswer = function(qIndex, aIndex) {
            console.log($scope.myQuestions);
            var questionState = $scope.myQuestions[qIndex].questionState; //adding questionSTate property
            if (questionState != 'answered') {
                $scope.myQuestions[qIndex].selectedAnswer = aIndex;
                var correctAnswer = $scope.myQuestions[qIndex].correct;
                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

                if (aIndex === correctAnswer) {
                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score += 1;
                } else {
                    $scope.myQuestions[qIndex].correctness = 'incorrect'
                }

                $scope.myQuestions[qIndex].questionState = 'answered';
            }

            $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(0);
        }

        $scope.isSelected = function(qIndex, aIndex) {
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        }

        $scope.isCorrect = function(qIndex, aIndex) {
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        }

        $scope.selectContinue = function() {
            return $scope.activeQuestion += 1;
        }

        $scope.createSharedLinks = function(percentage) {
            var url = 'http://codifydesign.com';

            var twitterLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?text=I scored a ' + percentage + '%25 on this quiz about Saturn. Try to beat my score at&url=' + url + '&hashtags=SaturnQuiz">Tweet your score</a>';

            var emailLink = '<a class="btn email" href="mailto:?subject=Try to beat my saturn quiz score!&body=I scored a ' + percentage + '% on this quiz about Saturn. Try to beat my score at ' + url + '">Email a friend</a>';

            var newMarkup = emailLink + twitterLink;

            return $sce.trustAsHtml(newMarkup);
        }

        $scope.myQuestions = [{
            question: "Saturn is the ____ planet from the sun",
            answers: [{
                id: 0,
                text: "fourth"
            }, {
                id: 1,
                text: "sixth"
            }, {
                id: 2,
                text: "seventh"
            }, {
                id: 3,
                text: "eighth"
            }],
            correct: 1
        }, {
            question: "Which image shows a close-up of Saturn?",
            answers: [{
                id: 0,
                "image": "images/close_up_01.jpg"
            }, {
                id: 1,
                "image": "images/close_up_02.jpg"
            }, {
                id: 2,
                "image": "images/close_up_03.jpg"
            }, {
                id: 3,
                "image": "images/close_up_04.jpg"
            }],
            correct: 3
        }, {
            question: "One year on Saturn is equivalent to how many years on Earth?",
            answers: [{
                id: 0,
                text: "12"
            }, {
                id: 1,
                text: "6"
            }, {
                id: 2,
                text: "29"
            }, {
                id: 3,
                text: "2"
            }],
            correct: 2
        }, {
            question: "What is the name of Saturn's largest moon?",
            answers: [{
                id: 0,
                text: "Hercules"
            }, {
                id: 1,
                text: "Europa"
            }, {
                id: 2,
                text: "Goliath"
            }, {
                id: 3,
                text: "Zeus"
            }, {
                id: 4,
                text: "Titan"
            }, {
                id: 5,
                text: "Triton"
            }],
            correct: 4,
            feedback: "Though the names seem similar, Triton orbits the planet Neptune."
        }, {
            question: "Saturn is visible from Earth without a telescope",
            answers: [{
                id: 0,
                text: "True"
            }, {
                id: 1,
                text: "False"
            }],
            correct: 0
        }]



    });
