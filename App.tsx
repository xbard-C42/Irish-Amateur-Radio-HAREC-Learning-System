
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Radio, Zap, LifeBuoy, FileText, CheckCircle2, Circle, ArrowRight, Target, X, RotateCw } from 'lucide-react';

// Enhanced interfaces
interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

interface Topic {
  title: string;
  content: string;
  quiz?: QuizQuestion[];
}

interface Module {
  title: string;
  icon: React.ElementType;
  topics: { [key: string]: Topic };
}

interface FrequencyBand {
  band: string;
  freq: string;
  power: string;
  status: 'Primary' | 'Secondary';
  maritime: boolean;
  notes: string;
}

// Enhanced data structure with comprehensive Irish amateur radio content
const learningModules: { [key: string]: Module } = {
  'regulatory': {
    title: 'Regulatory Framework',
    icon: FileText,
    topics: {
      'amateur-service': {
        title: 'Amateur Service Definition',
        content: `**ITU Definition**: "A radiocommunication service for the purpose of self-training, intercommunication and technical investigations carried out by amateurs... solely with a personal aim and without pecuniary interest."

**Key Principles:**
- Non-commercial hobby only
- Personal aim, no monetary gain
- Self-training and technical investigation
- Emergency communications permitted
- Can only communicate with other licensed amateurs (except emergencies)

**ComReg Role:**
- Issues licences under Wireless Telegraphy Act 1926
- Manages spectrum allocation
- Enforces regulations
- Coordinates with international bodies

**Permitted Activities:**
- Self-training in radio technique
- Intercommunication between amateurs
- Technical investigations
- Emergency communications when normal systems fail
- Third-party traffic in certain circumstances`,
        quiz: [
          { q: "Amateur radio communications must be for:", options: ["Commercial purposes", "Personal aim without pecuniary interest", "Business use", "Government communications"], correct: 1 },
          { q: "During normal operation, you can communicate with:", options: ["Anyone", "Only other amateur licensees", "Commercial stations", "Government agencies"], correct: 1 },
          { q: "Who issues amateur radio licences in Ireland?", options: ["IRTS", "ComReg", "ITU", "Government"], correct: 1 }
        ]
      },
      'licence-types': {
        title: 'Licence Types & Requirements',
        content: `**CEPT Class 1 Licence:**
- Requires HAREC + Morse code (5 wpm minimum)
- Call-sign format: EI/EJ + digit + alphanumeric + letter
- Example: EI2CC
- Full HF privileges

**CEPT Class 2 Licence:**
- Requires HAREC only (no Morse)
- Call-sign format: EI/EJ + digit + alphanumeric + alphanumeric + B
- Example: EI2CAB
- Same band access as Class 1

**Other Licence Types:**
- **Club Licence**: For amateur radio clubs (EI + digit + up to 4 chars)
- **Visitor Temporary**: For foreign amateurs (max 12 months)
- **Special Event**: Temporary call-signs for events
- **Automatic Station**: Repeaters, beacons, etc.

**Fees (2024):**
- Standard licence: €100
- Reduced fee (65+, disability): €30
- Amendments: €30
- Temporary licences: €30

**Validity:**
- Lifetime duration for individual licences
- Annual renewal for some special licences
- Silent key transfers permitted to immediate family`,
        quiz: [
          { q: "CEPT Class 1 requires:", options: ["HAREC only", "HAREC + Morse code", "Morse code only", "No examination"], correct: 1 },
          { q: "A CEPT Class 2 call-sign always ends with:", options: ["Any letter", "The letter B", "A number", "Two letters"], correct: 1 },
          { q: "Standard licence fee is:", options: ["€30", "€100", "€200", "€50"], correct: 1 }
        ]
      },
      'call-signs': {
        title: 'Call-sign Allocation System',
        content: `**Irish Prefixes:**
- **EI**: Mainland Ireland
- **EJ**: Irish islands and offshore installations

**Call-sign Structure:**

**Individual Licences:**
- CEPT Class 1: EI/EJ + [2-9] + [0-9,A-Z] + [A-Z]
- CEPT Class 2: EI/EJ + [2-9] + [0-9,A-Z] + [0-9,A-Z] + B

**Special Formats:**
- **Visitor**: EI/EJ + [2-9] + V + [0-9,A-Z] + [A-Z]
- **Club**: EI + [0-9] + up to 4 characters ending in letter
- **Special Event**: EI/EJ + [0-9] + up to 5 characters ending in letter

**Assignment Rules:**
- Sequential assignment (no choice for individual licences)
- Lifetime duration (except temporary)
- "Silent key" transfer possible to immediate family
- No re-issue of lapsed call-signs for 5 years

**Mobile/Portable Suffixes:**
- /M = Mobile (land)
- /MM = Maritime Mobile
- /P = Portable
- /A = Aeronautical Mobile (with special authorisation)`,
        quiz: [
          { q: "EJ call-signs are used for:", options: ["All of Ireland", "Mainland Ireland", "Irish islands", "Northern Ireland"], correct: 2 },
          { q: "Can you choose your own call-sign for a CEPT Class 1 licence?", options: ["Yes, any available call-sign", "No, assigned sequentially", "Yes, from a list", "Only for special events"], correct: 1 },
          { q: "Maritime mobile suffix is:", options: ["/M", "/MM", "/P", "/A"], correct: 1 }
        ]
      }
    }
  },
  'technical': {
    title: 'Technical Knowledge',
    icon: Zap,
    topics: {
      'frequency-bands': {
        title: 'Frequency Bands & Power Limits',
        content: `Understanding permitted frequency bands, power limits, and allocation status is critical for legal operation. Irish regulations align with ITU Region 1 band plans.

**Allocation Status:**
- **Primary**: Amateur service has priority and protection from interference
- **Secondary**: Must not cause interference to primary services, no protection from them

**Power Measurement:**
- **P.E.P. (Peak Envelope Power)**: Standard measurement at transmitter output
- **e.i.r.p. (Effective Isotropic Radiated Power)**: Used for some bands
- Formula: e.i.r.p. (dBW) = P.E.P. (dBW) + Antenna Gain (dBi) - System Losses (dB)

**Key Band Information:**
- HF bands generally 400W (26 dBW) P.E.P. for primary allocations
- VHF/UHF varies by specific band and allocation type
- Secondary allocations often have lower power limits
- Maritime mobile: maximum 10W (10 dBW) on permitted bands
- Land mobile: typically 50W (17 dBW) maximum`,
        quiz: [
          { q: "What is the maximum power on the 80m band (3.5-3.8 MHz)?", options: ["100W", "400W (26 dBW)", "1000W", "10W"], correct: 1 },
          { q: "On a secondary allocation, what must an amateur do if causing interference to a primary service?", options: ["Increase power", "Cease transmitting to avoid interference", "Change frequency only", "Continue operating"], correct: 1 },
          { q: "Maritime mobile maximum power is:", options: ["400W", "100W", "50W", "10W"], correct: 3 },
          { q: "How do you calculate e.i.r.p.?", options: ["Power × Gain", "P.E.P. + Antenna Gain - Losses", "Power ÷ Gain", "Power - Losses"], correct: 1 }
        ]
      },
      'antennas': {
        title: 'Antenna Theory & Practice',
        content: `**Fundamental Antenna Principles:**

**Half-Wave Dipole:**
- Resonant antenna cut to λ/2 for operating frequency
- Centre-fed impedance approximately 73Ω
- Can operate on odd harmonics with reasonable matching
- Even harmonics present very high impedance

**Harmonic Operation:**
- **Odd harmonics (3rd, 5th, etc.)**: Easier to match at feedpoint
- **Even harmonics (2nd, 4th, etc.)**: Very high impedance, difficult matching
- Solution: Feed closer to ends or use antenna tuner

**Antenna Gain and Directivity:**
- Isotropic radiator: 0 dBi reference
- Half-wave dipole: 2.15 dBi gain over isotropic
- Yagi antennas: Higher gain but directional
- Ground plane verticals: Omnidirectional

**SWR and Matching:**
- SWR meter measures impedance mismatch
- Place immediately after transmitter/amplifier
- Before any filters or antenna tuners
- Protects final amplifier from high SWR

**Practical Considerations:**
- Antenna height affects radiation pattern
- Ground conductivity affects efficiency
- Feed line losses reduce effective power
- Baluns prevent common-mode currents`,
        quiz: [
          { q: "A half-wave dipole for 40m (7 MHz) will work best on which other band?", options: ["80m (3.5 MHz)", "20m (14 MHz)", "15m (21 MHz)", "10m (28 MHz)"], correct: 2 },
          { q: "For equipment protection, where should an SWR meter be placed?", options: ["At the antenna feedpoint", "After the antenna tuner", "Immediately after the transmitter", "Anywhere in the feed line"], correct: 2 },
          { q: "A half-wave dipole has approximately what impedance?", options: ["50Ω", "73Ω", "300Ω", "600Ω"], correct: 1 }
        ]
      },
      'rf-safety': {
        title: 'RF Exposure & Safety',
        content: `**ICNIRP Guidelines:**
Irish amateur stations must comply with ICNIRP (International Commission on Non-Ionizing Radiation Protection) guidelines for RF exposure.

**Key Concepts:**
- **Specific Absorption Rate (SAR)**: Rate of energy absorption by human tissue
- **Power Density**: RF power per unit area (W/m²)
- **Near Field vs Far Field**: Different exposure calculations apply

**Frequency-Dependent Limits:**
- Different exposure limits for different frequencies
- Lower frequencies: current density limits
- Higher frequencies: SAR and power density limits
- Most restrictive limits in VHF range (30-300 MHz)

**Practical Assessment:**
- Calculate exposure from your station configuration
- Consider antenna type, power level, and distance
- Account for duty cycle (% of time transmitting)
- Use online calculators or measurement

**Control Measures:**
- Maintain safe distances from antennas
- Use minimum power necessary
- Time restrictions in high-exposure areas
- Physical barriers where appropriate
- RF awareness for operators and public

**Common Situations:**
- Hand-held transceivers: close to body
- Mobile installations: inside vehicle
- Base station antennas: nearby buildings
- High-gain antennas: beam concentration`,
        quiz: [
          { q: "ICNIRP stands for:", options: ["International Committee for Non-Ionizing Radiation Protection", "International Commission on Non-Ionizing Radiation Protection", "Irish Committee for RF Protection", "International Council for Radiation Protection"], correct: 1 },
          { q: "The most restrictive RF exposure limits are typically in which band?", options: ["HF", "VHF", "UHF", "Microwave"], correct: 1 },
          { q: "What is the best way to reduce RF exposure?", options: ["Use higher power", "Use minimum necessary power and maintain distance", "Use only HF bands", "Transmit continuously"], correct: 1 }
        ]
      }
    }
  },
  'operational': {
    title: 'Operational Procedures',
    icon: Radio,
    topics: {
      'logging': {
        title: 'Station Records & Logging',
        content: `**Mandatory Station Records:**
All amateur stations must maintain accurate records of transmissions.

**Required Information:**
1. **Date** of each transmission period
2. **Time** (start and end) in UTC
3. **Frequency band** used
4. **Mode** of transmission (SSB, CW, FM, digital modes)
5. **Power level** (P.E.P. in watts or dBW)
6. **Call signs** of stations worked

**Additional Requirements:**
- Record any changes to frequency, mode, or power during operation
- Note geographical position for maritime mobile
- Include third-party traffic details if applicable
- Keep records for inspection by ComReg

**Time Standards:**
- All times must be in UTC (Coordinated Universal Time)
- No local time permitted in official logs
- Ireland: UTC+0 (winter), UTC+1 (summer)

**Record Formats:**
- Paper logbooks acceptable
- Computer logs acceptable
- Must be legible and organised
- Available for inspection at any time

**Retention:**
- Keep logs indefinitely
- Required for licence renewal processes
- Evidence of proper operation`,
        quiz: [
          { q: "All logbook times must be recorded in:", options: ["Local Irish Time", "UTC", "GMT", "Any consistent time zone"], correct: 1 },
          { q: "Which is NOT mandatory in the logbook?", options: ["Power level", "Weather conditions", "Frequency band", "Call-signs contacted"], correct: 1 },
          { q: "Station records must be available for:", options: ["Other amateurs only", "ComReg inspection", "IRTS review", "Public viewing"], correct: 1 }
        ]
      },
      'mobile-operation': {
        title: 'Mobile & Maritime Operation',
        content: `**Land Mobile Operation (/M):**
- Suffix call-sign with "/M" 
- Maximum power typically 50W (17 dBW)
- Announce location at start, end, and every 30 minutes
- Prohibited in estuaries, docks, harbours, near airports
- Must not cause interference to other services

**Maritime Mobile Operation (/MM):**
- Applies to ALL Irish waters (seas, rivers, lakes)
- Suffix call-sign with "/MM"
- Maximum power 10W (10 dBW)
- Announce geographical position every 30 minutes
- Requires ship master's permission
- Limited to permitted maritime bands

**Permitted Maritime Bands:**
- 160m: 1810-1850 kHz
- 80m: 3500-3800 kHz  
- 40m: 7000-7200 kHz
- 20m: 14000-14350 kHz
- 17m: 18068-18168 kHz
- 15m: 21000-21450 kHz
- 12m: 24890-24990 kHz
- 10m: 28000-29700 kHz
- 2m: 144-146 MHz

**Position Reporting:**
- Beginning and end of each contact
- Every 30 minutes during extended operation
- Use standard geographical coordinates
- Include in logbook entries

**Restrictions:**
- Cannot replace ship's commercial radio
- Must not interfere with vessel's radio systems
- Cease operation if interference occurs
- Follow international maritime regulations`,
        quiz: [
          { q: "Maritime mobile operation applies to:", options: ["Only seas around Ireland", "Only international waters", "All Irish waters including rivers and lakes", "Only coastal waters"], correct: 2 },
          { q: "Position must be announced every:", options: ["15 minutes", "30 minutes", "60 minutes", "Only at start and end"], correct: 1 },
          { q: "Maximum power for maritime mobile:", options: ["400W", "100W", "50W", "10W"], correct: 3 },
          { q: "Who must give permission for maritime mobile operation?", options: ["ComReg", "Harbour master", "Ship's master", "Coast guard"], correct: 2 }
        ]
      },
      'emergency-communications': {
        title: 'Emergency Communications',
        content: `**Emergency Communications Authority:**
Amateur radio operators may provide emergency communications when normal systems fail or are inadequate.

**Legal Framework:**
- Specifically permitted under licence conditions
- Override normal amateur-to-amateur restriction during emergencies
- Must not interfere with official emergency services
- Document all emergency traffic properly

**AREN (Amateur Radio Emergency Network):**
- Irish amateur emergency organisation
- Coordinates emergency communications
- Training and preparedness activities
- Works with government agencies
- Regional emergency coordinators

**Emergency Procedures:**
- Monitor emergency frequencies
- Follow emergency coordinator instructions
- Provide message handling when required
- Maintain detailed logs of emergency traffic
- Use appropriate protocols and procedures

**Types of Emergency Traffic:**
- Health and welfare messages
- Emergency service coordination
- Disaster relief communications
- Search and rescue support
- Public safety information

**Preparedness:**
- Maintain emergency power supplies
- Know local emergency frequencies
- Participate in emergency exercises
- Keep emergency contact information current
- Understand message handling procedures

**Limitations:**
- Must not charge for emergency communications
- Cannot replace professional emergency services
- Must yield to official emergency communications
- Follow instructions from emergency authorities`,
        quiz: [
          { q: "During emergencies, amateurs can:", options: ["Only contact other amateurs", "Contact anyone as needed for emergency purposes", "Not operate at all", "Only contact emergency services"], correct: 1 },
          { q: "What does AREN stand for?", options: ["Amateur Radio Emergency Network", "Amateur Radio Emergency Node", "Amateur Radio Emergency Notice", "Amateur Radio Emergency News"], correct: 0 },
          { q: "Can amateurs charge for emergency communications?", options: ["Yes, standard rates", "Yes, but reduced rates", "No, must be free", "Only for equipment costs"], correct: 2 }
        ]
      }
    }
  },
  'safety': {
    title: 'Safety & Technical Standards',
    icon: LifeBuoy,
    topics: {
      'electrical-safety': {
        title: 'Electrical Safety',
        content: `**Mains Power Safety:**
- Comply with current Irish electrical regulations
- Use proper earthing for all equipment
- Install RCD (Residual Current Device) protection
- Use appropriate fuses and circuit breakers
- Double-pole switching for station equipment

**High Voltage Safety:**
- Valve amplifiers contain lethal voltages
- Use shorting stick to discharge capacitors
- Never work on live high-voltage equipment
- Keep one hand in pocket when working on circuits
- Proper interlocks on equipment covers

**Equipment Installation:**
- Proper earthing of all equipment
- Use appropriate gauge wiring
- Avoid overloading circuits
- Good mechanical construction
- Proper ventilation for heat dissipation

**Workshop Safety:**
- Adequate lighting for work areas
- Proper tool storage and maintenance
- Fire extinguisher appropriate for electrical fires
- First aid knowledge and supplies
- Safe soldering practices

**Lightning Protection:**
- Disconnect antennas during storms
- Proper antenna earthing systems
- Surge protection for equipment
- Lightning rods where appropriate
- Insurance considerations

**RF Burns:**
- High RF voltages at antenna feedpoints
- Particular care with mobile whip antennas
- Avoid contact with energised antennas
- Use non-conductive tools near antennas`,
        quiz: [
          { q: "What device provides best protection against electric shock?", options: ["Fuse", "Circuit breaker", "RCD", "Earth connection"], correct: 2 },
          { q: "When working on valve equipment, what should you use to discharge capacitors?", options: ["Screwdriver", "Shorting stick", "Your hand", "Multimeter probe"], correct: 1 },
          { q: "The one-hand rule when working on live circuits prevents:", options: ["Burns", "Current path across chest", "Equipment damage", "Electric shock to hand"], correct: 1 }
        ]
      },
      'technical-standards': {
        title: 'Equipment Standards & Compliance',
        content: `**Equipment Requirements:**
All amateur equipment must meet certain technical standards and operating requirements.

**Construction Standards:**
- Good engineering practice required
- Proper shielding to minimise interference
- Adequate frequency stability
- Spurious emission compliance
- Proper filtering of power supplies

**Frequency Accuracy:**
- Must operate within allocated bands
- Frequency measurement capability required
- Crystal or synthesised frequency control
- Regular calibration checks
- Avoid interference to other services

**Spurious Emissions:**
- Must comply with ITU-R SM.1541 recommendations
- Out-of-band emission limits
- Harmonic suppression required
- Low-pass filters for HF transmitters
- Band-pass filters for VHF/UHF

**Power Measurement:**
- P.E.P. measurement at transmitter output
- SWR monitoring capability mandatory
- Accurate power indication required
- Include transmission line losses
- Proper load for testing

**Interference Prevention:**
- RF feedback prevention
- Proper station earthing
- Good quality coaxial cable
- Avoid rectification in nearby equipment
- Coordinate with neighbours if problems arise

**Home Construction:**
- Must meet safety standards
- Proper mechanical construction
- Adequate heat dissipation
- Professional appearance encouraged
- Documentation of modifications

**Commercial Equipment:**
- Type acceptance not required for amateur use
- Must still meet technical standards
- Modifications must maintain compliance
- Warranty considerations`,
        quiz: [
          { q: "What measurement capability is mandatory?", options: ["Power meter", "SWR meter", "Frequency counter", "Signal generator"], correct: 1 },
          { q: "Spurious emissions must comply with:", options: ["Irish standards only", "ITU-R SM.1541", "CEPT recommendations", "ETSI standards"], correct: 1 },
          { q: "Where must P.E.P. be measured?", options: ["At the antenna", "At the transmitter output", "At the microphone", "In the feed line"], correct: 1 }
        ]
      }
    }
  }
};

const frequencyBands = {
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
  ]
};

// --- UI Components ---

const ModuleOverview: React.FC<{moduleKey: string, module: Module, onTopicSelect: (key: string) => void}> = ({moduleKey, module, onTopicSelect}) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 animate-fade-in">
      <div className="flex items-center space-x-4 mb-6">
        <module.icon className="w-10 h-10 text-blue-500" />
        <div>
          <h2 className="text-2xl font-bold">{module.title}</h2>
          <p className="text-gray-500 dark:text-gray-400">Select a topic to begin your study.</p>
        </div>
      </div>
      <div className="space-y-3">
        {Object.entries(module.topics).map(([topicKey, topic]) => (
          <button 
            key={topicKey} 
            onClick={() => onTopicSelect(`${moduleKey}-${topicKey}`)}
            className="w-full text-left flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-800 dark:text-gray-200">{topic.title}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
);

const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, i) => {
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
            return <h4 key={i} className="font-bold text-lg mt-4 mb-2">{paragraph.slice(2, -2)}</h4>;
        }
        if (paragraph.startsWith('- ')) {
            return (
              <ul key={i} className="list-disc pl-5 my-4 space-y-1">
                {paragraph.split('\n').map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: item.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
              </ul>
            );
        }
        return (
            <p key={i} className="mb-4" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
        );
    });
};

const renderFrequencyTable = (bands: FrequencyBand[], title: string) => {
    return (
      <div className="my-6">
        <h4 className="font-bold text-lg mb-3">{title}</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="border dark:border-gray-600 px-3 py-2 text-left">Band</th>
                <th className="border dark:border-gray-600 px-3 py-2 text-left">Frequency</th>
                <th className="border dark:border-gray-600 px-3 py-2 text-left">Max Power</th>
                <th className="border dark:border-gray-600 px-3 py-2 text-left">Status</th>
                <th className="border dark:border-gray-600 px-3 py-2 text-left">Maritime</th>
                <th className="border dark:border-gray-600 px-3 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {bands.map((band, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="border dark:border-gray-600 px-3 py-2 font-medium">{band.band}</td>
                  <td className="border dark:border-gray-600 px-3 py-2">{band.freq}</td>
                  <td className="border dark:border-gray-600 px-3 py-2">{band.power}</td>
                  <td className="border dark:border-gray-600 px-3 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      band.status === 'Primary' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                    }`}>
                      {band.status}
                    </span>
                  </td>
                  <td className="border dark:border-gray-600 px-3 py-2 text-center">
                    {band.maritime ? '✓' : '✗'}
                  </td>
                  <td className="border dark:border-gray-600 px-3 py-2 text-xs">{band.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};


const TopicContent: React.FC<{ moduleKey: string, topicKey: string, topic: Topic, onComplete: () => void, onStartQuiz: (quizKey: string) => void }> = ({ moduleKey, topicKey, topic, onComplete, onStartQuiz }) => {
    const isFreqTopic = topicKey === 'frequency-bands';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">{topic.title}</h3>
            <div className="prose prose-blue dark:prose-invert max-w-none mb-6">
                {renderContent(topic.content)}
                {isFreqTopic && (
                    <div className="mt-8 not-prose">
                        {renderFrequencyTable(frequencyBands.hf_primary, "HF Bands - Primary Allocation")}
                        {renderFrequencyTable(frequencyBands.hf_secondary, "HF Bands - Secondary Allocation")}
                        {renderFrequencyTable(frequencyBands.vhf_uhf, "VHF/UHF Bands")}
                    </div>
                )}
            </div>
            <div className="border-t dark:border-gray-700 pt-4 flex justify-between items-center">
                 {topic.quiz && (
                    <button
                        onClick={() => onStartQuiz(`${moduleKey}-${topicKey}`)}
                        className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        <Target className="w-4 h-4" />
                        <span>Topic Quiz</span>
                    </button>
                )}
                <button 
                    onClick={onComplete}
                    className="flex items-center space-x-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ml-auto">
                    <span>Mark Complete & Next Topic</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

const QuizView: React.FC<{ quizKey: string, onExit: () => void }> = ({ quizKey, onExit }) => {
    const [moduleKey, topicKey] = quizKey.split('-');
    const topic = learningModules[moduleKey]?.topics[topicKey];
    const questions = topic?.quiz || [];

    const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (qIndex: number, aIndex: number) => {
        if (showResults) return;
        setQuizAnswers(prev => ({ ...prev, [qIndex]: aIndex }));
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    const handleRetry = () => {
        setQuizAnswers({});
        setShowResults(false);
    };

    const getScore = () => {
        return questions.reduce((score, question, index) => {
            return score + (quizAnswers[index] === question.correct ? 1 : 0);
        }, 0);
    };

    if (!topic) return <div>Quiz not found.</div>;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">{topic.title} - Quiz</h3>
                <button onClick={onExit} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-6">
                {questions.map((q, qIndex) => (
                    <div key={qIndex}>
                        <p className="font-semibold mb-3">{qIndex + 1}. {q.q}</p>
                        <div className="space-y-2">
                            {q.options.map((option, oIndex) => {
                                const isSelected = quizAnswers[qIndex] === oIndex;
                                const isCorrect = q.correct === oIndex;
                                let classes = 'p-3 border rounded-lg cursor-pointer transition-colors w-full text-left ';
                                if (showResults) {
                                    if (isCorrect) classes += 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/50 dark:text-green-300';
                                    else if (isSelected && !isCorrect) classes += 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/50 dark:text-red-300';
                                    else classes += 'border-gray-200 dark:border-gray-700';
                                } else {
                                    if (isSelected) classes += 'bg-blue-100 border-blue-500 dark:bg-blue-900/50 dark:border-blue-700';
                                    else classes += 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700';
                                }
                                return (
                                    <button key={oIndex} onClick={() => handleAnswer(qIndex, oIndex)} className={classes}>
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 pt-4 border-t dark:border-gray-700 flex justify-between items-center">
                {showResults ? (
                    <>
                        <div className="text-xl font-bold">Score: {getScore()} / {questions.length}</div>
                        <button onClick={handleRetry} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <RotateCw className="w-4 h-4" />
                            <span>Retry Quiz</span>
                        </button>
                    </>
                ) : (
                    <button onClick={handleSubmit} disabled={Object.keys(quizAnswers).length !== questions.length} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto">
                        <span>Submit Answers</span>
                    </button>
                )}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('overview');
    const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
    const [currentQuiz, setCurrentQuiz] = useState<string | null>(null);

    const handleTopicComplete = (moduleKey: string, topicKey: string) => {
        const newCompleted = new Set(completedTopics);
        newCompleted.add(`${moduleKey}-${topicKey}`);
        setCompletedTopics(newCompleted);
        
        const nextTopic = getNextTopic(moduleKey, topicKey);
        if (nextTopic) {
            setActiveSection(`${nextTopic.moduleKey}-${nextTopic.topicKey}`);
        } else {
            setActiveSection('overview');
        }
    };

    const getNextTopic = (currentModuleKey: string, currentTopicKey: string) => {
        const moduleKeys = Object.keys(learningModules);
        const currentModuleIndex = moduleKeys.indexOf(currentModuleKey);
        
        const topicKeys = Object.keys(learningModules[currentModuleKey].topics);
        const currentTopicIndex = topicKeys.indexOf(currentTopicKey);
        
        if (currentTopicIndex < topicKeys.length - 1) {
            return { moduleKey: currentModuleKey, topicKey: topicKeys[currentTopicIndex + 1] };
        }
        
        if (currentModuleIndex < moduleKeys.length - 1) {
            const nextModuleKey = moduleKeys[currentModuleIndex + 1];
            const nextModuleTopicKeys = Object.keys(learningModules[nextModuleKey].topics);
            if (nextModuleTopicKeys.length > 0) {
                return { moduleKey: nextModuleKey, topicKey: nextModuleTopicKeys[0] };
            }
        }
        return null;
    };

    const calculateOverallProgress = () => {
        const totalTopics = Object.values(learningModules).reduce((sum, module) => sum + Object.keys(module.topics).length, 0);
        if (totalTopics === 0) return 0;
        return Math.round((completedTopics.size / totalTopics) * 100);
    };

    const renderMainContent = () => {
        if (currentQuiz) {
            return <QuizView quizKey={currentQuiz} onExit={() => setCurrentQuiz(null)} />;
        }
        
        if (activeSection.includes('-')) {
            const [moduleKey, topicKey] = activeSection.split('-');
            const topic = learningModules[moduleKey]?.topics?.[topicKey];
            if (topic) return <TopicContent moduleKey={moduleKey} topicKey={topicKey} topic={topic} onComplete={() => handleTopicComplete(moduleKey, topicKey)} onStartQuiz={setCurrentQuiz} />;
        }

        const module = learningModules[activeSection];
        if (module) {
            return <ModuleOverview moduleKey={activeSection} module={module} onTopicSelect={setActiveSection} />;
        }
        
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-8 text-center animate-fade-in">
                <BookOpen className="w-16 h-16 mx-auto text-blue-400 mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Welcome to Your HAREC Study Hub</h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">Select a module from the left to begin your learning journey.</p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900 font-sans text-gray-900 dark:text-gray-100">
            <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10">
                <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Radio className="w-8 h-8 text-blue-500"/>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Irish Amateur Radio HAREC Learning System</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Progress</div>
                            <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">{calculateOverallProgress()}%</div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 sticky top-24">
                            <h2 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-4 px-2">Learning Modules</h2>
                            <nav className="space-y-1">
                                {Object.entries(learningModules).map(([moduleKey, module]) => {
                                    const ModuleIcon = module.icon;
                                    const isModuleActive = activeSection === moduleKey;
                                    const isTopicActive = activeSection.startsWith(`${moduleKey}-`);
                                    const isExpanded = isModuleActive || isTopicActive;

                                    return (
                                        <div key={moduleKey}>
                                            <button onClick={() => setActiveSection(moduleKey)} className={`w-full flex items-center justify-between p-3 rounded-lg text-gray-700 dark:text-gray-300 transition-colors ${isModuleActive ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}>
                                                <div className="flex items-center space-x-3"><ModuleIcon className="w-5 h-5 text-blue-500"/><span className="font-semibold">{module.title}</span></div>
                                                <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
                                            </button>
                                            {isExpanded && <div className="pl-6 pt-2 pb-2 border-l-2 border-gray-200 dark:border-gray-700 ml-5 my-1 space-y-1 animate-fade-in-fast">
                                                {Object.entries(module.topics).map(([topicKey, topic]) => (
                                                    <button key={topicKey} onClick={() => setActiveSection(`${moduleKey}-${topicKey}`)} className={`w-full text-left flex items-center space-x-3 p-2 text-sm rounded-md transition-colors ${activeSection === `${moduleKey}-${topicKey}` ? 'bg-blue-50 text-blue-800 font-medium dark:bg-blue-900/50 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}>
                                                        {completedTopics.has(`${moduleKey}-${topicKey}`) ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600"/>}<span>{topic.title}</span></button>
                                                ))}
                                            </div>}
                                        </div>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>
                    <div className="lg:col-span-3">
                        {renderMainContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
