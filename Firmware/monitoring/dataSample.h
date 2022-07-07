/************************************************************
 * File: dataSample.h                                       *
 * Author: Fabian Castano                                   *
 * Project: Greenhouse-prj                                  *
 * Version: 1.0.0                                           *
 * Organization: University of Antioquia                    *
 ************************************************************/

#ifndef DATASAMPLE_H
#define DATASAMPLE_H

/* ********************************************************************
 * **** INCLUDES
 * ********************************************************************/
#include <Arduino.h>

#include "initializer.h"

// Reading of air temperature and humidity
#include <DHT.h>
#include <stdio.h>

// Reading soil temperature
#include <OneWire.h>           // incluir  1-Wire y Dallas Temperature
#include <DallasTemperature.h> //  que son librerías

/* ********************************************************************
 * **** DEFINES
 * ********************************************************************/

/* ********************************************************************
 * **** GLOBAL VARIABLES
 * ********************************************************************/

/* ********************************************************************
 * **** LOCAL VARIABLES
 * ********************************************************************/

/* ********************************************************************
 * **** PROTOTYPES
 * ********************************************************************/
void dataRandGenerator(void);

/* ********************************************************************
 * **** FUNCTIONS
 * ********************************************************************/

#endif /* DATASAMPLE_H */