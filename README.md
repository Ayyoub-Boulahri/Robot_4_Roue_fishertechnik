
# Robot 4 Wheel Fishertechnik  
A four-wheel robot built using the Fischertechnik construction system, designed to explore robotics fundamentals including motor control, sensors, and embedded programming.

## Table of Contents  
1. [Overview](#overview)  
2. [Features](#features)  
3. [Hardware & Components](#hardware-components)  
4. [Software & Tools Used](#software-tools-used)  
5. [Assembly & Wiring](#assembly-wiring)  
6. [Installation & Programming](#installation-programming)  
7. [Usage & Demo](#usage-demo)  
8. [Project Structure](#project-structure)  
9. [Contribution](#contribution)  
10. [License](#license)  
11. [Contact](#contact)  

## Overview  
This project showcases a four-wheel mobile robot constructed with the Fischertechnik system. It is intended to demonstrate and practice key robotics concepts such as differential drive control, sensor integration (e.g., ultrasonic, line-following), PID/LQR control strategies, and programmable logic using microcontrollers or single-board computers.

## Features  
- Four-wheel drive (4WD) chassis built from Fischertechnik components.  
- Adjustable speed and direction control.  
- Sensor modules for environment awareness (distance sensors, line sensors, optionally encoders).  
- Basic autonomy: obstacle detection/avoidance, line following, manual control via wireless interface.  
- Modular software structure for easy extension (e.g., adding Bluetooth, camera, additional sensors).  
- Educational focus: ideal for demonstrating control algorithms, kinematics, and system integration.

## Hardware & Components  
- Fischertechnik chassis kit (4-wheel version).  
- DC motors with gearboxes.  
- Motor driver board (compatible with chosen controller).  
- Microcontroller or SBC (e.g., Arduino, Raspberry Pi).  
- Speed/position sensors (optional).  
- Ultrasonic sensor(s) or IR distance sensor(s).  
- Line-following sensor array (optional).  
- Power supply (battery pack) and voltage regulation.  
- Wires, connectors, and brackets for mounting.

## Software & Tools Used  
- Programming language: [indicate: C/C++, Python, etc.]  
- Embedded development environment (e.g., Arduino IDE, PlatformIO, etc.).  
- Version control: Git & GitHub.  
- Build tools or scripts (Makefile, CMake, etc.).  
- (Optional) Simulation or visualization tools.  
- Control algorithm tools: e.g., PID or LQR controller (preferred for this project).

## Assembly & Wiring  
1. Assemble the chassis from Fischertechnik parts according to your kit instructions.  
2. Mount motors and wheels.  
3. Connect the motor driver board to motors and microcontroller.  
4. Wire sensors to the controller (distance sensor, line sensors, encoders if used).  
5. Connect power supply and ensure voltage levels are correct.  
6. Adjust mounting, balance, and calibration as needed.

## Installation & Programming  
1. Clone the repository:  
   ```bash  
   git clone https://github.com/AyoubPro44/Robot_4_Roue_fishertechnik.git  
   cd Robot_4_Roue_fishertechnik  
   ```  
2. Install dependencies (if any).  
3. Open the firmware code in your development IDE.  
4. Adjust configuration constants (pins, sensor calibration, motor parameters).  
5. Upload code to the microcontroller.  
6. Test the basic movement, then enable sensors and autonomy features.

## Usage & Demo  
- Place the robot on a flat surface.  
- Use manual control mode to verify basic drive (forward/backward, turning).  
- Enable sensor-based mode for line following or obstacle avoidance.  
- Observe and fine-tune control parameters (e.g., PID gains or LQR weights).  
- (Optional) Record demo video and document performance (speed, accuracy, repeatability).

## Project Structure  
```
/Robot_4_Roue_fishertechnik  
│  
├─ /hardware/           # CAD files, wiring diagrams, parts list  
├─ /firmware/           # source code for microcontroller/SBC  
├─ /docs/               # documentation: assembly guide, calibration notes  
├─ /tests/              # test scripts or logs  
├─ README.md  
└─ LICENSE  
```  
*(Adjust according to actual structure.)*

## Contribution  
Contributions are welcome!  
1. Fork this repository.  
2. Create a branch `feature/my-new-robot-mode`.  
3. Make your modifications (`git commit -m "Add …"`).  
4. Push to your branch (`git push`).  
5. Open a Pull Request.  
Please clearly explain your changes and include any relevant tests or demo files.

## License  
This project is licensed under the [MIT License](LICENSE) – see the `LICENSE` file for more details.

## Contact  
For any questions, suggestions, or bugs:  
Souad Ait Bellauali (also known as **SHINIGAMI**)  
GitHub: [https://github.com/AyoubPro44](https://github.com/AyoubPro44)  
Email: ayyoubboulahri@gmail.com  
