/************************************************************
 * File: dataSample.ino                                     *
 * Author: Fabian Castano                                   *
 * Project: Greenhouse-prj                                  *
 * Version: 1.0.0                                           *
 * Organization: University of Antioquia                    *
 ************************************************************/

/* ********************************************************************
 * **** INCLUDES
 * ********************************************************************/
#include "dataSample.h"

/* ********************************************************************
 * **** DEFINES
 * ********************************************************************/
#define NOISE_SENSOR A0

/* ********************************************************************
 * **** EXTERN VARIABLES
 * ********************************************************************/
// Variables to storage locally the information
extern float temp_env_val;
extern float mois_env_val;
extern float noise_env_val;
extern float temp_dist_val;
extern float distance_val;
extern float people_count_val;

extern unsigned int contPerson;

extern DHT dht;

extern OneWire oneWire; // 1-Wire bus
extern DallasTemperature sensors;

/* ********************************************************************
 * **** LOCAL VARIABLES
 * ********************************************************************/

/* ********************************************************************
 * **** PROTOTYPES
 * ********************************************************************/

/* ********************************************************************
 * **** FUNCTIONS
 * ********************************************************************/
float noiseSample()
{
    static float vec_noise = 0;
    float res;

    for (int i = 0; i < 20; i++)
    {
        vec_noise += analogRead(NOISE_SENSOR);
    }
    vec_noise /= 20;

    return vec_noise;
}

float distanceSample()
{
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);

    const unsigned long duration = pulseIn(ECHO_PIN, HIGH);
    float distance = duration / 29 / 2;

    return distance;
}

void dataRandGenerator(void)
{

    sensors.requestTemperatures(); // Prepara el sensor para la lectura temperatura tierra
    // Create real and random data
    temp_env_val = dht.readTemperature(); // Air temperature
    mois_env_val = dht.readHumidity();    // Air humidity
    noise_env_val = noiseSample();
    temp_dist_val = sensors.getTempCByIndex(0); // Soil temperature
    distance_val = distanceSample();            // random(2000, 3500) / 100.0;
    people_count_val = contPerson;
}
