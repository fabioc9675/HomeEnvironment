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
#include "dataSample.h"

// Reading of air temperature and humidity
#include <DHT.h>
#include <stdio.h>

// Reading soil temperature
#include <OneWire.h>           // incluir  1-Wire y Dallas Temperature
#include <DallasTemperature.h> //  que son librerías

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
String typeSample; // cand be EVENT or SAMPLE
String temp_env;
String mois_env;
String noise_env;
String distance;
String people_count;

// variables to register data
float temp_env_val;
float mois_env_val;
float noise_env_val;
float temp_dist_val;
float distance_val;
float people_count_val;

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
DHT dht(DHTPIN, DHT11);

OneWire oneWire(ONE_WIRE_BUS); // 1-Wire bus
DallasTemperature sensors(&oneWire);

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

    dht.begin();
    sensors.begin();

    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(LED_NMOV, OUTPUT);
    pinMode(LED_SMOV, OUTPUT);
    pinMode(PIR_SENSOR, INPUT);

    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
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

        // compose the data
        dataRandGenerator();

        Serial.println("event");
    }
    else if (digitalRead(PIR_SENSOR) == LOW)
    {
        statePerson = 0;
    }

    if (flagSample == true)
    {
        flagSample = false;

        // generate data random to test communication
        dataRandGenerator();
    }
}

/* ********************************************************************
 * **** INTERRUPTIONS
 * ********************************************************************/

// serialEvent function
// @param: void
// @return: void
void serialEvent(void)
{
    while (Serial.available())
    {
        // String dataIn = Serial.readStringUntil(';');
        char commandRx = (char)Serial.read();

        switch (commandRx)
        {
        case READ_SAMPLE_CMD:
            /* code */

            // compose the data

            temp_env = String(temp_env_val, 1);
            mois_env = String(mois_env_val, 1);
            typeSample = String(T_SAMPLE);
            noise_env = String(noise_env_val, 1);
            distance = '[' + String(distance_val, 1) + ',' + String(temp_dist_val, 1) + ']';
            people_count = String(people_count_val, 1);

            RaspberryChain = place + ';' + monitor + ';' + typeSample + ';' +
                             temp_env + ';' + mois_env + ';' + noise_env + ';' +
                             distance + ';' + people_count + "\r\n";

            Serial.print(RaspberryChain);

            contPerson = 0;

            break;

        case READ_EVENT_CMD:
            /* code */

            // compose the data
            temp_env = String(temp_env_val, 1);
            mois_env = String(mois_env_val, 1);
            typeSample = String(T_EVENT);
            noise_env = String(noise_env_val, 1);
            distance = '[' + String(distance_val, 1) + ',' + String(temp_dist_val, 1) + ']';
            people_count = "1.0";

            RaspberryChain = place + ';' + monitor + ';' + typeSample + ';' +
                             temp_env + ';' + mois_env + ';' + noise_env + ';' +
                             distance + ';' + people_count + "\r\n";

            Serial.print(RaspberryChain);

            break;

        case ALIVE_CMD:
            /* code */

            Serial.println("Alive");

            break;

        default:
            break;
        }
    }
}

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
