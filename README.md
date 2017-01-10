# Zuuljs
Zuuljs is an IoT access delegation manager written to work with Particle devices. Zuul allows makers to give conditional access to their IoT devices via keys, as well as allowing makers to supply a platform to users of their devices to delegate access themselves.

Zuuljs was made to solve the initial problem of how to give access to the devices I make using the particle. In this sense it is for Makers to deploy and non-makers to use. As a Maker you create your device, add it to zuul, and make conditional keys for your friends. As a user you login and have access to devices someone has made.

Below are instructions for both Users and Makers.

## Users
#### Login
![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/login.png "Login Screen")
In order to use zuul you will need to create an account. To get started click the link for “Signup” down at the bottom of the login box.

![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/signup.png "Login Screen")
![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/register.png "Login Screen")
Upon your first sign on, you will be greeted with this box, instructing you to put in a key. This would have come from your friend or family member, and will either start with a “D” or a “K”. 

If you are looking to add your own device to zuul, you can select the “Maker” tab to then enter your Particle Token. Further instructions for Makers below.

### Access Keys vs Ownership Keys
If your key starts with a “K” this means your key is includes provisional access to the device. These are called “Access Keys” and they have strict terms of use. These terms may include:
-	Specific activation and expiration dates
-	Time of day restrictions
-	Access frequency restrictions 

The terms of your key are set by the owner or maker of the device.

Alternatively, if your key starts with a “D” you will become the owner of the device, and this will allow you to make your own Access Keys for your device.

#### Access Keys
![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/main-key.png "Login Screen")
After logging in with an Access Key you will see the devices available to you. In the future you can always register new keys with zuul, including ownership keys, by selecting the Register Key button.

Currently we can see that the status of the device is ON by looking at the green online icon to the left of the device name. We can also access the device by selecting the Access Button.

![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/access.png "Login Screen") ![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/locked.jpg "Login Screen") ![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/expired.png "Login Screen")
There may be a time when you are outside the bounds of your key’s terms **(Locked)** or your key has **Expired**. You will see these statuses when you first log in. When your key is Locked, selecting the button will tell you when you can expect to access the device again.

![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/viewkey.png "Login Screen")
When you open you key you will see all the information you have access to about the device. You can see the it’s current status, the relevant terms for your key, and the functions available to you.

![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/functiontypes.png "Login Screen")
Functions can be thought of as “Things you can do with your device”. There are currently four different types of functions in zuul. 

##### Toggle Functions
A Toggle Function is for actions that mimic a switch by toggling back and fourth between two values. Toggles could be used for light switches, door locks, or open and close something. Toggles can also show the current state of the function (if configured by the device Maker).

##### Invocation Functions
Invocations are for setting actions in motion. They might activate a procedure, process, or run a test.

##### Numeric Functions
Numeric functions are given numbers to perform some action and 

##### String Functions
Strings are able to receive full words.

That’s it for your Access Key, easy as that! Know that it is possible for the device Owner or Maker to extend your key terms or even add more functions.

#### Ownership Keys
![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/main-device.png "Login Screen")
After adding an Ownership Key, you will see your device in the Manage Devices box. Similar to when you have an Access Key, you can see it’s current status in green next to the device name. Below that you also have a button to register further keys. Click the Access button to view your device.

![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/view-device.png "Login Screen")
Inside your device you have access to more of the device’s configurations than an Access Key. This includes a log of recently used functions for your device.

The big difference here is that you have access to the “Manage Keys” section near the bottom. To create a new key for someone else, select the Create Key button below Manage Keys.

#### Creating New Keys
![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/newkey.png "Login Screen")
Creating a key involves selecting the relevant information for how you’d like the key to be accessed. These can be modified later. The only two required fields are Key Timezone and which functions you’d like the key to have access to.

##### Key Timezone
This is the timezone in which all date and time restrictions for this key will be based.

##### Key Activation Date
When the key will become active

##### Key Expiration Date
When the key will expire

##### Select Functions
Select a combination of functions available to the key receipient. 

##### Access Frequency
Select how many times Per Day/Per Week/Per Month/Per Year functions can be activated by the key

##### Access Times
Restrict the key to time of day restrictions. If a start or end time is added without the other, the default will be midnight.

Create the key and a new key token will be generated. This key can be given to friends and family to access the device.
![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/newkeytoken.png "Login Screen")

## Makers
![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/registermaker.png "Login Screen")
On first logon, you will be able to associate your Particle Token with zuul. This will give you access to adding your devices and functions/variables you have programmed onto your board.

If you don’t know your Particle Token visit https://build.particle.io/ and go to the settings pane located on the left.

![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/emptynewdevice.png "Login Screen")
After adding your Particle Token zuul is a blank slate, ready to have devices added. To add a new device, select the Add Device button.

#### Adding New Devices
![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/newdevice.png "Login Screen")
Zuul will pull your available devices from your Particle Token. Here you can select the device, give it a name for zuul, and a brief description of the device. Selecting Create will generate an Ownership Token. Read the above description to gain an understanding of the unique permissions an Ownership Token.

![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/newdevicetoken.png "Login Screen")
This Ownership Token can be given to another person and will allow them to generate their own keys for the device. 

![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/viewnewdevice.png "Login Screen")
After adding a device, the next step is to configure functions and variables. Functions can only be added by Makers. Click Create Function to add a new function.

#### Adding New Functions
![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/newfunction.png "Login Screen")
Each function has three main components: The associated particle Function, Function Type, and Variable Assignment. There are four types of functions currently in zuul, they are as follows:

##### Toggle Functions
A Toggle Function is for actions that mimic a switch by toggling back and fourth between two values. Toggles could be used for light switches, door locks, or open and close something. Toggles can also show the current state of the function (if configured by the device Maker).

##### Invocation Functions
Invocations are for setting actions in motion. They might activate a procedure, process, or run a test.

##### Numeric Functions
Numeric functions are given numbers to perform some action and 

##### String Functions
Strings are able to receive full words.

As for Variable Assignments, these can be coupled with a function to give user read feedback on specific variables. This will be expanded in the future, and variables will likely become their own section of a device on par with function with regards to mix and match key access.

After you have created a function or two your device is ready to be shared!
![alt text](https://raw.githubusercontent.com/tywalch/zuuljs/master/public/img/help/viewdevicemaker.png "Login Screen")

## Next Steps
Next things to be added to a zuul include a simple REST API, an expansion into "Variables" along side Functions for sensor reads, and the addition Sequences which include the ability to chain and give accesss to mutiple functions without the need to give access to an individual function directly. Lastly, as the API takes shape zuul will allow for devices outside of the particle platform to connect, update, and log data. Log displays are in a very simple state at the momement, though with time I foresee additions of graphs, dyanamic table logs, and other visualizations for sensor data and function controls.

## More About The Project
My Name is Tyler W. Walch and I put zuul together after wanting to build a shed lock for a friend and decided much of what I was building could be generalized into a simple delegation platform for any IoT device. I used it as an opportunity to learn a few new technologies and as with every person project, I am proud of 90% happy with it and I am not quite sure who wrote the other 10%.

For more information checkout my project site: http://tinkertamper.com