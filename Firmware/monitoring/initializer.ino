/************************************************************
 * File: initializer.ino                                    *
 * Author: Fabian Castano                                   *
 * Project: Home Monitoring System                          *
 * Version: 1.0.0                                           *
 * Organization: University of Antioquia                    *
 ************************************************************/

/* ********************************************************************
 * **** INCLUDES
 * ********************************************************************/
#include "initializer.h"

/* ********************************************************************
 * **** DEFINES
 * ********************************************************************/

/* ********************************************************************
 * **** EXTERN VARIABLES
 * ********************************************************************/
// Variables to acquire the parameters of the greenhouse
extern String place;
extern String monitor;
extern String typeSample;
extern String temp_env;
extern String mois_env;
extern String noise_env;
extern String distance;
extern String people_count;

// String to send data to the Raspberry
extern String RaspberryChain;

/* ********************************************************************
 * **** LOCAL VARIABLES
 * ********************************************************************/

/* ********************************************************************
 * **** PROTOTYPES
 * ********************************************************************/

/* ********************************************************************
 * **** FUNCTIONS
 * ********************************************************************/
// function to initialize text variables
void init_TextPayload(void)
{

    // Initialization of Strings variables
    place = String(PLACE);
    monitor = String(SYSTEM);
    typeSample = String("");
    temp_env = String("");
    mois_env = String("");
    noise_env = String("");
    distance = String("");
    people_count = String("");

    RaspberryChain.reserve(512);
    RaspberryChain = String("");
}
