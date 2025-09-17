# Données du quiz
data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"}
]


def run_quiz(data):
    correct = 0
    wrong = 0
    wrong_answers = []

    print("Welcome to the Star Wars Quiz!\n")

    for item in data:
        user_answer = input(item["question"] + " ")
        if user_answer.strip().lower() == item["answer"].lower():
            print("Correct!\n")
            correct += 1
        else:
            print("Wrong!\n")
            wrong += 1
            wrong_answers.append({
                "question": item["question"],
                "your_answer": user_answer,
                "correct_answer": item["answer"]
            })

    return correct, wrong, wrong_answers


def show_results(correct, wrong, wrong_answers):
    print("\n------ RESULTS ------")
    print(f"Correct answers: {correct}")
    print(f"Wrong answers: {wrong}")

    # Bonus: afficher les questions ratées
    if wrong > 0:
        print("\nHere are the questions you missed:")
        for item in wrong_answers:
            print(f"- Q: {item['question']}")
            print(f"  Your answer: {item['your_answer']}")
            print(f"  Correct answer: {item['correct_answer']}\n")

    # Message en fonction du score
    if correct == len(data):
        print("Perfect score! You are a true Jedi Master!")
    elif correct >= len(data) // 2:
        print("Good job! You have strong knowledge in the Force.")
    else:
        print("You might want to rewatch the saga...")

    # Rejouer si trop de fautes
    if wrong > 3:
        play_again = input("You got more than 3 wrong... Do you want to try again? (yes/no) ")
        if play_again.lower() == "yes":
            correct, wrong, wrong_answers = run_quiz(data)
            show_results(correct, wrong, wrong_answers)


# Lancer le quiz
if __name__ == "__main__":
    correct, wrong, wrong_answers = run_quiz(data)
    show_results(correct, wrong, wrong_answers)
