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
#define LED_NMOV 9   // Led not movement
#define LED_SMOV 8   // Led signal movement

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

// flag to take a sample
int contSample = 0;
int contLed = 0;
volatile uint8_t flagSample = false;

// flags to count person
volatile uint8_t statePerson = false;
unsigned int contPerson = 0;

bool LED_STATE = true;

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
    pinMode(LED_NMOV, OUTPUT);
    pinMode(LED_SMOV, OUTPUT);
    pinMode(PIR_SENSOR, INPUT);
}

// loop function
// @param: void
// @return: void
void loop()
{

    if (digitalRead(PIR_SENSOR) == HIGH)
    {
        digitalWrite(LED_NMOV, LOW);
        digitalWrite(LED_SMOV, HIGH);
    }
    else
    {
        digitalWrite(LED_NMOV, HIGH);
        digitalWrite(LED_SMOV, LOW);
    }

    // Person count
    if (statePerson == 0 && digitalRead(PIR_SENSOR) == HIGH)
    {
        statePerson = 1;
        contPerson++;

        Serial.print("Personas = ");
        Serial.println(contPerson);
    }
    else if (digitalRead(PIR_SENSOR) == LOW)
    {
        statePerson = 0;
    }
}

/* ********************************************************************
 * **** INTERRUPTIONS
 * ********************************************************************/
ISR(TIMER1_COMPA_vect)
{ // timer1 interrupt 1Hz toggles pin 13 (LED)
  // generates pulse wave of frequency 1Hz/2 = 0.5kHz (takes two cycles for full wave- toggle high then toggle low)

    contSample++;
    contLed++;

    // activate sample
    if (contSample == SAMPLE_PERIOD) // 180 sec
    {
        contSample = 0;
        flagSample = true;
    }

    // toggle led
    if (contLed == LED_PERIOD)
    {
        contLed = 0;
        LED_STATE = !LED_STATE; // invert Led State
        digitalWrite(LED_BUILTIN, LED_STATE);
    }
}
