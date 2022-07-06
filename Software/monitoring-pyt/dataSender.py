#!/usr/bin/python

import threading
import os
from os import error

import sys
import datetime
import serial
import time

from dotenv import load_dotenv  # import dotenv variables
import requests  # Allows to connect with MongoDB

# Function to handle serial events


def serialReadEvent(dev):
    isEvent = "False"
    if dev.in_waiting == 7:
        isEvent = "isEvent"
        # print(dev.in_waiting)
    elif dev.in_waiting > 7:
        isEvent = "isData"
    return isEvent


def main():
    # load environment variables
    load_dotenv()

    SERIAL_PORT = os.getenv('SERIAL_PORT')  # Serial port address

    sampleTime = 20  # 20 seconds

    try:
        # make the connection with the device
        dev = serial.Serial(SERIAL_PORT, 115200, timeout=1)
        dev.close()
        dev.open()
        dev.flushInput()
        dev.flushOutput()

        time.sleep(4)

        while(1):
            isEvent = serialReadEvent(dev)
            if isEvent == "isEvent":
                isEvent = "False"
                data = dev.readline()
                # decode command
                if(data[0:len(data)-2].decode("utf-8") == "event"):
                    dev.write(str.encode('e'))
                # print("isEvent")
                # print(data)
            elif isEvent == "isData":
                isEvent = "False"
                data = dev.readline()
                # print("isData")
                print(data)

            # sample every 20 seconds
            if (sampleTime - time.time() % sampleTime) <= 1:
                dev.write(str.encode('s'))
                time.sleep(1)

    except Exception as error:
        print(error)
        print("Port not found")

    except KeyboardInterrupt:
        print("Program Interrupted")

    finally:
        read = False
        dev.close
        print("Trying again")
        sys.exit(0)


if __name__ == '__main__':

    main()
