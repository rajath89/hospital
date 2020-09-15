import time

def add(n,m):
    return n+m


def background_task(n):

    """ Function that returns len(n) and simulates a delay """

    delay = 2

    print("Task running")
    print(f"Simulating a {delay} second delay")

    time.sleep(delay)

    #print(len(n))
    print("Task complete")

    return str(int(n)-1)