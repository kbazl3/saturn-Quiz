angular.module('saturnQuiz')
    .controller('mainCtrl', function($scope, $http, $sce) {

        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswer = 0;
        $scope.percentage = 0;

        $http.get('/../quiz_data.json').then(function(quizData) {
            $scope.myQuestions = quizData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
        });

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


    });
