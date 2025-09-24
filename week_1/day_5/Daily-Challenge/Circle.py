import math

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self._radius = radius
            self._diameter = radius * 2
        elif diameter is not None:
            self._diameter = diameter
            self._radius = diameter / 2
        else:
            raise ValueError("You must specify either radius or diameter")

    @property
    def radius(self):
        return self._radius

    @property
    def diameter(self):
        return self._diameter

    @property
    def area(self):
        return math.pi * (self._radius ** 2)

    def __repr__(self):
        return f"Circle(radius={self._radius}, diameter={self._diameter}, area={self.area:.2f})"

    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self._radius + other._radius)
        return NotImplemented

    def __eq__(self, other):
        if isinstance(other, Circle):
            return self._radius == other._radius
        return NotImplemented

    def __lt__(self, other):
        if isinstance(other, Circle):
            return self._radius < other._radius
        return NotImplemented

c1 = Circle(radius=5)
c2 = Circle(diameter=20)

print(c1)   # Circle(radius=5, diameter=10, area=78.54)
print(c2)   # Circle(radius=10, diameter=20, area=314.16)

# Addition
c3 = c1 + c2
print(c3)   # Circle(radius=15, diameter=30, area=706.86)

# Comparaison
print(c1 == c2)  # False
print(c1 < c2)   # True

# Tri d'une liste
circles = [c2, c1, c3]
sorted_circles = sorted(circles)
print(sorted_circles)

