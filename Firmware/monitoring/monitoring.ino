/* *****************************************************************
 * Title: Home Monitoring System                                   *
 * Author: Fabian Castano                                          *
 * Institution: University of Antioquia                            *
 * Version: 1.0.0                                                  *
 * Date: 5 July 2022                                               *
 * *****************************************************************/

/* ********************************************************************
 * **** INCLUDES
 * ********************************************************************/
#include <Arduino.h>

#include "initializer.h"
#include "timer.h"

/* ********************************************************************
 * **** DEFINES
 * ********************************************************************/
#define PIR_SENSOR 5 // Movement sensor

/* ********************************************************************
 * **** VARIABLES
 * ********************************************************************/
// Variables to acquire the parameters of the greenhouse
String place;
String monitor;
String temp_env;
String mois_env;
String noise_env;
String temp_dist;
String distance;
String people_count;

// String to send data to the Raspberry
String RaspberryChain;

/* ********************************************************************
 * **** PROTOTYPES
 * ********************************************************************/

/* ********************************************************************
 * **** FUNCTIONS
 * ********************************************************************/

// Setup function
// @param: void
// @return: void
void setup()
{

    Serial.begin(115200);

    init_Timer();
    init_TextPayload();

    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(PIR_SENSOR, INPUT);
}

// loop function
// @param: void
// @return: void
void loop()
{

    if (digitalRead(PIR_SENSOR) == HIGH)
    {
        digitalWrite(LED_BUILTIN, HIGH);
    }
    else
    {
        digitalWrite(LED_BUILTIN, LOW);
    }
}

/* ********************************************************************
 * **** INTERRUPTIONS
 * ********************************************************************/
ISR(TIMER1_COMPA_vect)
{ // timer1 interrupt 1Hz toggles pin 13 (LED)
  // generates pulse wave of frequency 1Hz/2 = 0.5kHz (takes two cycles for full wave- toggle high then toggle low)
}
