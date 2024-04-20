import unittest
from harmonic_summation import harmonic_summation


class TestHarmonicSummation(unittest.TestCase):
    def test_harmonic_summation_basic(self):
        self.assertEqual(harmonic_summation(1), 1, "Should be 1 for n=1")

    def test_harmonic_summation_zero(self):
        self.assertEqual(harmonic_summation(0), 0, "Should be 0 for n=0")

    def test_harmonic_summation_negative(self):
        self.assertRaises(ValueError, harmonic_summation, -1, "Should raise ValueError for negative input")

if __name__ == '__main__':
    unittest.main()