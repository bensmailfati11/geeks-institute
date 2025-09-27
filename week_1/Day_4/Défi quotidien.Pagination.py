import math

class Pagination:
    def __init__(self, items=None, page_size=10):
        # Initialize items and page size
        self.items = items if items is not None else []
        self.page_size = page_size
        self.current_idx = 0  # 0-based page index
        # Calculate total pages
        self.total_pages = math.ceil(len(self.items) / self.page_size) if self.items else 1

    def get_visible_items(self):
        """Return items visible on the current page."""
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    # Navigation methods
    def go_to_page(self, page_num):
        """Go to the specified page number (1-based)."""
        if 1 <= page_num <= self.total_pages:
            self.current_idx = page_num - 1
        else:
            raise ValueError(f"Page number {page_num} is out of range (1-{self.total_pages})")
        return self  # allow chaining

    def first_page(self):
        self.current_idx = 0
        return self

    def last_page(self):
        self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    def __str__(self):
        """Return items on the current page as a string (one per line)."""
        return "\n".join(self.get_visible_items())


# ===============================
# Test Cases
# ===============================

alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)

print(p.get_visible_items())
# ['a', 'b', 'c', 'd']

p.next_page()
print(p.get_visible_items())
# ['e', 'f', 'g', 'h']

p.last_page()
print(p.get_visible_items())
# ['y', 'z']

p.go_to_page(7)
print(p.current_idx + 1)
# 7

try:
    p.go_to_page(0)  # Should raise ValueError
except ValueError as e:
    print(e)  # Page number 0 is out of range (1-7)

# Example of printing current page items using __str__()
p.first_page()
print(str(p))
# Output:
# a
# b
# c
# d
