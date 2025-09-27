import math

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("You must provide either radius or diameter")

    @property
    def diameter(self):
        return self.radius * 2

    @diameter.setter
    def diameter(self, value):
        self.radius = value / 2

    def area(self):
        return math.pi * self.radius ** 2

    # dunder method for string representation
    def __str__(self):
        return f"Circle(radius={self.radius:.2f}, diameter={self.diameter:.2f}, area={self.area():.2f})"

    # dunder method for adding two circles
    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        return NotImplemented

    # dunder methods for comparisons
    def __eq__(self, other):
        return self.radius == other.radius

    def __lt__(self, other):
        return self.radius < other.radius

    def __le__(self, other):
        return self.radius <= other.radius

    def __gt__(self, other):
        return self.radius > other.radius

    def __ge__(self, other):
        return self.radius >= other.radius


# Example usage
if __name__ == "__main__":
    c1 = Circle(radius=5)
    c2 = Circle(diameter=14)
    c3 = c1 + c2

    print(c1)  # Circle(radius=5.00, diameter=10.00, area=78.54)
    print(c2)  # Circle(radius=7.00, diameter=14.00, area=153.94)
    print(c3)  # Circle(radius=12.00, diameter=24.00, area=452.39)

    # Comparisons
    print(c1 > c2)  # False
    print(c1 == Circle(radius=5))  # True

    # Sorting circles
    circle_list = [c3, c1, c2]
    circle_list.sort()
    print([str(c) for c in circle_list])
