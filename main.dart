import "dart:math";
import "dart:io";

Random rando = Random();

void main() {
  int score = 0;

  void playRound() {
    // play one round of times-table game

//generate the two random numbers
    int num1 = rando.nextInt(13);
    int num2 = rando.nextInt(13);

// return user answer for question multiplying the two nums
    double question(num1, num2) {
      double playerAns;
      print('What is ${num1} x ${num2}?');
      playerAns = double.parse(stdin.readLineSync());
      return playerAns;
    }

    int answer = num1 * num2;

    var q1 = question(num1, num2);
    if (q1 == answer) {
      print('Correct');
      score++;
    } else {
      print('Wrong');
    }
  } // end of round

  for (int i = 0; i < 10; i++) {
    playRound();
  }

  print('Score:${score}/10');
}
