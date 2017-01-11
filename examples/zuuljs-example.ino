/**********************************************
 * Zuul IoT Delegation Manager - ZUULJS.COM
 * Example Code
 * 
 * Tyler W. Walch 
 * TINKERTAMPER.COM [2017]
***********************************************/ 

/* CONFIGURE SHARED VARIABLES.
 * Shared light status variable allows for all functions to react 
 * intuitively when invoked.
**/
int lightStatus = 0;
int led = D7;

int bRate = 1000;
int bNumber = 0;

void setup() {
    pinMode(led,OUTPUT); 
    digitalWrite(led,lightStatus);
    
    // Shared light status variable for invokeOn, invokeOff, and toggleLight.
    Particle.variable("lightStatus", &lightStatus, INT);
    
    // Zuul toggle function to be used with lightStatus a variable
    Particle.function("toggleLight",toggleLight);
    // Zuul invocation function
    Particle.function("invokeOn",invokeOn);
    // Zuul invocation function
    Particle.function("invokeOff",invokeOff);
    // Zuul numeric function
    Particle.function("blink",ledBlink);
}

void loop() {
    blinkLoop();
    delay(20);
}
/* TOGGLE FUNCTIONS
 * Zuul toggle functions are invoked with an empty string parameter, and expect
 * a 1 or 0 response. A value of 1 is expressed with a green listener element,
 * and a value of 0 expresses with a red listener element in the Zuul UI.
**/
int toggleLight(String command) {
    lightStatus = !lightStatus;
    digitalWrite(led, lightStatus);
    return lightStatus;
}

/* INVOCATION FUNCTIONS
 * Zuul invocation functions are also invoked with an empty string parameter.
 * This can be very useful over a toggle when you want to ensure the final 
 * state of your device. If an Invocation shares functionality with a toggle function
 * it is recommended to share a common state variable to prevent a confusing UX.
**/ 
int invokeOn(String command) {
    lightStatus = 1;
    digitalWrite(led, lightStatus);
    return lightStatus;
}
int invokeOff(String command) {
    lightStatus = 0;
    digitalWrite(led, lightStatus);
    return lightStatus;
}

/** NUMERIC/STRING FUNCTIONS
 * Both numeric and functions receive a String with a user definied number/string. 
 * For numeric zuul functions It will be necessary to convert the String to an int. 
 * Zuul does not restrict the number sent to the device, it is advised perform some 
 * validation on the number's size to prevent abuse. 
**/
int ledBlink(String number) {
    int receivedNumber = number.toInt();
    if  (receivedNumber > 0 && receivedNumber < 10) {
        bNumber = receivedNumber;
        return bNumber;
    } 
    else {
        return 0;
    }
}

/** LONG BLOCKING CODE
 * Setting up blinkLoop separately from the exposed particle function ledBlink allows me 
 * to send Zuul success feedback immediately before starting a timed blocking process.  
 * This pattern could be used any large process, and could be coupled with the Publish
 * method to give status feedback as the device works through it's routine. Zuul will be
 * adding publish support in the future.
**/
void blinkLoop() {
    String blinkStatus = "";
    while (bRate > 0 && bNumber > 0) {
        for (int i = 0; i < bNumber; i++) {
            digitalWrite(D7, HIGH);
            blinkStatus = "ON";
            Particle.publish("Blink Status", blinkStatus, PRIVATE);
            delay(bRate);
            digitalWrite(D7, LOW);
            blinkStatus = "OFF";
            Particle.publish("Blink Status", blinkStatus, PRIVATE);
            delay(bRate);
        }
        bNumber = 0;
    }
}
