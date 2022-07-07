/************************************************************
 * File: initializer.h                                      *
 * Author: Fabian Castano                                   *
 * Project: Home Monitoring System                          *
 * Version: 1.0.0                                           *
 * Organization: University of Antioquia                    *
 ************************************************************/

#ifndef INITIALIZER_H
#define INITIALIZER_H

/* ********************************************************************
 * **** INCLUDES
 * ********************************************************************/
#include <Arduino.h>

/* ********************************************************************
 * **** DEFINES
 * ********************************************************************/
#define PLACE "FABIAN"
#define SYSTEM 1
#define T_SAMPLE "SAMPLE"
#define T_EVENT "EVENT"

// Commands
#define READ_SAMPLE_CMD 's'
#define READ_EVENT_CMD 'e'
#define ALIVE_CMD 'a'

// data sample constant
#define TIME_TO_SEC 1        // need to count until 10 to rise a second
#define SECONDS_TO_SAMPLE 18 // seconds to obtain a sample 180
#define SECONDS_TO_LED 1     // seconds to toogle led
#define SAMPLE_PERIOD (TIME_TO_SEC * SECONDS_TO_SAMPLE)
#define LED_PERIOD (TIME_TO_SEC * SECONDS_TO_LED)

#define DHTPIN 4
#define ONE_WIRE_BUS 2 // Use el pin # 2 para el bus

#define TRIG_PIN 13
#define ECHO_PIN 12

/* ********************************************************************
 * **** GLOBAL VARIABLES
 * ********************************************************************/

/* ********************************************************************
 * **** LOCAL VARIABLES
 * ********************************************************************/

/* ********************************************************************
 * **** PROTOTYPES
 * ********************************************************************/
// function to initialize text variables
void init_TextPayload(void);

/* ********************************************************************
 * **** FUNCTIONS
 * ********************************************************************/

#endif /* INITIALIZER_H */