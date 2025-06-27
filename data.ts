import { BookOpen, Radio, Zap, Award, LifeBuoy, FileText } from 'lucide-react';

// --- TYPE DEFINITIONS ---
export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

export interface Topic {
  title: string;
  content: string;
  quiz?: QuizQuestion[];
  elicensingGuide?: boolean;
}

export interface Module {
  title: string;
  icon: React.ElementType;
  topics: { [key: string]: Topic };
}

export interface FrequencyBand {
    band: string;
    freq: string;
    power: string;
    status: 'Primary' | 'Secondary';
    maritime: boolean;
    notes: string;
}

export const learningModules: { [key: string]: Module } = {
  'regulatory': {
    title: 'Regulatory Framework',
    icon: FileText,
    topics: {
      'amateur-service': {
        title: 'Amateur Service Definition',
        content: `**ITU Definition**: "A radiocommunication service for the purpose of self-training, intercommunication and technical investigations carried out by amateurs... solely with a personal aim and without pecuniary interest."\n\n**Key Principles:**\n- Non-commercial hobby only\n- Personal aim, no monetary gain\n- Self-training and technical investigation\n- Emergency communications permitted\n- Can only communicate with other licensed amateurs (except emergencies)\n\n**ComReg Role:**\n- Issues licences under Wireless Telegraphy Act 1926\n- Manages spectrum allocation\n- Enforces regulations\n- Coordinates with international bodies`,
        quiz: [
          { q: "Amateur radio communications must be for:", options: ["Commercial purposes", "Personal aim without pecuniary interest", "Business use", "Government communications"], correct: 1 },
          { q: "During normal operation, you can communicate with:", options: ["Anyone", "Only other amateur licensees", "Commercial stations", "Government agencies"], correct: 1 }
        ]
      },
      'licence-types': {
        title: 'Licence Types & Requirements',
        content: `**CEPT Class 1 Licence:**\n- Requires HAREC + Morse code (5 wpm minimum)\n- Call-sign format: EI/EJ + digit + alphanumeric + letter\n- Example: EI2CC\n\n**CEPT Class 2 Licence:**\n- Requires HAREC only (no Morse)\n- Call-sign format: EI/EJ + digit + alphanumeric + alphanumeric + B\n- Example: EI2CAB\n\n**Other Licence Types:**\n- **Club Licence**: For amateur radio clubs\n- **Visitor Temporary**: For foreign amateurs (max 12 months)\n- **Special Event**: Temporary call-signs for events\n- **Automatic Station**: Repeaters, beacons, etc.\n\n**Fees:**\n- Standard licence: €100\n- Reduced fee (65+, disability): €30\n- Amendments: €30\n- Temporary licences: €30`,
        quiz: [
          { q: "CEPT Class 1 requires:", options: ["HAREC only", "HAREC + Morse code", "Morse code only", "No examination"], correct: 1 },
          { q: "A CEPT Class 2 call-sign always ends with:", options: ["Any letter", "The letter B", "A number", "Two letters"], correct: 1 }
        ]
      },
      'call-signs': {
        title: 'Call-sign Allocation System',
        content: `**Irish Prefixes:**\n- **EI**: Mainland Ireland\n- **EJ**: Irish islands\n\n**Call-sign Patterns:**\n\n**Individual Licences:**\n- CEPT Class 1: EI/EJ + [2-9] + [0-9,A-Z] + [A-Z]\n- CEPT Class 2: EI/EJ + [2-9] + [0-9,A-Z] + [0-9,A-Z] + B\n\n**Special Formats:**\n- **Visitor**: EI/EJ + [2-9] + V + [0-9,A-Z] + [A-Z]\n- **Club**: EI + [0-9] + up to 4 characters ending in letter\n- **Special Event**: EI/EJ + [0-9] + up to 5 characters ending in letter\n\n**Rules:**\n- Sequential assignment (no choice for individual licences)\n- Lifetime duration (except temporary)\n- "Silent key" transfer possible to immediate family\n- No re-issue of lapsed call-signs`,
        quiz: [
          { q: "EJ call-signs are used for:", options: ["All of Ireland", "Mainland Ireland", "Irish islands", "Northern Ireland"], correct: 2 },
          { q: "Can you choose your own call-sign for a CEPT Class 1 licence?", options: ["Yes, any available call-sign", "No, assigned sequentially", "Yes, from a list", "Only for special events"], correct: 1 }
        ]
      }
    }
  },
  'elicensing': {
    title: 'eLicensing Guide',
    icon: Award,
    topics: {
      'comreg-guide': {
        title: 'ComReg eLicensing Process',
        content: 'An interactive, step-by-step guide to using the ComReg online eLicensing system for obtaining or managing an Amateur Station Licence.',
        elicensingGuide: true,
      }
    }
  },
  'technical': {
    title: 'Technical Knowledge',
    icon: Zap,
    topics: {
      'frequency-bands': {
        title: 'Frequency Bands & Power Limits',
        content: `Understanding the permitted frequency bands, power limits, and allocation status is critical for legal operation. Irish regulations are set by ComReg and align with international IARU Region 1 band plans.\n\n**Allocation Status:**\n- **Primary**: Amateur service has priority. You are protected from interference by secondary users.\n- **Secondary**: Amateur service must not cause interference to, and cannot claim protection from, primary service users.\n\n**Power Limits:**\n- **P.E.P. (Peak Envelope Power)**: The standard power measurement, taken at the transmitter or amplifier output.\n- **e.i.r.p. (effective isotropic radiated power)**: Used for some bands (like 60m), it accounts for antenna gain and system losses. Formula: e.i.r.p. (dBW) = P.E.P. (dBW) + Antenna Gain (dBi) - System Losses (dB).`,
        quiz: [
            { q: "What is the maximum power on the 80m band (3.5-3.8 MHz)?", options: ["100W", "400W (26 dBW)", "1000W", "10W"], correct: 1 },
            { q: "On a secondary allocation, what must an amateur station do if a primary service starts transmitting?", options: ["Increase power to overcome them", "Cease transmitting to avoid interference", "Inform them they are on an amateur band", "Switch to a different mode"], correct: 1 },
            { q: "The 60m band power limit is specified in:", options: ["P.E.P.", "e.i.r.p.", "Average Power", "Watts only"], correct: 1 },
        ]
      },
      'antennas': {
        title: 'Antenna Theory & Practice',
        content: `**Half-Wave Antenna Characteristics:**\n- An antenna cut to be resonant on its fundamental frequency (e.g., a 20m long dipole for the 40m band).\n- Can also be used on its harmonics.\n\n**Harmonic Operation:**\n- **Odd harmonics (3rd, 5th, etc.)**: The antenna presents a reasonably low, resistive impedance at the feedpoint, making it easier to match. For example, a 40m dipole (7 MHz) works well on 15m (21 MHz, the 3rd harmonic).\n- **Even harmonics (2nd, 4th, etc.)**: The feedpoint impedance is extremely high, making it very difficult to match with standard equipment. An alternative feedpoint or a specialized matching unit is required. For example, a 40m dipole is very difficult to use on 20m (14 MHz, the 2nd harmonic).\n\n**SWR Meter Placement:**\n- An SWR meter is used to measure the impedance match between the transmitter and the antenna system.\n- For equipment protection, it should be placed **immediately after the transmitter or amplifier**, and **before** any antenna tuning unit (ATU) or low-pass filters.\n- This ensures it is measuring the load that the final amplifier stage 'sees'.`,
        quiz: [
          { q: "A half-wave dipole for the 40m band (7 MHz) will also be easy to use on which other band?", options: ["80m (3.5 MHz)", "20m (14 MHz)", "15m (21 MHz)", "10m (28 MHz)"], correct: 2 },
          { q: "For protecting your transmitter, where is the best place for an SWR meter?", options: ["At the antenna feedpoint", "After the ATU", "Immediately after the power amplifier", "Anywhere in the coaxial line"], correct: 2 }
        ]
      },
    }
  },
  'operational': {
    title: 'Operational Procedures',
    icon: Radio,
    topics: {
      'logging': {
        title: 'Logbook Requirements',
        content: `Keeping an accurate and up-to-date logbook is a condition of the amateur radio licence.\n\n**Mandatory Logbook Information:**\n- **Date** of transmission\n- **Time** in UTC (Coordinated Universal Time)\n- **Frequency band** used\n- **Mode** of transmission (e.g., SSB, CW, FT8)\n- **Power level** (in Watts or dBW)\n- **Call-sign** of the station contacted\n\n**Additional Rules:**\n- Any changes to frequency, mode, or power during a contact should be noted.\n- The logbook must be available for inspection by a ComReg officer.\n- For maritime mobile (/MM) operation, the geographical position must also be logged.`,
        quiz: [
          { q: "All logbook times must be recorded in:", options: ["Local Irish Time", "UTC", "EST", "The other station's local time"], correct: 1 },
          { q: "Which of these is NOT a mandatory logbook entry for a standard contact?", options: ["Power level", "Name of the other operator", "Frequency band", "Call-sign contacted"], correct: 1 }
        ]
      },
      'mobile-operation': {
        title: 'Mobile & Maritime Operation',
        content: `**Land Mobile (/M):**\n- Suffix your call-sign with **/M** (e.g., EI1XYZ/M).\n- Announce location at the start, end, and at least every 30 minutes.\n- Maximum power is typically 50W (17 dBW), with some exceptions.\n- Prohibited in estuaries, docks, harbours, or near airports.\n\n**Maritime Mobile (/MM):**\n- Suffix your call-sign with **/MM** (e.g., EI1XYZ/MM).\n- Applies to **all** Irish waters, including rivers and lakes, not just the sea.\n- Announce **geographical position** at the start, end, and every 30 minutes.\n- Maximum power is restricted to 10W (10 dBW).\n- You must have the permission of the ship's master to operate.\n- Cannot be used to pass messages that would normally be sent by the vessel's own radio service.`,
        quiz: [
          { q: "Operating from a boat on the River Shannon requires which suffix?", options: ["/P", "/M", "/MM", "No suffix needed"], correct: 2 },
          { q: "What is the maximum power for Maritime Mobile operation?", options: ["400W", "100W", "50W", "10W"], correct: 3 }
        ]
      },
    }
  },
  'safety': {
    title: 'Safety',
    icon: LifeBuoy,
    topics: {
      'electrical-safety': {
        title: 'Electrical Safety',
        content: `**Mains Power:**\n- Your station must comply with current Irish electrical regulations.\n- Use a double-pole main switch for all station equipment.\n- A Residual Current Device (RCD) is essential for protection against electric shock.\n\n**Equipment Safety:**\n- All equipment must be properly earthed (grounded).\n- Never operate equipment with covers removed.\n- High-voltage supplies, especially in valve amplifiers, are lethal. Always use a 'shorting stick' to discharge capacitors before working on them.\n- Keep one hand in your pocket when working on live circuits to prevent current from crossing your chest.`,
        quiz: [
            { q: "What device provides the best protection against fatal electric shock?", options: ["A fuse", "A circuit breaker", "An RCD", "A surge protector"], correct: 2 }
        ]
      },
      'rf-exposure': {
        title: 'RF Exposure (ICNIRP)',
        content: `It is a licence condition to ensure that non-ionising radiation from your station is within the limits specified by ICNIRP (International Commission for Non-Ionizing Radiation Protection).\n\n**Key Concepts:**\n- **Exposure vs. Emission**: You must control human exposure to RF fields, not just the emissions from the antenna.\n- **Near Field vs. Far Field**: RF fields behave differently close to the antenna (near field) than they do far away. The near field is more complex and potentially more hazardous.\n- **Assessment**: You are responsible for assessing your station to ensure compliance. This can be done through calculation, online tools (like the RSGB's), or measurement.\n\n**Practical Steps:**\n- Site antennas as high and as far away from people as practical.\n- Be aware of the intense fields near high-gain antennas (like Yagis) or physically small but efficient antennas (like magnetic loops).\n- Control access to areas where exposure limits might be exceeded, such as the base of a vertical antenna or the area directly in front of a beam.\n- Use the minimum power necessary for communication.`,
        quiz: [
            { q: "Compliance is based on guidelines from which organisation?", options: ["IRTS", "ComReg", "ITU", "ICNIRP"], correct: 3 }
        ]
      }
    }
  }
};

export const frequencyBands = {
    hf_primary: [
      { band: "160m", freq: "1.810-1.850 MHz", power: "400W (26 dBW)", status: 'Primary' as const, maritime: true, notes: "" },
      { band: "160m", freq: "1.850-2.000 MHz", power: "10W (10 dBW)", status: 'Primary' as const, maritime: false, notes: "Land mobile also 10W" },
      { band: "80m", freq: "3.500-3.800 MHz", power: "400W (26 dBW)", status: 'Primary' as const, maritime: true, notes: "" },
      { band: "40m", freq: "7.000-7.200 MHz", power: "400W (26 dBW)", status: 'Primary' as const, maritime: true, notes: "" },
      { band: "20m", freq: "14.000-14.350 MHz", power: "400W (26 dBW)", status: 'Primary' as const, maritime: true, notes: "" },
      { band: "17m", freq: "18.068-18.168 MHz", power: "400W (26 dBW)", status: 'Primary' as const, maritime: true, notes: "No contests" },
      { band: "15m", freq: "21.000-21.450 MHz", power: "400W (26 dBW)", status: 'Primary' as const, maritime: true, notes: "" },
      { band: "12m", freq: "24.890-24.990 MHz", power: "400W (26 dBW)", status: 'Primary' as const, maritime: true, notes: "No contests" },
      { band: "10m", freq: "28.000-29.700 MHz", power: "400W (26 dBW)", status: 'Primary' as const, maritime: true, notes: "" }
    ],
    hf_secondary: [
      { band: "2200m", freq: "135.7-137.8 kHz", power: "1W e.i.r.p.", status: 'Secondary' as const, maritime: false, notes: "" },
      { band: "630m", freq: "472-479 kHz", power: "5W e.i.r.p.", status: 'Secondary' as const, maritime: false, notes: "No interference to maritime/aero" },
      { band: "60m", freq: "5.3515-5.3665 MHz", power: "15W e.i.r.p.", status: 'Secondary' as const, maritime: false, notes: "No contests. Plus spot frequencies." },
      { band: "30m", freq: "10.100-10.150 MHz", power: "400W (26 dBW)", status: 'Secondary' as const, maritime: false, notes: "No contests. CW/Digi only." }
    ],
    vhf_uhf: [
      { band: "6m", freq: "50-52 MHz", power: "100W (20 dBW)", status: 'Secondary' as const, maritime: false, notes: "" },
      { band: "4m", freq: "70.125-70.450 MHz", power: "50W / 25W Mobile", status: 'Secondary' as const, maritime: false, notes: "" },
      { band: "2m", freq: "144-146 MHz", power: "400W (26 dBW)", status: 'Primary' as const, maritime: true, notes: "" },
      { band: "70cm", freq: "430-440 MHz", power: "400W (26 dBW)", status: 'Primary' as const, maritime: false, notes: "Lower power 430-432 MHz segment" }
    ],
};
