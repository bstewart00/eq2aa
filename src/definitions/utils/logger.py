import datetime

class ConsoleLogger(object):
    def log(self, message):
        timestamp = str(datetime.datetime.now())
        print(timestamp + ':' + message)