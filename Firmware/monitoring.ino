/* *****************************************************************
 * Title: Home Monitoring System                                   *
 * Author: Fabian Castano                                          *
 * Institution: University of Antioquia                            *
 * Date: 5 July 2022                                               *
 * *****************************************************************/

#define PIR_SENSOR 5 // Movement sensor

void setup()
{

    pinMode(LED_BUILTIN, OUTPUT);
    pinMode(PIR_SENSOR, INPUT);
}

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
