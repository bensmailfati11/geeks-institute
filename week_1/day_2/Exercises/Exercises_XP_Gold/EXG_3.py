# Exercise 3: Sum

def sequence_sum(x: int) -> int:
    return int(str(x)) + int(str(x) * 2) + int(str(x) * 3) + int(str(x) * 4)

# Example
print(sequence_sum(3))  # 3702
print(sequence_sum(5))  # 6170
