from datetime import datetime

# --- Ask user for birthdate ---
birthdate_str = input("Enter your birthdate (DD/MM/YYYY): ")
birthdate = datetime.strptime(birthdate_str, "%d/%m/%Y")

# --- Calculate age ---
today = datetime.today()
age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))

# --- Determine number of candles (last digit of age) ---
candles = age % 10
if candles == 0:  # si dernier chiffre est 0, pas de bougie, on peut en mettre 10
    candles = 10

# --- Build the cake with candles ---
cake = f"""
       ___{"i" * candles}___
      |:H:a:p:p:y:|
    __|___________|__
   |^^^^^^^^^^^^^^^^^|
   |:B:i:r:t:h:d:a:y:|
   |                 |
   ~~~~~~~~~~~~~~~~~~~
"""

print(cake)

