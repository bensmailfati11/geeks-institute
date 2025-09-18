class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics

    def sing_me_a_song(self):
        # on affiche chaque élément de la liste sur une nouvelle ligne
        for line in self.lyrics:
            print(line)


# Création de l'objet avec une liste de paroles
stairway = Song([
    "There’s a lady who's sure",
    "all that glitters is gold",
    "and she’s buying a stairway to heaven"
])

# Appel de la méthode
stairway.sing_me_a_song()
