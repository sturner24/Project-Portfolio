/* Portfolio projects.
 * Each project needs a title; everything else is optional.
 *   date:        "YYYY-MM" or "YYYY" (used for sorting, newest first)
 *   summary:     one line shown on the card
 *   description: full write-up; leave a blank line between paragraphs,
 *                and start a paragraph with "## " to make it a heading
 *   tags:        shown on the card and used as filters
 *   images:      paths inside the images/ folder; the first one is the cover
 *   cover:       how many of the first images to show side by side at the top (default 1)
 */
const PROJECTS = [
  {
    title: "Front Wheel Hub - Aztec Baja SAE",
    date: "2026",
    summary: "A front hub redesign for SDSU's Baja SAE car: 35% lighter, with a factor of safety of about 1.9.",
    description: [
      "Designed by Samuel Turner, San Diego State University.",

      "## Abstract",
      "The front hub is a critical component of the Baja SAE front suspension system because it connects the wheel and brake rotor to the upright through the bearings. It carries vertical wheel loads, cornering forces, and braking torque from the rotor. Because the hub is located within the unsprung portion of the suspension, its mass has a significant effect on vehicle performance. Reducing unsprung mass allows the suspension to respond more quickly to changes in terrain and helps the tire maintain contact with the ground, while also lowering rotational inertia. This can improve traction, ride quality, acceleration, braking, and handling.",

      "## Introduction",
      "This project focuses on redesigning the front hub to reduce weight while maintaining the strength and durability required for Baja SAE competition. The current front hub is manufactured from 6061 aluminum and has a bulky geometry that contributes unnecessary unsprung mass. Reducing unsprung weight can improve suspension response, tire contact, acceleration, braking, and overall vehicle handling. In addition to its weight, the previous hub experienced fatigue failure after approximately two years of service. The redesigned hub will focus on optimizing the geometry and reducing weight where possible. The final design will be analyzed and tested to evaluate its weight, structural performance, and fatigue life compared to the existing hub.",

      "## Current Design",
      "The current front hub is machined from 6061-T6 aluminum and weighs 1.017 lbs. The wheel bolts to it with 4 bolts and the rotor bolts to it with 4 bolts on the backside where there is a wide extrusion. Our car is two wheel drive, so the front hub doesn't carry any drive torque. The only torque going through it is braking torque from the rotor to the wheel. The hub spins on bearings that sit in the upright, so the shaft that goes into the upright takes all of the wheel loads into the bearing.",

      "## Engineering Principles",
      "Some engineering principles that govern this problem are unsprung and rotating mass, stress and strain, material selection, fatigue, and thermal expansion. Every time the wheel hits a bump, the mass of the hub has to be accelerated up and down by the tire and suspension. Less unsprung mass lets the wheel follow the rough terrain at Baja competitions better, which improves traction. The hub also spins with the wheel, so lowering its mass lowers rotational inertia and helps with acceleration and braking. Sharp corners, holes, and shoulders cause stress concentrations that cut down fatigue life a lot, so fillets and smooth transitions are important to implement into the design.",

      "## Load Cases and Wear Surfaces",
      "The load cases the hub will see are side loading (cornering or getting hit from the side), front loading (hitting something head on like a log or a rock), vertical loads from bumps and landing jumps, and brake torque from the rotor. The main wear surfaces are the shaft that goes into the upright and the surfaces where the lug nuts and wheel clamp onto the hub, which see fatigue every revolution.",

      "## Hard Constraints",
      "The hub has to match our wheel bolt pattern and wheel offset, the rotor bolt pattern, and the bearing size and spacing in the upright. It also has to fit inside the wheel without hitting the rim, rotor, or caliper. Baja SAE rules require the brakes to be able to lock all four wheels, so the hub has to be able to take full locking brake torque. The rules also require the suspension and brake bolts to meet the fastener grade requirements and have a positive locking method.",

      "## Target",
      "The main target for this new front hub was to make it significantly lighter while also maintaining its strength. This target was definitely hit as the weight of the new design is about 35% lighter, dropping from 1.017 lbs to 0.664 lbs. The factor of safety also maintained around 1.9, which proves that the hub is still able to withstand the harsh forces that act on it. To make this happen, the geometry of the hub had to be changed significantly and we had to transition from 6061-T6 aluminum to 7075-T6. To check if we hit our target, we would constantly run FEA and check mass properties to see if we were dropping weight while still maintaining strength.",

      "## Choosing a Material",
      "Since we are making the hub out of aluminum, we had to decide between 6061-T6 and 7075-T6. 7075-T6 has a yield strength of about 503 MPa compared to about 276 MPa for 6061-T6, and a fatigue strength of about 159 MPa compared to about 97 MPa.",
      "With the same exact design, just choosing different materials, the hub with 6061 aluminum weighs 0.637 lbs and the one with 7075 weighs 0.664 lbs. I ran FEA using both materials and the stress in the part pretty much stays the same between the two, because in a linear FEA study the stress comes from the shape of the part and the loads, not the material. The high stress spots, like on the arms of the hub, showed up with both materials. What changed was the factor of safety. With 7075, the same stress gave a factor of safety about 1.9, but with 6061 it was only about 1.0. This is due to the yield strength of 7075 being that much higher, and that extra margin is what let me take more material off and make the hub lighter. The weight difference between the two is really small, so we felt that the much higher strength was worth that little bit of extra weight.",

      "## Manufacturing and Cost",
      "7075 costs more per pound than 6061, but for a part this small the extra material cost is small compared to the machining cost. While the judges at Baja competitions judge the cost to build the car, we felt that the strength of 7075 was definitely worth that little bit of extra money.",

      "## Analysis Loads",
      "When running FEA, I used a total value of 3000 lbf·in of torque on the brake rotors to simulate the brake force. To simulate vertical loading, I used a force, facing downward, of 2700 N that acted on the bolt holes where the hub mounts to the wheel. Similarly with the frontal loading, I used a value of 2200 N that faced toward the hub from the front.",

      "## Setting up FEA",
      "I ran a static study in SolidWorks Simulation with 7075-T6 as the material. To represent the wheel, I made a disk that bolts to the hub and fixed it at its outer edge. I put the brake torque on the rotor bolt extrusions and the wheel loads on the shaft that goes into the upright. The wheel bolts were modeled with bolt connectors with preload. At first SolidWorks gave me a warning that contact wasn't defined for the bolt connectors, because by default it bonds all touching faces together, which means the bolts don't actually clamp anything. To fix this I added a local interaction set to Contact between the wheel disk and the faces of the hub arms. That way the bolts clamp the parts together and the faces can separate under load like they would in real life. I made the outer edge of the shaft that slides into the upright a bearing support and the face that is up against the upright a roller/slider. I also experimented with mesh controls to get a finer mesh in order to maximize the accuracy of the simulation.",

      "## Results and What I Changed",
      "In my original design, the radius of the arc between each of the four arms was 1.75 inches. After experimenting with numerous different radii, I found that the value with the highest factor of safety is 1.10 inches. With the 1.75 inch radius, there was also a stress concentration where the straight part of the arm meets the radius. Not only did the arc with radius of 1.10 inches yield a higher factor of safety, but it also dropped the weight of the hub from 0.712 lbs to 0.664 lbs.",
      "Another thing that I changed was the support around the brake rotor hole extrusions. Originally, I simply just had a fillet surrounding it, and in the FEA there was a stress concentration that formed behind the hole. While it wasn't big, it was a concern for fatigue down the line. So to improve upon this, I decided to put an extrusion behind the hole, where the stress concentration was originally, and in doing this, it broke up the stress concentration and allowed the factor of safety to increase in that area. Since the weight only increased 0.001 lbs, from 0.663 lbs to 0.664 lbs, I felt that this was definitely a better design option.",

      "## References",
      "1. P. Nehete, \"Design and Analysis of Wheel Hub of Baja ATV in Ansys,\" International Research Journal of Engineering and Technology (IRJET), Vol. 9, Issue 8, Aug. 2022. https://www.irjet.net/archives/V9/i8/IRJET-V9I8313.pdf\n" +
        "2. Hub design reference, Scribd document 4-RI-17-1-P19-11. https://www.scribd.com/document/732873728/4-RI-17-1-P19-11\n" +
        "3. K. Lee, \"6061 vs 7075 Aluminum Comparison: Which Alloy is Best for Your Project?,\" TZR Metal, May 12, 2025. https://tzrmetal.com/6061-vs-7075/\n" +
        "4. SAE International, Baja SAE Rules.",
    ].join("\n\n"),
    images: ["images/front-wheel-hub-1.png", "images/front-wheel-hub-fos.png"],
    cover: 2,
  },
];
