

def harmonic_summation(n):
    total = 0
    # range goes from 0 to n
    # the 0 will cause a 1/0 error
    for i in range(1, n):
        total += 1 / i
    return total
