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

"""
Function to handle serial events
"""


def serialReadEvent(dev):
    isEvent = "False"
    if dev.in_waiting == 7:
        isEvent = "isEvent"
        # print(dev.in_waiting)
    elif dev.in_waiting > 7:
        isEvent = "isData"
    return isEvent


"""
Function to decode data and convert to JSON structure
"""


def decomposeData(data):
    # decode data into string
    decodeData = data[0:len(data)-2].decode("utf-8")
    # Split data in a list
    dataList = decodeData.split(';')
    # print(dataList)

    # decompose the data
    place = dataList[0]
    monitor = int(dataList[1])
    typeDat = dataList[2]
    temp_env = float(dataList[3])
    mois_env = float(dataList[4])
    noise_env = float(dataList[5])
    distance = [float(item) for item in dataList[6][1:-1].split(',')]
    nPerson = int(float(dataList[7]))

    mongoObj = {
        "place": place,
        "monitor": monitor,
        "typeDat": typeDat,
        "temp_env": temp_env,
        "mois_env": mois_env,
        "noise_env": noise_env,
        "distance": distance,
        "nPerson": nPerson,
    }

    return mongoObj


def main():
    # load environment variables
    load_dotenv()

    SERIAL_PORT = os.getenv('SERIAL_PORT')  # Serial port address
    APPLICATION_URL = os.getenv('APPLICATION_URL')  # URL to POST

    sampleTime = 300  # 20 seconds

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
                mongoObj = decomposeData(data)
                print(mongoObj)

                # method to insert document into database
                result = requests.post(APPLICATION_URL, json=mongoObj)
                print(result.text)

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
