
import type { WirelessGuide } from "./types";

export const wirelessGuide: WirelessGuide = {
  gettingStarted: {
    requirements: [
      "Active Micro SIM card",
      "SMS and calling services enabled",
      "5V / 1A mobile charger",
    ],
    preparation: [
      "Keep the Ace-5 device ready.",
      "Ensure the SIM card is active.",
    ],
  },

  steps: [
    {
      id: "insert-sim",
      number: 1,
      title: "Insert SIM & Connect Antennas",
      description: "Prepare the device for network connectivity.",
      instructions: [
        "Insert the Micro SIM card into the SIM slot.",
        "Connect the GSM antenna to the SIM-card side.",
        "Connect the RF antenna to the other antenna port.",
        "Ensure both antennas are securely attached.",
      ],
      image: "/images/installation/wireless/step-01.png",
    },
    {
      id: "power-on",
      number: 2,
      title: "Power ON the Device",
      description: "Switch on the Ace-5 and check the LED indicators.",
      instructions: [
        "Press the power button on the back of the device.",
        "Wait until the Power LED changes from Orange to Green blinking.",
        "Confirm that the GSM LED blinks once every 3 seconds.",
      ],
      tip: "This usually takes 30–60 seconds.",
      image: "/images/installation/wireless/step-02.png",
    },
    {
      id: "register-mobile",
      number: 3,
      title: "Register Your Mobile Number",
      description: "Register the mobile number that should receive alerts.",
      instructions: [
        "Save the device SIM number as SequrePlus.",
        "Send the registration SMS from your mobile.",
      ],
      command: "S1,9876543210,11111",
      image: "/images/installation/wireless/step-03.png",
    },
    {
      id: "registration-confirmation",
      number: 4,
      title: "Wait for Confirmation",
      description: "Verify successful mobile number registration.",
      instructions: [
        "Listen for a single beep indicating message received.",
        "Listen for a double beep indicating reply sent.",
        "Confirm the registration SMS.",
      ],
      command: "Successfully registered as User 1",
    },
    {
      id: "pair-sensors",
      number: 5,
      title: "Pair Sensors & Remote",
      description: "Connect wireless sensors and remote controls.",
      instructions: [
        "Send ADD,Z1 to pair the first sensor.",
        "Trigger the sensor once.",
        "Wait for a double beep.",
        "Send ADD,R1 to pair the remote.",
        "Press any button on the remote.",
        "Confirm the double beep.",
      ],
      commands: [
        "ADD,Z1",
        "ADD,Z2",
        "ADD,Z3",
        "ADD,Z4",
        "ADD,R1",
      ],
      image: "/images/installation/wireless/step-05.png",
    },
    {
      id: "test-alarm",
      number: 6,
      title: "Test the Alarm",
      description: "Verify that the complete security system works.",
      instructions: [
        "Activate the system using the remote.",
        "Alternatively, use the supported SMS or call activation method.",
        "Open a paired door sensor.",
        "Confirm that the siren sounds.",
        "Verify receipt of phone call and SMS alerts.",
        "Answer the call and press 1 to stop the alarm.",
      ],
      image: "/images/installation/wireless/step-06.png",
    },
  ],

  deviceManagement: [
    {
      id: "remove-sensor",
      title: "Remove a Wireless Sensor",
      description: "Replace Z1 with the sensor zone you want to remove.",
      commands: [
        {
          label: "Remove Sensor 1",
          command: "DEL,Z1",
        },
        {
          label: "Remove Sensor 2",
          command: "DEL,Z2",
        },
        {
          label: "Remove Sensor 3",
          command: "DEL,Z3",
        },
      ],
    },
    {
      id: "remove-remote",
      title: "Remove a Remote",
      description: "Delete the selected paired remote.",
      commands: [
        {
          label: "Remove Remote 1",
          command: "DEL,R1",
        },
      ],
    },
    {
      id: "remove-user",
      title: "Remove a Registered User",
      description: "Send the relevant command from the registered mobile number.",
      commands: [
        {
          label: "Delete User 1",
          command: "S1,DEL,11111",
        },
        {
          label: "Delete User 2",
          command: "S2,DEL,11111",
        },
        {
          label: "Delete User 3",
          command: "S3,DEL,11111",
        },
      ],
    },
  ],

  sensorPlacement: [
    {
      title: "Motion Sensor Mounting",
      points: [
        "Mount at 6–8 feet (1.8–2.4 m) above the floor.",
        "Keep the area in front of the sensor unobstructed.",
        "Mount parallel to the wall without tilting.",
      ],
      image: "/images/installation/wireless/sensor-placement.png",
    },
  ],

  maintenance: [
    {
      title: "Battery Maintenance",
      points: [
        "Check wireless sensor batteries every 6–8 months.",
        "Replace weak batteries immediately.",
      ],
    },
    {
      title: "Regular System Check",
      points: [
        "Test the siren, sensors and remote controls regularly.",
        "Verify SMS alerts and alarm calls are working.",
      ],
    },
    {
      title: "Power Adapter Requirement",
      points: [
        "Use only a 5V / 1A power adapter.",
      ],
    },
    {
      title: "Device Placement",
      points: [
        "Keep the device in a dry, well-ventilated location.",
        "Avoid water, excessive heat and direct sunlight.",
      ],
    },
  ],

  faqs: [],

  media: [],
};
