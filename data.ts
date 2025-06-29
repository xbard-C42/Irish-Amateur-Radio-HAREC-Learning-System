import { BookOpen, Radio, Zap, Award, LifeBuoy, FileText, BookMarked } from 'lucide-react';

// === FROM elicensing_data.ts ===
// eLicensing System Data for Amateur Station Licences

export interface LicenceStep {
  title: string;
  description: string;
  notes?: string[];
  warnings?: string[];
}

export interface LicenceType {
  name: string;
  description: string;
  requirements: string[];
  fee: {
    standard: number;
    reduced: number;
    reducedConditions: string[];
  };
  steps: LicenceStep[];
  additionalInfo?: string[];
}

export interface ELicensingData {
  systemInfo: {
    name: string;
    authority: string;
    contactEmail: string;
    totalPages: number;
  };
  generalProcess: {
    overview: string[];
    accountRequirement: string;
    paymentMethods: string[];
    processingNote: string;
  };
  licenceTypes: LicenceType[];
  accountCreation: {
    description: string;
    steps: string[];
    accountTypes: string[];
  };
}

export const eLicensingData: ELicensingData = {
  systemInfo: {
    name: "eLicensing System for Amateur Station Licences",
    authority: "ComReg (Commission for Communications Regulation)",
    contactEmail: "licensing@comreg.ie",
    totalPages: 48
  },

  generalProcess: {
    overview: [
      "This document is an aid to using the eLicensing system for Amateur Station Licences",
      "Shows screenshots of what to expect during the application process",
      "All new licensees required to create an eLicensing account",
      "Existing licensees already have an account"
    ],
    accountRequirement: "Before applying for any Licence all new licensees will be required to create an eLicensing account",
    paymentMethods: ["Bank Card"],
    processingNote: "An email will issue to advise when the electronically signed Licence is ready to be downloaded"
  },

  licenceTypes: [
    {
      name: "CEPT Class 1 with Irish Qualifications",
      description: "Amateur Station Licence for those with Irish HAREC Theory Certificate",
      requirements: [
        "Irish HAREC Theory Certificate",
        "Station address within the jurisdiction of Ireland",
        "Morse code qualification (5 words per minute) for CEPT Class 1"
      ],
      fee: {
        standard: 100,
        reduced: 30,
        reducedConditions: ["Age 65 years or over", "In receipt of Disability Allowance/Pension"]
      },
      steps: [
        {
          title: "Login to eLicensing",
          description: "Access the eLicensing system with your account credentials"
        },
        {
          title: "Select Application Type",
          description: "Choose 'Amateur Station' from the available licence types"
        },
        {
          title: "Enter Station Details",
          description: "Provide proposed station coordinates (WGS 84 format) and address",
          notes: ["Coordinates format: DD° MM' SS.SS\" N, DDD° MM' SS.SS\" W"]
        },
        {
          title: "Publication Consent",
          description: "Choose whether to publish information in the Call Sign Book",
          notes: ["Call signs provided automatically", "Name and station address withheld unless consent given"]
        },
        {
          title: "Declaration",
          description: "Certify information accuracy and accept licence conditions"
        },
        {
          title: "Payment",
          description: "Complete payment using bank card details"
        }
      ],
      additionalInfo: [
        "ComReg provides licensee details for Call Sign Book updates",
        "Published periodically by Irish Radio Transmitter Society (IRTS)"
      ]
    },

    {
      name: "CEPT Class 2 with Irish Qualifications",
      description: "Amateur Station Licence without Morse code requirement",
      requirements: [
        "Irish HAREC Theory Certificate",
        "Station address within the jurisdiction of Ireland"
      ],
      fee: {
        standard: 100,
        reduced: 30,
        reducedConditions: ["Age 65 years or over", "In receipt of Disability Allowance/Pension"]
      },
      steps: [
        {
          title: "Qualifications Check",
          description: "System checks for HAREC Theory Certificate on record",
          notes: ["If no record found, can upload qualification documents"]
        },
        {
          title: "Station Details",
          description: "Enter station coordinates and address information"
        },
        {
          title: "Publication Consent",
          description: "Consent to publication in Call Sign Book"
        },
        {
          title: "Declaration and Payment",
          description: "Complete declaration and payment process"
        }
      ]
    },

    {
      name: "Club Licence",
      description: "Licence for amateur radio clubs",
      requirements: [
        "Account created in correct name of the Club",
        "Linked licence holder (current Amateur Station CEPT Class 1 or 2)",
        "Station address within Ireland jurisdiction"
      ],
      fee: {
        standard: 100,
        reduced: 100,
        reducedConditions: []
      },
      steps: [
        {
          title: "Linked Licence Holder",
          description: "Enter contact name and call sign of licence holder"
        },
        {
          title: "Station Details",
          description: "Provide station keeper name, call sign, coordinates and address"
        },
        {
          title: "Club Call Sign",
          description: "Enter proposed call sign following specific format",
          notes: [
            "Format: EI followed by single number, then up to 4 characters ending with letter",
            "Example format shown in table: EI[0-9][A-Z or 0-9][A-Z or 0-9][A-Z or 0-9][A-Z]"
          ]
        }
      ]
    },

    {
      name: "Automatic Station",
      description: "Licence for automatic/unattended stations",
      requirements: [
        "Existing Amateur Station Licence",
        "Station address within Ireland jurisdiction"
      ],
      fee: {
        standard: 100,
        reduced: 100,
        reducedConditions: []
      },
      steps: [
        {
          title: "Station Type Selection",
          description: "Select automatic station type from dropdown",
          notes: [
            "Options include: Voice Repeater, Digital Voice Repeater, FM Repeater, ATV Repeater, Beacon, Internet Gateway, Other"
          ]
        },
        {
          title: "Call Sign Assignment",
          description: "System assigns call sign based on location and station type"
        },
        {
          title: "Technical Requirements",
          description: "Enter preferred spot frequencies for transmit and receive"
        }
      ]
    },

    {
      name: "Additional Authorisations",
      description: "Additional permissions for existing licence holders",
      requirements: [
        "Existing Amateur Station Licence",
        "Station details must match existing licence"
      ],
      fee: {
        standard: 30,
        reduced: 30,
        reducedConditions: []
      },
      steps: [
        {
          title: "Event Dates",
          description: "Provide dates for event (minimum 1 day, maximum 12 months)"
        },
        {
          title: "Station Verification",
          description: "Confirm station details match existing licence"
        },
        {
          title: "Technical Requirements",
          description: "Specify additional authorisation requirements",
          notes: [
            "Use of additional authorisation bands (see Annex 1.1)",
            "Use of spot frequencies within standard bands",
            "Use of additional power levels for spot frequencies"
          ]
        }
      ]
    },

    {
      name: "Non Irish Qualifications",
      description: "For applicants with qualifications obtained outside Ireland",
      requirements: [
        "Equivalent HAREC/CEPT standard qualification from another country",
        "Station address within Ireland jurisdiction",
        "Upload supporting documentation"
      ],
      fee: {
        standard: 100,
        reduced: 30,
        reducedConditions: ["Age 65 years or over", "In receipt of Disability Allowance/Pension"]
      },
      steps: [
        {
          title: "Qualification Upload",
          description: "Attach file with supporting scan(s) of qualifications"
        },
        {
          title: "Station Details",
          description: "Enter station coordinates and address"
        },
        {
          title: "Standard Process",
          description: "Follow standard publication, declaration and payment steps"
        }
      ],
      additionalInfo: [
        "Contact IRTS if wishing to sit exam to obtain Amateur Radio qualification in Ireland"
      ]
    },

    {
      name: "Visitors Temporary Licence",
      description: "Temporary licence for visiting amateur radio operators",
      requirements: [
        "Valid amateur radio licence or HAREC qualifications from home country",
        "Temporary address within Ireland",
        "Upload supporting documentation"
      ],
      fee: {
        standard: 30,
        reduced: 30,
        reducedConditions: []
      },
      steps: [
        {
          title: "Qualification Evidence",
          description: "Upload copy of licence or HAREC qualifications"
        },
        {
          title: "Event Dates",
          description: "Specify visit dates (minimum 1 day, maximum 12 months)"
        },
        {
          title: "Temporary Station",
          description: "Provide temporary station address in Ireland"
        }
      ]
    },

    {
      name: "Special Event",
      description: "Licence for special event stations",
      requirements: [
        "Amateur Station Licence (if held)",
        "Event details and station information"
      ],
      fee: {
        standard: 30,
        reduced: 30,
        reducedConditions: []
      },
      steps: [
        {
          title: "Qualification Check",
          description: "Provide qualifications if no Irish licence held"
        },
        {
          title: "Event Details",
          description: "Specify event dates and station information"
        },
        {
          title: "Special Call Sign",
          description: "Request special event call sign",
          notes: [
            "Format: EI or EJ followed by single digit, then up to 4 alphanumeric characters ending in letter"
          ]
        },
        {
          title: "Technical Specifications",
          description: "Enter frequency bands requested for use",
          notes: ["See Annex 2 of Amateur Station guidelines ComReg 09/45"]
        }
      ]
    }
  ],

  accountCreation: {
    description: "Before applying for any Licence it may be necessary to register details with ComReg by creating an eLicensing account",
    steps: [
      "Click 'Create New Account' on login page",
      "Select 'Radio Spectrum Licensing' account type",
      "Choose relevant licence type(s) to apply for",
      "Complete general details form",
      "Submit registration request",
      "Wait for email confirmation to activate account"
    ],
    accountTypes: [
      "Premium Rate Services",
      "Radio Spectrum Licensing"
    ]
  }
};

// Helper functions for working with the data
export const getLicenceTypeByName = (name: string): LicenceType | undefined => {
  return eLicensingData.licenceTypes.find(licence => licence.name === name);
};

export const getAllLicenceNames = (): string[] => {
  return eLicensingData.licenceTypes.map(licence => licence.name);
};

export const getLicencesByFeeRange = (maxFee: number): LicenceType[] => {
  return eLicensingData.licenceTypes.filter(licence => licence.fee.standard <= maxFee);
};

export const getReducedFeeLicences = (): LicenceType[] => {
  return eLicensingData.licenceTypes.filter(licence => licence.fee.reduced < licence.fee.standard);
};


// === FROM IRTS_HAREC_Amateur_Station_Licence_Study_Guide_data.ts ===
export const studyGuideFullContent = [
  ``,
  `I
RTS 
HARE C
 
AM ATEUR 
RADIO 
STATION
 
LICENCE
 
S
tudy
 
Guid e`,
  `I
RTS HAREC
 
AM
A
TEU
R RADIO  
STATION LICENCE
 
S
tudy
 
Guid e
 
Fourth 
Edition
 
EDIT OR 
&
 
AUT HOR
 
Rafal Lukawie cki 
EI6LA
 
CONTRIBUTING AUTHOR S
 
Mike L e e 
EI 4 HF
 
Jerry Cahill 
EI6BT
 
Keith Crittenden 
EI5KJ
 
Simon Ken ny 
EI 7ALB
 
Dave Mo o re 
EI 4 BZ
 
CHIEF ILLUST RATOR
 
Robert Kwiatkowski 
EI 9 ILB
 
FORM ER 
CONT RIBUTOR S
 
Jo e Rya n  
EI7GY
 
Seán  No lan  
EI7CD
 
Séamus Mc Cague 
EI 8BP
 
Paul Martin  
EI2CA
 
 
 
 

 

 
 
 
 
 
IRISH RADIO TRANSMIT TER S SOCIETY 
·
 
DUBLIN
 
PATRON 
·
 
MICH AEL D
.
 
HIGGINS 
·
 
PRESIDENT OF IRELAND`,
  `Cop
yright ©  ˜˚˜ ˛
 
by Irish Radio Transmitters S ociety
 
except where attributed 
otherwise
,  
see page 
˝˙ˆ
. 
Rafal  Lukawieck i has asserted his right to be identiˇed
 
as the overall  author of this work.
 
All rights reserved.
 
No portion of this book may be reproduced in any form without
 
a 
written
 
permission from the publisher or 
the 
author,
 
except as outlined
 
on page 
˝˙ˆ
 
or as permitted by Irish copyright law.
 
Published by the Irish Radio Transmitters S ociety (
IRTS
)  
PO  Box ˛˘˜
, 
D ubl in  
, 
Irel and
 
publisher@irts.ie
 
Fo urth 
Edition
 · 
Revision ˛.˚.
˝ 
Published ˜˚˜˛
 
Printed in Sl ovak ia
 
ISBN  
- -
˙˝ ˜˛˝˝
- ˜- ˘ ( p
aperback)
 
ISBN   ˙
-  -
˙˝ ˜˛˝˝
- ˝- ˝ (
hardcover
) 
ISBN   ˙
-  -
˙˝ ˜˛˝˝
-  -
  (
PDF
 
eBoo k
) 
British Library Cataloguing
-
in
-
Publication D ata
 
A catal ogue record for this book is avail abl e from the British Library.
 
S ee page 
 
for the history of prior editions.
 
To purchase a printed book or to downl oad the 
PDF
 
visit 
irts.ie/guide`,
  `To 
our
 
friends
 
at 
the National Short Wave Listeners Club
 
for your patience a nd support
 
a nd to a ll who volunteer 
for a good cause`,
  `vi
 
D
ISCLAIMER S
 
T
HIS  GUIDE
 
is 
provided as is
 
and 
WITHOUTANY GUARANTEE OR WARRANT Y
 
regarding its qual ity, appropriateness for any purpose, or freedom from errors and 
omissions. 
I
t is lik ely that there are inaccuracies in this guide. 
If you spot any, pl ease 
let us k now. 
You are responsibl e for ensuring the val idity and 
suitability 
of this mate-
rial  for whichever purpose you may appl y it to.
 
Errors found and corrected a er the 
printing of this edition will  be l isted in the onl ine errata, and incorporated into a 

subsequent edition, see:
 
Ł
 
Errata: 
irts.ie/errata
 
Ł
 
Latest 
PDF
 
edition and to purchase a printed copy: 
irts.ie/guide
 
Ł
 
Pl ease email  feedback and corrections to: 
publisher@irts.ie
 
Y
OU ARE RESPONSIBLE FOR YOUR SAFET Y
 
and the safety of those 
a ected by
 
you
r radio station . The authors, the editors, the National  Short Wave Listeners Cl ub, 
and the Irish Radio Transmitters Society
 
ACCEPT NO RESPONSIBILIT Y FOR THE 
ACCURACY OR U S ABILIT Y
 
of this material, nor any consequences of rel ying on it. If 
in doubt, seek professional  
advice
. 
You must al ways foll ow all  the regul ations and l egisl ation in force, incl uding but 
not l imited to compl ying with radio regulations
 
and regul atory guidel ines
, 
mechan-
ical  and el ectrical  install ation regul ations, and safety regul ations. 
A
l ways appl y 
common sense when interpreting this material.
 
This guide is provided 
for 
class instructors 
and 
for individual s to hel p 
study 
for 
the 
Harmonised Amateur Radio Examination Certi˜cate 
(
HAREC
)
 
according to the 
requirements needed to obtain an Amateur 
Radio 
Station Licence 
in
 
Irel and.
 
It must 
be used in conjunction with 
the l atest avail abl e 
regul ations
 
which may be newer than 
those referred to in this text
. 
This guide
 
is not designed for any other purpose.
 
C
OPYRIGHT 
˜˚˜˛
 
© 
by the Irish Radio Transmitters S ociety
 
except where 
mark ed otherwise. This guide may 
not
 
be made avail abl e for browsing onl ine or 
downl oad, or distributed as, or as part of, any other work, promotional, non
-
proˇt, 
commercial, or otherwise, without the express, written permission of the 
IRTS
. 
C
on-
tact 
publisher@irts.ie
 
to request a permission
. 
S ome of the ˇgures incl uded in this guide have been obtained from publ ic domain
, 
creative commons,
 
and copyrighted sources. 
C
aptions under 
each ˇgure
 
identify
 
their author. Refer 
to
 
Illustration Credits
 
on page 
˝˙ˆ
 
for the detail  of any l icences 
using 
which 
each 
image ha
s 
been 
incl uded 
in this guide. 
T h
is boo k ™s
 
co
py
right
 
re-
striction does 
not
 
extend to , no r does it 
impose any restrictions on the images that 
are accompanied by
 
their own l icence
 
statements
 
sho wn 
in the tabl e on page
 
˝˙ˆ
.
 
Students are welcome to 
downl oad 
the 
PDF
 
edition of this material  at no cost 
for 
their 
personal study
 
onl y
.`,
  `vii
 
C
ON T ENTS
 
T
ABLES
 
XX
 
A
BBREVIATIONS
 
X XI
 
F
OREWORD
 
X XIII
 
A
C K NOWLEDGEMENTS
 
X XIV
 
1
 
I
NTRODUCTION
 
˜
 
 . 
 
Wel come to Amateur Radio
 
˜
 
 .˜
 
About the IRTS
 
˝
 
 .˝
 
How to Use this Study Guide
 
˛
 
 .˛
 
How to Teach Using this Guide
 
ˆ
 
 .ˆ
 
Note to Licensed Readers
 
ˆ
 
2
 
T
HE 
I
RISH 
HAREC
 
A
MATEUR 
S
TATION 
L
ICENC E 
E
XAM
 
 
P
ART 
A:
 
T
ECHNICAL
 
  
 
3
 
E
LECTRICAL AND 
E
LECTRONIC  
P
RINCIPLES
 
 ˜
 
˝. 
 
The Nature of El ectricity
 
 ˜
 
˝.˜
 
D imensions, Units, and Metric Preˇ
xe s
 
 ˝
 
˝.˜. 
 
El ectrical, El ectromagnetic, and Radio D imensions and Units
 
 ˝
 
˝.˜.˜
 
Metric Preˇ
xe s
 
 ˛
 
˝.˜.˝
 
Exampl es of Unit Conversions
 
 ˆ
 
˝.˝
 
Current
 
 ˘
 
˝.˝. 
 
Electricity & Current
 
 ˘
 
˝.˝.˜
 
Conductivity: Insul ators and Conductors
 
 ˘
 
˝.˝.˝
 
S emiconductors and S ol id
-
state Electronics
 
 ˘
 
˝.˝.˛
 
DC & AC Current
 
 ˙
 
˝.˛
 
S ources of El ectricity and El ectromotive Force
 
 ˙
 
˝.˛. 
 
S eries vs. Parall el  Connection
 
 
˝.ˆ
 
Vol tage
 
  
 
˝.˘
 
D i erence Between Electromotive Force and Voltage
 
  
 
˝.˙
 
Vol tage and Current in Series and Parall el  Circuits
 
˜˚`,
  `viii
 
˝.˙. 
 
S eries Connected Circuit
 
˜˚
 
˝.˙.˜
 
Parallel Connected Circuit
 
˜ 
 
˝.
 
Resistance
 
˜ 
 
˝. 
 
O hm ™s Law
 
˜˜
 
˝. . 
 
Ohm™s Law Example
 
˜˜
 
˝. ˚
 
Electric Power and Energy
 
˜˝
 
˝. ˚. 
 
Electric Power
 
˜˝
 
˝. ˚.˜
 
Power and O hm™s Law
 
˜˛
 
˝. ˚.˝
 
El ectrical Energy and Battery Capacity
 
˜˘
 
4
 
R
ESISTORS IN 
C
IRCUITS
 
 
˛. 
 
Circuits
 
 
˛.˜
 
Resistors
 
 
˛.˜. 
 
Resistor Power Rating
 
˜ 
 
˛.˜.˜
 
Resistors Connected in S eries
 
˝˚
 
˛.˜.˝
 
Resistors Connected in Parall el
 
˝˚
 
˛.˜.˛
 
Multiple Resistors in a Circuit
 
˝ 
 
˛.˜.ˆ
 
Worked Exampl e: Current, Vol tage, and Power
 
with Multiple Resistors
 
˝˜
 
5
 
A
LTERNATING 
C
URRENT AND 
S
INUSOIDAL 
S
IGNALS
 
 
ˆ. 
 
Sinusoidal  Signal s
 
 
ˆ. . 
 
Amplitude
 
˝ 
 
ˆ. .˜
 
Period and Frequency
 
˛˚
 
ˆ. .˝
 
Wavelength and 
Frequency
 
˛˚
 
ˆ. .˛
 
Instantaneous and Average Val ues
 
˛˜
 
ˆ. .ˆ
 
rms, E ective Voltage, Peak
-
to
-
Peak Vol tage, Power
 
˛˜
 
ˆ.˜
 
Alternating Current
 
˛˛
 
ˆ.˝
 
Phase
 
˛˛
 
ˆ.˛
 
Harmonics
 
˛ˆ
 
ˆ.ˆ
 
Modul ated Sinusoidal  Signal s
 
˛ˆ
 
6
 
D
IGITAL 
S
IGNAL 
P
ROC ESSING AND 
N
ON
- S
INUSOIDAL
 
S
IGNALS
 
 
˘. 
 
No n
-
Sinusoidal  Signal s
 
 
˘.˜
 
D igital  Signal  Processing
 
ˆ 
 
˘.˜. 
 
Time and Frequency D omains
 
ˆ˝
 
˘.˜.˜
 
Fast Fourier Transform (FFT)
 
ˆ˘`,
  `ix
 
˘.˝
 
ADC, Sampl ing , and Quantisation
 
 
˘.˝. 
 
Sampl ing
 
 
˘.˝.˜
 
Quantisation
 
ˆ 
 
˘.˝.˝
 
Sampl ing Rate and Resol ution
 
˘˚
 
˘.˝.˛
 
Minimum Sampl ing Rate
 
˘ 
 
˘.˝.ˆ
 
Oversampling
 
˘˜
 
˘.˛
 
D AC and D irect D igital Synthesis
 
˘˝
 
˘.ˆ
 
S o ware D eˇned Radio
 
˘˛
 
˘.ˆ. 
 
SD R as a Broadband Receiver
 
˘ˆ
 
˘.ˆ.˜
 
Modern Transceivers and SD R
 
˘˘
 
7
 
R
ADIO 
W
AV ES  AND 
S
PECTRUM
 
˙˚
 
˙. 
 
Radio Waves and El ectromagnetic Radiation
 
˙˚
 
˙.˜
 
Electromagnetic Wave
 
˙ 
 
˙.˝
 
Fiel ds and Wave Formation
 
˙˜
 
˙.˝. 
 
Fo rce Fiel ds
 
˙˜
 
˙.˝.˜
 
Static and Steady Motion Fiel ds
 
˙˝
 
˙.˝.˝
 
Radiating Fiel ds
 
˙˛
 
˙.˝.˛
 
Formation of the Wave
 
˙ˆ
 
˙.˝.ˆ
 
Propagating El ectromagnetic Wave
 
 
˙.˛
 
Frequency
 
 
˙.ˆ
 
Radio Spectrum
 
 
˙.˘
 
Electric Field
 
 
˙.˙
 
Magnetic Field
 
 
˙.
 
Pol arisation
 
 
8
 
R
ESONANT 
C
IRCUITS AND 
C
OMPONENTS
 
 
 
 
Resonant Components: Inductors
 
 
 . 
 
Back El ectromotive Force
 
 
 .˜
 
Inductors in S eries and Parall el
 
 ˚
 
 .˝
 
Inductive Reactance
 
  
 
˜
 
Resonant Components: Capacitors
 
 ˜
 
˜. 
 
Dielectrics
 
 ˛
 
˜.˜
 
Behaviour of Capacitors in 
AC
 
and 
DC
 
 ˛
 
˜.˝
 
Capacitors in S eries and Parall el
 
 ˆ
 
˜.˛
 
Capacitive Reactance
 
 ˘
 
˝
 
Reactance, Resonance, and Impedance
 
 
˝. 
 
Reactance
 
 
˝.˜
 
Resonance`,
  `x 
˝.˝
 
Impedance
 
 ˚˚
 
˝.˛
 
Impedance as a Number
 
 ˚ 
 
˛
 
Tuned Circuits, Fil ters, and Q  Factor
 
 ˚˜
 
˛. 
 
S eries and Parall el  LC Circuits
 
 ˚˜
 
˛.˜
 
Fil ters
 
 ˚˘
 
˛.˝
 
D igital Filters
 
   
 
˛.˛
 
Q  factor
 
  ˜
 
ˆ
 
Quartz Crystal s
 
  ˝
 
˘
 
O scill ators
 
  ˝
 
˘. 
 
Resonant Circuit O scill ator
 
  ˆ
 
9
 
P
OWER 
R
ATIOS  AND 
D
ECIBELS
 
  ˘
 
 . 
 
D ecibel
 
  ˘
 
 .˜
 
Power Ratios
 
  ˙
 
 .˜. 
 
Power R atios in Watts as D ecibels
 
  ˙
 
 .˜.˜
 
Power Ratios using Vol tage or Current as D ecibel s
 
  ˙
 
 .˝
 
Absolute Power in D ecibel
-
Watts
 
 
 .˛
 
E ective Power
 
   
 
10
 
O
THER 
C
OMPONENTS AND 
C
IRCUITS
 
 ˜˚
 
 ˚. 
 
D iodes
 
 ˜˚
 
 ˚. . 
 
Forward Voltage (Bias Vol tage)
 
 ˜ 
 
 ˚. .˜
 
Peak Inverse Vol tage
 
 ˜ 
 
 ˚. .˝
 
Leakage Current
 
 ˜ 
 
 ˚. .˛
 
Power Rating
 
 ˜ 
 
 ˚.˜
 
Transistors
 
 ˜˜
 
 ˚.˜. 
 
Currents and Biasing in a 
BJT
 
 ˜˜
 
 ˚.˜.˜
 
Ampliˇcation Factor
 
 ˜˝
 
 ˚.˜.˝
 
BJT
 
vs 
FET
 
 ˜˝
 
 ˚.˝
 
Valves (Thermionic D evices)
 
 ˜˛
 
 ˚.˝. 
 
Tri ode
 
 ˜˛
 
 ˚.˝.˜
 
Val ve Safety
 
 ˜ˆ
 
 ˚.˛
 
Integrated Circuits
 
 ˜˘
 
 ˚.ˆ
 
Transformers
 
 ˜˙
 
 ˚.ˆ. 
 
Principl e of O peration
 
 ˜˙
 
 ˚.ˆ.˜
 
Transformer Characteristics
 
 ˜˙`,
  `xi
 
 ˚.˘
 
Power Supplies
 
 ˜ 
 
 ˚.˘. 
 
Vol tage Transformer
 
 ˜ 
 
 ˚.˘.˜
 
Switched Mode Power Supply
 
 ˝˚
 
 ˚.˘.˝
 
Rectiˇer
 
 ˝˚
 
 ˚.˘.˛
 
Vol tage Regul ator (Stabil iser)
 
 ˝˝
 
 ˚.˙
 
Ampliˇers
 
 ˝˛
 
 ˚.˙. 
 
Ampliˇer Characteristics
 
 ˝˛
 
 ˚.˙.˜
 
Cl asses of Power Ampl iˇers
 
 ˝ˆ
 
 ˚.˙.˝
 
Biasing
 
 ˝˘
 
 ˚.˙.˛
 
D istortion from Ampl iˇer Non
-
Linearity
 
 ˝˙
 
 ˚.˙.ˆ
 
AF
 
Ampliˇers
 
 
 ˚.˙.˘
 
RF
 
Ampliˇers
 
 
11
 
M
ODULATION AND 
M
ODES
 
 ˛˚
 
  . 
 
Carrier, Signal, Modul ation, Bandwidth, and Sidebands
 
 ˛˚
 
  .˜
 
Type of Modul ation vs. O perating Mode
 
 ˛ 
 
  .˝
 
Anal ogue vs D igital : Type of Information Being Transmitted
 
 ˛˜
 
  .˝. 
 
Modul ation of Anal ogue Information
 
 ˛˜
 
  .˝.˜
 
Modul ation of D igital  Information: Bits and Symbol s
 
 ˛˝
 
  .˛
 
Amplitude and Frequency Modul ation
 
 ˛˛
 
  .˛. 
 
Amplitude Modul ation
 
 ˛ˆ
 
  .˛.˜
 
Frequency Modul ation
 
 ˆ 
 
  .ˆ
 
AM 
(A E)
 
 ˆ˘
 
  .˘
 
S SB (J˝E)
 
 ˆ˙
 
  .˙
 
FM (F˝E)
 
 
  .
 
CW, ASK, OO K (A A)
 
 ˆ 
 
  . 
 
CW
 
Modul ating Signal  (Keying Waveform)
 
 ˘˚
 
  .˜
 
CW
 
Modul ated Signal
 
 ˘˚
 
  .˝
 
CW
 
Bandwidth and Rise and Fall  Times
 
 ˘˜
 
  .˛
 
CW
 
Sidebands
 
 ˘˝
 
  . 
 
RTTY, FSK (F B)
 
 ˘˛
 
  . ˚
 
FT, FSK (J ˜B, J˜D)
 
 ˘˘
 
  .  
 
PSK, ˜
-
PSK, ˛
-
PSK (G B)
 
 ˘˙
 
  . ˜
 
Other Modes
 
 ˘ 
 
12
 
T
R ANSMIT TERS
 
 ˙˚
 
 ˜. 
 
Output Power
 
 ˙ 
 
 ˜.˜
 
Modul ation D uty Cycl e and Operational  D uty Cycle
 
 ˙˜
 
 ˜.˝
 
Output Impedance
 
 ˙˝`,
  `xii
 
 ˜.˛
 
E ciency and Output Power
 
 ˙˛
 
 ˜.ˆ
 
Problems A ecting Transmitters
 
 ˙˛
 
 ˜.˘
 
CW Transmitter
 
 ˙ˆ
 
 ˜.˘. 
 
CW
: Master O scill ator
 
 ˙ˆ
 
 ˜.˘.˜
 
CW
: Bu er/D river
 
 ˙˘
 
 ˜.˘.˝
 
CW
: Power Ampl iˇer
 
 ˙˘
 
 ˜.˙
 
S SB Transmitter
 
 ˙˙
 
 ˜.˙. 
 
SSB
: 
IF
 
Signal  G eneration
 
 
 ˜.˙.˜
 
SSB
: Filter
 
 
 ˜.˙.˝
 
SSB
: Mi
xe r
 
 ˙ 
 
 ˜.˙.˛
 
SSB
: Linear Ampl iˇer and Automatic Level  Control  (
ALC
)
 
 ˙ 
 
 ˜.
 
FM Transmitter
 
 
 ˜. 
 
FM
: 
IF
 
Signal  G eneration
 
 
 ˜.˜
 
FM
: Frequency Multiplier
 
 
 ˜.˝
 
FM
: Power Ampliˇer
 
 
 ˜. 
 
D i gital  Modes
 
 
 ˜. ˚
 
Modern Transmitters and SD R
 
 
 ˜. ˚. 
 
Fully D igital  Transmi tter with 
RF
 
DDS
 
 
 ˜. ˚.˜
 
Hybrid 
SDR
 
Transmitter with 
IF DDS
 
 
 ˜.  
 
Transverter
 
 
 ˜. ˜
 
High Power Linear Ampliˇers
 
 
 ˜. ˝
 
HF Station
 
 
13
 
R
EC EIV ERS
 
 
 
 ˝. 
 
Superheterodyne Receiver
 
 
 ˝.˜
 
D ouble Conversion Superheterodyne Receiver
 
 
 ˝.˝
 
Receiver Components
 
  ˚
 
 ˝.˝. 
 
RF
 
Ampl iˇer
 
  ˚
 
 ˝.˝.˜
 
Local  O scill ator
 
  ˚
 
 ˝.˝.˝
 
Mi
xe r
 
   
 
 ˝.˝.˛
 
IF
 
Fil ter
 
  ˜
 
 ˝.˝.ˆ
 
IF
 
Ampl iˇer
 
  ˝
 
 ˝.˝.˘
 
D etecto r ( D emodul ato r)
 
  ˛
 
 ˝.˝.˙
 
Product Detector (
CW
 
and 
SSB
)
 
  ˆ
 
 ˝.˝.
 
FM
 
D emodul ator and Limiter
 
  ˆ
 
 ˝.˝. 
 
AF
 
Ampl iˇer
 
  ˘
 
 ˝.˝. ˚
 
Automatic Gain Control  (
AGC
)
 
  ˘
 
 ˝.˝.  
 
S Meter
 
  ˙
 
 ˝.˝. ˜
 
S quel ch`,
  `xiii
 
 ˝.˛
 
S SB and CW Receiver
 
 
 ˝.ˆ
 
FM Receiver
 
 
 ˝.˘
 
Modern Receivers and SD R
 
   
 
 ˝.˘. 
 
Full y D igital  D irect Sampl ing 
SDR
 
Receiver
 
   
 
 ˝.˘.˜
 
Hybrid 
SDR
 
Receiver
 
˜˚ 
 
 ˝.˙
 
Receiver Characteristics
 
˜˚˜
 
 ˝.˙. 
 
S ensitivity and Signal
-
to
-
Noise Ratio (
SNR
)
 
˜˚˜
 
 ˝.˙.˜
 
S electivity and Adjacent Channel Characteristics
 
˜˚˜
 
 ˝.˙.˝
 
Dynamic Range
 
˜˚˝
 
 ˝.˙.˛
 
Image Frequency and Image Rejection
 
˜˚˝
 
 ˝.˙.ˆ
 
Noise Figure and Factor
 
˜˚˛
 
 ˝.˙.˘
 
Stabil ity
 
˜˚˛
 
 ˝.˙.˙
 
D esensitisation and Blocking
 
˜˚ˆ
 
 ˝.˙.
 
Intermodul ation
 
˜˚ˆ
 
 ˝.˙. 
 
Cross
-
modul ation
 
˜˚ˆ
 
14
 
T
R ANSMISSION 
L
INES
 
˜˚˘
 
 ˛. 
 
Characteristic Impedance
 
˜˚˘
 
 ˛.˜
 
Line Loss (Attenuation)
 
˜˚˘
 
 ˛.˝
 
Vel ocity Factor
 
˜˚˙
 
 ˛.˝. 
 
El ectrical Length of a Line
 
 
 ˛.˛
 
Preventing Line Radiation
 
 
 ˛.ˆ
 
Parall el  Lines
 
˜˚ 
 
 ˛.˘
 
Coaxial Line
 
˜  
 
 ˛.˘. 
 
Coaxial  Connectors
 
˜ ˝
 
 ˛.˙
 
Waveguide
 
˜ ˝
 
 ˛.
 
Common Mode Current
 
˜ ˛
 
 ˛. 
 
Impedance Matching and Transformation
 
˜ ˆ
 
 ˛. . 
 
Matched Case
 
˜ ˘
 
 ˛. .˜
 
Unmatched Case and Standing Waves
 
˜ ˙
 
 ˛. .˝
 
Standing Waves on a Transmission Line and Line Loss
 
˜ 
 
 ˛. .˛
 
Standing Wave Ratio (VS WR )
 
˜  
 
 ˛. ˚
 
Antenna Tuning Units
 
˜˜˚
 
 ˛.  
 
Bal uns and Chok es
 
˜˜ 
 
 ˛.  . 
 
Voltage vs. Current Baluns
 
˜˜˜
 
 ˛.  .˜
 
 :  Current Balun and Common Mode Chok e
 
˜˜˜
 
 ˛.  .˝
 
Vol tage Bal uns and Ununs
 
˜˜˝`,
  `xiv
 
15
 
A
NTENNAS
 
˜˜˛
 
 ˆ. 
 
How do Antennas Work?
 
˜˜˛
 
 ˆ.˜
 
Near and Far Antenna Fiel ds
 
˜˜˛
 
 ˆ.˝
 
Feed Point Impedance
 
˜˜˙
 
 ˆ.˛
 
Construction Material s
 
˜˜˙
 
 ˆ.ˆ
 
Far Fiel d Pattern
 
 
 ˆ.ˆ. 
 
Isotropic Antenna R adiation Pattern
 
 
 ˆ.˘
 
Pol arisation
 
˜˜ 
 
 ˆ.˙
 
Hal f
-
wave Antenna
 
˜˜ 
 
 ˆ.˙. 
 
Vol tage, Current, and Impedance on a Hal f
-
Wave Antenna
 
˜˜ 
 
 ˆ.˙.˜
 
Antenna L ength
 
˜˝˚
 
 ˆ.
 
Hal f
-
Wave Dipol e
 
˜˝ 
 
 ˆ. 
 
Hal f
-
Wave Dipol e Radiation Pattern
 
˜˝˜
 
 ˆ.˜
 
Vertically Oriented D ipole
 
˜˝˛
 
 ˆ. 
 
No n
-
resonant Wire Antennas and Multiband Antennas
 
˜˝˛
 
 ˆ. ˚
 
End
-
Fed Half
-
Wave Antenna
 
˜˝˘
 
 ˆ.  
 
Fol ded D ipol e
 
˜˝˙
 
 ˆ. ˜
 
Trap D ipole
 
 
 ˆ. ˝
 
Quarter
-
Wave Ground Plane Antenna (Vertical)
 
 
 ˆ. ˝. 
 
Quarter
-
wave Vertical  with Radial s on the Ground
 
˜˛ 
 
 ˆ. ˝.˜
 
Quarter
-
wave Vertical  with Elevated Radial s (Counterpoise)
 
˜˛ 
 
 ˆ. ˛
 
Yagi
-
Uda Antenna
 
˜˛˜
 
 ˆ. ˛. 
 
Yagi Radiation Pattern
 
˜˛˝
 
 ˆ. ˆ
 
D irectivity, E ciency, and Gain
 
˜˛˘
 
 ˆ. ˘
 
Fro nt
-
to
-
Back Ratio
 
 
 ˆ. ˙
 
Capture Area (E ective Aperture)
 
˜˛ 
 
 ˆ.
 
Parabol ic Antenna
 
˜˛ 
 
 ˆ.  
 
Horn Antenna
 
˜ˆ˚
 
 ˆ.˜˚
 
E ective Power: EIRP and ERP
 
˜ˆ˚
 
 ˆ.˜˚. 
 
Cal cul ating 
EIRP
 
and 
ERP
 
˜ˆ 
 
16
 
P
ROPAGATION
 
˜ˆ˛
 
 ˘. 
 
Electromagnetic Wave
 
˜ˆ˛
 
 ˘. . 
 
Propagation Vel ocity
 
˜ˆ˛
 
 ˘.˜
 
Cycl es and S ol ar Phenomena
 
˜ˆˆ
 
 ˘.˜. 
 
Daily Cycle
 
˜ˆˆ
 
 ˘.˜.˜
 
S ol ar Cycl e
 
˜ˆ˘`,
  `xv 
 ˘.˜.˝
 
Sunspots and Fl ares
 
˜ˆ˙
 
 ˘.˜.˛
 
G eomagnetic Storms and Auroras
 
˜ˆ˙
 
 ˘.˝
 
Atmo sphere
 
˜ˆ 
 
 ˘.˝. 
 
Troposphere
 
˜ˆ 
 
 ˘.˝.˜
 
Ionosphere
 
˜ˆ 
 
 ˘.˝.˝
 
Ionospheric Layers
 
˜ˆ 
 
 ˘.˛
 
Line
-
of
-
Sight Propagation and Radio Horizon
 
˜˘ 
 
 ˘.˛. 
 
Free Space Attenuation
 
˜˘ 
 
 ˘.ˆ
 
LF, MF, and HF Propagation Mechanism
 
˜˘˜
 
 ˘.ˆ. 
 
Ground Wave
 
˜˘˜
 
 ˘.ˆ.˜
 
Sk y Wave
 
˜˘˝
 
 ˘.˘
 
LF and MF Propagation
 
˜˘˝
 
 ˘.˙
 
HF Propagation
 
˜˘ˆ
 
 ˘.
 
VHF and UHF Propagation Mechanisms
 
˜˘˘
 
 ˘. 
 
Tropospheric (Space) Wave
 
˜˘˘
 
 ˘.˜
 
Troposcatter
 
˜˘˘
 
 ˘.˝
 
Aircra  S catter (Aircra  Re ection)
 
˜˘˘
 
 ˘.˛
 
Tropospheric D ucting
 
˜˘˙
 
 ˘.ˆ
 
Sporadic E
 
˜˘˙
 
 ˘.˘
 
Auroral  Re ection and S cattering
 
˜˘˙
 
 ˘.˙
 
Meteor S catter
 
˜˘˙
 
 ˘.
 
Earth
-
Moon
-
Earth (
EME
)
 
 
 ˘. 
 
Satell ites
 
 
 ˘. 
 
Fading
 
˜˘ 
 
 ˘. ˚
 
Estimating and Predicting Propagation
 
˜˘ 
 
 ˘. ˚. 
 
Critical Frequency
 
˜˘ 
 
 ˘. ˚.˜
 
Maximum Usable Frequency (
MUF
)
 
˜˘ 
 
 ˘. ˚.˝
 
Lowest Usable Frequency (LUF)
 
˜˙ 
 
17
 
M
EASUREMENTS
 
˜˙˜
 
 ˙. 
 
Multimeter, Ammeter, Ohmmeter, Voltmeter
 
˜˙˜
 
 ˙. . 
 
Vol tage
 
˜˙˝
 
 ˙. .˜
 
Current
 
˜˙˝
 
 ˙. .˝
 
Resistance
 
˜˙˝
 
 ˙.˜
 
S WR and Power
 
˜˙˛
 
 ˙.˝
 
O scill oscope
 
˜˙˘
 
 ˙.˛
 
RF Envelope
 
˜˙˙
 
 ˙.ˆ
 
Spectrum Anal yser`,
  `xvi 
 ˙.˘
 
Signal  G enerator
 
 
 ˙.˙
 
Frequency Counter
 
˜˙ 
 
 ˙.
 
Field Strength Meter
 
˜˙ 
 
 ˙. 
 
Antenna Analyser
 
 
 ˙. ˚
 
D ummy Load
 
 
18
 
E
LECTROMAGNETIC 
C
OMPATIBILITY
,
 
I
MMUNITY
,
 
AND 
T
R ANSMIT TER 
I
NTERFERENCE
 
 
 
 
El ectromagnetic Compatibil ity
 
 
 . 
 
Radiated E missions
 
 
 .˜
 
Conducted Emissions
 
 
 .˝
 
Interference and Immunity
 
 
 .˛
 
Fiel d Strength and EMC
 
 
 .ˆ
 
Prevention
 
 
˜
 
Transmitter D istortion and Spurious Emissions
 
 
˜. 
 
Spurious Emissions
 
˜ ˚
 
19
 
S
AFETY
 
˜ ˜
 
  . 
 
Radio Safety and The Irish Law
 
˜ ˜
 
  .˜
 
Equipment Labelling and Access Control Requirements
 
˜ ˝
 
  .˝
 
Electricity and The Human Body
 
˜ ˝
 
  .˝. 
 
Dealing with Electric Shock
 
˜ ˝
 
  .˝.˜
 
RF
 
Burns from Direct and Near Contact with 
RF
 
Currents
 
˜ ˛
 
  .˛
 
Mains Power Suppl y
 
˜ ˆ
 
  .˛. 
 
Suppl y Safety: Switches and 
RCD
s
 
˜ ˆ
 
  .˛.˜
 
Protective Earth
 
˜ ˘
 
  .˛.˝
 
Wiring and Plugs
 
˜ ˙
 
  .˛.˛
 
Fuses
 
˜ ˙
 
  .˛.ˆ
 
Val ve Equipment and High Vol tage Power Supplies
 
 
  .˛.˘
 
Adjusting Live Equipment
 
˜  
 
  .ˆ
 
Mobil e and Battery Safety
 
˜  
 
  .˘
 
Antenna (Aerial ) Safety
 
˜  
 
  .˘. 
 
Mechanical  Safety
 
˜  
 
  .˘.˜
 
Lightning
 
˝˚˚
 
  .˙
 
Chemical s
 
˝˚˚
 
  .
 
No n
-
Ionising Radiation and El ectromagnetic Fiel d Safety
 
˝˚˚
 
  . 
 
Emissions and the Exposure Limits
 
˝˚ 
 
  .˜
 
How to Compl y?
 
˝˚˜
 
  .˝
 
Nature of the Risks
 
˝˚˝`,
  `xvii 
  .˛
 
Station Characteristics In uencing 
RF
 
Emissions
 
˝˚ˆ
 
  .ˆ
 
Estimating and Modelling 
RF
 
Field Strengths and Exposure
 
˝˚˙
 
  .˘
 
Interior of Transmitters and Power Ampl iˇers
 
˝ ˚
 
  .˙
 
Practical  Suggestions
 
˝ ˚
 
P
ART 
B:
 
O
PER ATING 
R
ULES
,
 
P
ROC EDURES AND 
R
EGULATIONS
 
˝ ˝
 
20
 
ITU
 
R
ADIO 
R
EGULATIONS
 
˝ ˛
 
˜˚. 
 
International Telecommunications Union (ITU )
 
˝ ˛
 
˜˚.˜
 
ITU Radio Regions and the IARU
 
˝ ˛
 
˜˚.˝
 
Purpose of the Amateur S ervice
 
˝ ˆ
 
˜˚.˛
 
Permitted Communications
 
˝ ˆ
 
˜˚.ˆ
 
Primary and Secondary All ocations
 
˝ ˘
 
˜˚.˘
 
Emission D esignators
 
˝ ˘
 
˜˚.˙
 
Frequency of Identiˇcation
 
 
21
 
CEPT
 
R
EGULATIONS
 
˝˜˚
 
˜ . 
 
CEPT and HAREC
 
˝˜˚
 
˜ .˜
 
CEPT Radio Amateur Licence
 
˝˜˚
 
˜ .˝
 
Preˇx When Visiting a Country Implementing CEPT T/R ˘ 
-
˚ 
 
˝˜˜
 
˜ .˛
 
National  Call  Sign Preˇ
xe s
 
˝˜˝
 
22
 
I
RISH 
L
AWS
,
 
R
EGULATIONS
,
 
AND 
L
ICENC E 
C
ONDITIONS
 
˝˜˘
 
˜˜. 
 
Wireless Telegraphy Regulations
 
˝˜˘
 
˜˜. . 
 
Who Can Use Your Station?
 
˝˜˘
 
˜˜.˜
 
ComReg Amateur Station Licence
 
Guidelines
 
˝˜˘
 
˜˜.˝
 
O btaining an Irish Amateur Station Licence
 
˝˜˙
 
˜˜.˛
 
Licence Application, D uration, Amendments, Cancellation,
 
Revocation
 
 
˜˜.ˆ
 
Club Licences
 
˝˜ 
 
˜˜.˘
 
Special  Events
 
˝˜ 
 
˜˜.˙
 
Land Mobil e
 
˝˜ 
 
˜˜.
 
Maritime Mobile
 
˝˝˚
 
˜˜. 
 
Logbook Keeping
 
˝˝ 
 
˜˜. ˚
 
Additional  Authorisations
 
˝˝ 
 
˜˜.  
 
Technical Requirements
 
˝˝ 
 
˜˜. ˜
 
CE Type Approval
 
˝˝˜
 
23
 
P
HONETIC 
A
LPHABET
 
˝˝˛
 
˜˝. 
 
International  Radiotel ephony Spell ing Al phabet
 
˝˝˛`,
  `xviii
 
24
 
C
ALL 
S
IGNS
 
˝˝˘
 
˜˛. 
 
All ocation of Call  Signs
 
˝˝˘
 
˜˛.˜
 
Composition of Call  Signs
 
˝˝˘
 
˜˛.˝
 
Irish Call  Signs
 
˝˝˙
 
˜˛.˛
 
Call  Sign Usage
 
˝˝˙
 
25
 
R
ADIO 
S
PECTRUM 
A
LLOCATION IN 
I
RELAND AND 
IARU
 
B
AND 
P
LANS
 
 
˜ˆ. 
 
Spectrum All ocation in Irel and
 
 
˜ˆ.˜
 
Band Plans
 
˝˝ 
 
˜ˆ.˝
 
O perational  Bands
 
˝˛˚
 
˜ˆ.˝. 
 
˚ m Band Pl an
 
˝˛ 
 
˜ˆ.˝.˜
 
Irish Regul ations Regarding ˘˚
 ×
m Band
 
˝˛˜
 
˜ˆ.˝.˝
 
Band Edges, Status, Power, Restrictions, Emergency Use
 
˝˛˜
 
˜ˆ.˝.˛
 
Propagation Beacons Frequencies
 
˝˛˛
 
˜ˆ.˝.ˆ
 
Emergency Centres of Activity Frequencies
 
˝˛˛
 
26
 
Q - C
ODES  AND 
A
BBREV IATIONS
 
˝˛˘
 
˜˘. 
 
Q-
Codes
 
˝˛˘
 
˜˘.˜
 
Q-
Code as a Question or an Answer
 
 
˜˘.˝
 
O perational  Abbreviations
 
 
27
 
I
NTERNATIONAL 
D
ISTRESS 
S
IGNS
,
 
E
MERGENCY AND 
N
ATUR AL 
D
ISASTER 
C
OMMUNICATIONS
 
˝ˆ˚
 
˜˙. 
 
D istress Signals
 
˝ˆ˚
 
˜˙. . 
 
Radiotel egraphy (Morse) D istress Signal
 
˝ˆ˚
 
˜˙. .˜
 
Radiotel ephony (Voice) D istress Signal
 
˝ˆ˚
 
˜˙.˜
 
Emergency and Natural  D isaster Communications
 
˝ˆ˚
 
˜˙.˝
 
Emergency Frequencies
 
˝ˆ 
 
˜˙.˛
 
Rol e of Licensed Radio Amateurs in Emergency Communication
 
˝ˆ 
 
˜˙.˛. 
 
Communications Emergency
 
˝ˆ˜
 
˜˙.˛.˜
 
S erved Agencies
 
˝ˆ˜
 
˜˙.˛.˝
 
Net
 
˝ˆ˜
 
˜˙.˛.˛
 
Who You Are Not
 
˝ˆ˝
 
˜˙.˛.ˆ
 
D ay
-
to
-
D ay vs. Emergency Communication
 
˝ˆ˝
 
˜˙.˛.˘
 
Means of Emergency Communication
 
˝ˆ˛
 
˜˙.ˆ
 
Measures in Case of Emergency
 
˝ˆ˛`,
  `xix
 
28
 
S
OCIAL 
R
ESPONSIBILITY OF 
R
ADIO 
A
MATEUR 
O
PER ATION AND 
THE 
C
ODE OF 
C
ONDUCT
 
˝ˆ˘
 
 
 
Basic Principles
 
˝ˆ˘
 
˜
 
D anger of Con ict
 
˝ˆ˙
 
˝
 
How to Avoid Con ict?
 
˝ˆ˙
 
˛
 
The autho rity vs. S el f
-
discipline in Amateur Radio
 
˝ˆ˙
 
ˆ
 
Amateur R adio Language
 
 
˘
 
Listen
 
˝ˆ 
 
˙
 
Use Your Call  Sign Correctl y
 
˝ˆ 
 
29
 
O
PER ATING 
P
ROCEDURES AND 
N
ON
- I
NTERFERENCE
 
˝˘˚
 
˜ . 
 
How to Mak e a Q S O
 
˝˘˚
 
˜ .˜
 
Content of Transmissions
 
˝˘ 
 
˜ .˜. 
 
Subj ects to Avoid
 
˝˘ 
 
˜ .˝
 
Mak ing Initial  Call s
 
˝˘˜
 
˜ .˝. 
 
S electing a Frequency
 
˝˘˜
 
˜ .˝.˜
 
Format of a 
CQ
 
Call
 
˝˘˝
 
˜ .˝.˝
 
CQ
 
Call s to Speciˇc G eographic Areas
 
˝˘˛
 
˜ .˝.˛
 
CQ
 
DX
 
˝˘˛
 
˜ .˝.ˆ
 
Format of an Initial  Call  to a Speciˇc Station
 
˝˘ˆ
 
˜ .˛
 
Repl ying to Initial  Call s
 
˝˘˘
 
˜ .ˆ
 
RST Code
 
˝˘˙
 
˜ .˘
 
No n
-
Interference
 
˝˙˚
 
˜ .˘. 
 
How to D eal  with Spectrum Interference?
 
˝˙˚
 
30
 
F
URTHER 
R
EADING
 
˝˙˜
 
˝˚. 
 
Technical Resources
 
˝˙˜
 
˝˚.˜
 
Regul ations and Guidel ines
 
˝˙˝
 
I
LLUSTRATION 
C
REDITS
 
˝˙ˆ
 
E
DITION 
H
ISTORY
 
 
I
NDEX
 
˝˙ `,
  `xx
 
T
ABLES
 
 -
A: Teaching pl an suggestion
 
˘
 
˜-
A: 
HAREC
 
Exam S ection A 
Œ  
Technical
 
 
 
˜-
B: 
HAREC
 
Exam S ection B 
Œ 
Rules, Procedures, Regulations
 
 
 
˝-
A: 
SI
 
dimensions and units
 
 ˛
 
˝-
B: S elected 
SI
 
metric preˇ
xe s
 
 ˆ
 
˝-
C: Ohm's l aw formul ae
 
˜˜
 
˙-
A: 
ITU
 
radio band names (subset: 
LF
, 
MF
, 
HF
, 
VHF
, 
UHF
)
 
 
-
A: 
LC
 
circuits in series and in parallel with a load
 
 ˚ˆ
 
 -
A: D ecibel s as ratios
 
  ˙
 
 -
B: Power in watts as dBW
 
 
 ˚
-
A: Transformer characteristics and turns ratio
 
 
 ˚
-
B: Power ampl iˇer cl asses and their characteristics
 
 ˝˘
 
  
-
A: Common operating modes and modul ation schemes
 
 ˛˜
 
 ˜
-
A: Modul ation duty cycl es of common modulation types
 
 ˙˝
 
 ˝
-
A: Typical receiver 
IF
 
ˇl ter bandwidths
 
  ˝
 
 ˆ
-
A: Typical  hal f
-
wave antenna lengths
 
˜˝ 
 
˜˚
-
A: Common 
ITU
 
emission designators
 
˝ ˙
 
˜ 
-
A: National  preˇ
xe
s: selected European countries
 
˝˜˝
 
˜ 
-
B: National  preˇ
xe
s: 
UK
 
entities
 
˝˜˛
 
˜ 
-
C: National  preˇ
xe
s: Canada and 
USA
 
˝˜˛
 
˜˝
-
A: International  radiotel ephony spell ing al phabet: l etters
 
˝˝ˆ
 
˜˝
-
B: International  radiotel ephony spell ing al phabet: numbers
 
˝˝ˆ
 
˜ˆ
-
A: 
IARU R 
 
detailed band plan (e ective ˚  June ˜˚ ˘)
 
˝˝ 
 
˜ˆ
-
B: 
IARU R 
 
simpl iˇed˚ m band pl an
 
˝˛˜
 
˜ˆ
-
C: 
O perational  bands: edges, status, power, restrictions
 
˝˛˝
 
˜ˆ
-
D: Beacon exclusive frequencies
 
˝˛˛
 
˜ˆ
-
E: E mergency centres of activity used in Ireland
 
˝˛ˆ
 
˜˘
-
A: Q
-
Codes
 
˝˛˘
 
˜˘
-
B: O perational  abbreviations
 
˝˛ 
 
˜ 
-
A: 
R 
val ues in 
RST
 
 
˜ 
-
B: 
S 
val ues in 
RST
 
 
˜ 
-
C: 
T  
val ues in 
RST
 
 
˝˚
- A :  
Image licensing
 
and
 
attributio n
 
˝˙ˆ
 
˝˚
- B:  
Edition
 
histo ry`,
  `xxi
 
A
BBREVIAT IO NS
 
C
OMMON ABBREVIATIONS
 
are listed 
bel ow
, except for Q
-
Codes
, which are
 
ex-
plained in 
Table ˜˘
-
A: Q
-
Codes
 
and 
Table ˜˘
-
B: O perational  abbreviations
 
on pages 
˝˛˘
Œ
˝˛ 
. 
Physical  quantity symbol s can be found in 
Tabl e ˝
-
A: SI dimensions and 
units
 
on page 
 ˛
. A 
compl ete l ist of
 
all  
the 
k ey terms 
used in this guide
 
is 
in the 
Index
 
on page 
˝˙ 
. 
 
AC
 
Alternating Current
 
ADC
 
Analogue to Digit al Conver t er
 
AF
 
Audi
o 
Fr equency
 
AFS K
 
Audio Fr equency Shi   Keying
 
AGC
 
Automatic Gain C ontrol
 
AL C
 
Automat ic Level 
C ontrol
 
AM
 
Amplitude Modulation
 
AM SAT
 
Amateur Radio in Space
 
AM TOR
 
Amateur Teleprinting Over Radio
 
AP RS
 
Automatic Packet Repor ting Sys-
tem
 
A REDN
 
Amateur Radio Emergency Dat a 
Network
 
A REN
 
Amateur Radio Emergency Net -
work
 
ARRL
 
American Radio Relay L eague
 
ARSPEX
 
Amateur Radio Space Exploration
 
ASK
 
Amplitude Shi  Keying
 
ATU
 
Antenna Tuning Unit
 
B FO
 
Beat Fr equency Oscillator
 
BJT
 
Bipolar Junction Transistor
 
CAT
 
C omput er Ai ded Transceiver
 
CB
 
C it izens Band
 
CD
 
C ompact Disc
 
CE
 
European 
c
onformity
 Ø
1
 
CEP T
 
European C onfer ence of  Post al 

and Telecommunicat ions Admin-

istrations
 Ø
2
 
CIO
 
C arrier Insert ion Oscillator
 
C
ME
 
C oronal Mass  Ejection
 
C
OM
R
EG
 
C ommission
 
for C ommunica-
t ions Regulat ion
 
CPR
 
C ardiopulmonary 
r
es uscitat ion
 
CQ
 
General call
 
CW
 
C ont inuous  Wave
 
DAC
 
Digit al 
to 
Analogue C onver t er
 
DC
 
Direct C urrent
 
DDS
 
Direct Digital Synt hesis
 
DIY
 
Do It Yourself
 
D
MR
 
Digital Mobi le Radio
 
 
1
 
Conformité européenne
 
2
 
Conférence européenne des administrations des postes et des télécommunications
 
DSB
 
Double Sideband Amplitude 

Modulation w ith Full C arrier
 
DSL
 
Digital Subscriber  Line
 
DSP
 
Digit al Signal Processing
 
DX
 
Long 
dist ance
 
ECC
 E
lectronic 
C
ommunications 
C
ommittee
 
(of 
CEPT
)  
EFHW
 
End Fed Half
-
Wave
 
EI
 
Ireland (Mainland)
 
EIRP
 
E ective Isotropic Radiated 

Power
 
EJ
 
Ireland (O s
hore)
 
ELCB
 
Ear th Leak
age C ircuit  Breaker
 
EM C
 
Electromagnetic C ompatibility
 
EMCOMM
 
Emergency Communicat ions
 
E ME
 
Earth
-
Moon
-
Earth
 
E
MF
 
Elect romagnetic Field
 
(see emf 
below )
 
emf
 
Electromotive Force
 
(s ee 
EMF
 
above)
 
ERP
 
E ect ive Radiat ed Pow er
 
EU
 
European Union
 
EV
 
Electric Vehicle
 
FET
 
Field E ect Transistor
 
FFT
 
Fast Fourier Transform
 
FIR
 
Finite 
Impuls e Response
 
FM
 
Frequency Modulat ion
 
FS K
 
Frequency Shi   Keying
 
FT 
 
Franke & Taylor
 
GP S
 
Global Positioning System
 
HAREC
 
Harmonised Amateur Radio Ex-

amination Certiˇcate
 
HF
 
High Frequency
 
HI
-
FI
 
High Fidelity
 
IARU
 
Internat ional Amat eur Radio Un-

ion
 
IARUM S
 
Intern
ational Amat eur Radio Un-
ion Monitoring Service
 
IC
 
Integrat ed C ircuit
 
ICAO
 
International C ivil Aviation Or-
ganization`,
  `xxii
 
ICNIRP
 
International C ommission for  
Non
-
Ionising Radi ation Protec-
tion
 
IF
 
Intermediate Frequency
 
IIR
 
Inˇnite Impulse Response
 
IMD
 
Intermodulation Distor tion
 
IRTS
 
Irish Radio Transmit ters Soci ety
 
IT
 
Informat ion Technology
 
ITU
 
Internat ional Telecommunication 

Union
 
LC
 
Indu
ctive-
C apacitive
 
LE D
 
Light E mitting Diode
 
LF
 
Low Frequency
 
LO
 
Local 
Oscillator
 
LSB
 
Lower Si deband
 
LUF
 
Lowest 
Usable Frequency
 
MCB
 
Miniature Circuit Br eaker
 
MF
 
Medi um Frequency
 
/M
 
Mobile
 
/MM
 
Maritime Mobile
 
M P 
 
Moving Picture Experts Group
 
Audio Layer
 
 
 
MUF
 
Maxi mum Usable Frequency
 
NATO
 
North Atlantic Treaty Organi sa-

tion
 
NB FM
 
Narrow B and Frequency 
Modula-
tion
 
NCO
 
Numerically C ont rolled Oscil la-
tor
 
NP N
 
N -
type
ŒP -
type
ŒN -
type Transistor
 
OFCOM
 
O ce
 
of C ommunications (UK)
 
OOK
 
On
-
O  Keying
 
OS CAR
 
Orbiting Satellite Carrying Ama-

teur Radio
 
PCB
 
Printed C ircuit B oard
 
PD
 
Potential Di erence
 
PDF
 
Por t able
 
Document Format
 
PEP
 
Peak Envelope Power
 
PES
 
Principal 
E
mergency 
S
ervice
 
PIR
 
Passive Infrared
 
PIV
 
Peak Inverse Voltage
 
PLL
 
Phase Locked Loop
 
PM
 
Phase Modulation
 
PNP
 
P -
type
ŒN -
type
ŒP -
type Transistor
 
 
3
 
Sys tème inter national
 
PRA
 
Principal Response Agency
 
PS K
 
Phase Shi  Keying
 
PS U
 
Power Supply Unit
 
PV
 
Photovoltaic
 
P VC
 
P
olyvinyl C hlori de
 
QAM
 
Quadratur e Amplit ude Modula-
tion
 
RCD
 
Residual Current Device
 
RED
 
Radio E missions Directive
 
RF
 
Radio Frequency
 
RFID
 
Radio Frequency Identiˇcation
 
r
ms
 
Root  Mean Square
 
R
O
HS
 R
eduction of 
H
azardous 
S
ubstances
 
RS
 
Read
ability and St rengt h
 
RSGB
 
Radi
o Society of  Great  Brit ain
 
RST
 
Readabi lity, Strength, and Tone
 
RTTY
 
Radio Teletype
 
SAR
 
Speciˇc Absorpt ion Rat e
 
SDR
 
So w are Deˇned Radio
 
SI
 
Internat ional Sys tem of Unit s
 Ø
3
 
SNR
 
Si
gnal to Noise Ratio
 
SOS
 
Distress s ignal
 
SSB
 
Single Sideband
 
SS TV
 
Slow
-
Scan Television
 
S
WR
 
Standing Wave Rat io
 
T/R
 
Technical Recommendation
 
TN
- C - S  
Terra 
(Ear th) 
Neut ral C ombined 
and 
Separate
d  
TTY
 
Teletype
 
TV
 
Television
 
UHF
 
Ult ra High Frequenc
y  
USB
 
Universal Serial Bus , 
or,
 
USB
 
Upper Sideband
 
UTC
 
C oordinated Univer sal Time
 
UV
 
Ult raviolet
 
VES
 
Voluntary Emergency Service
 
VFO
 
Var
iable Frequency Oscillator
 
VHF
 
Very High Frequency
 
VNA
 
Vector Network Analyser
 
VSWR
 
Voltage Standing Wave Rat io
 
WPM
 
Words per Minute
 
WSPR
 
Weak Signal Propagation Re-
porter`,
  `xxiii
 
F
OREWO RD
 
A
MATEUR RADIO
 
is a j ourney and not a destination. This journey can tak e a l ifetime 
to expl ore, and even then, you may well  ˇnd that you have onl y scratched the surface 
of this wonderful  hobby. To cram a l ifetime of a l earningexperienceinto one book 

would be impossib
l e, but what you have in your hands will open the gateway to your 
j ourney. For me, it started thirty years ago, and today I am still  fascinated with all  the 
technol og y and the friends that this hobby has brought my way. 
  
Not everybody has the same strengths or learns the same way. However, amateur 
radio has something for everyone. For exampl e, constructing a small  homemade 
radio, or an antenna, and contacting another operator hal fway around the worl d, 

k now
ing that it was your construction that made it happen, is a joy you will  never 
forget. D ecoding pictures from the space station, or sending your own TV signal s, 
are onl y some of the many possibil ities a orded to you when you obtain an amateur 
radio l icenc
e.
 
Rafal  
EILA
 
is an experienced instructor and a renowned speak er, with a career 
in so  ware and data science. Having recently tak en the amateur radio l icensing exam, 

he devel oped an appetite to understand every facet of the hobby. Whil e eager to assist 

others to succe
ed, Rafal  undertook the devel opment of what is now this Study Guide.
 
Although the title of this book implies it is used 
for 
studying 
for the Irish amateur 
radio station l icence, it is much more. I have no doubt that as you continue your 

j ourney you will  pick it up many times as a reference source. R afal, and his team at 

the National  Short Wave Listeners Cl ub have devel oped this guide over several  years 

while successfully teaching the course, monitoring students
™ 
understanding of the 
subj ects, improving , and simpl ifying thecontents to what you now hol d today. 
Evidence of the
ir hard work can be seen in the considerable number of successful 
candidates who have been j oining us on the airwaves.
 
I hope you will  ˇnd beneˇt in the many hours of research that has gone into this 
ˇne publ ication and j oin us to see where your j ourney will l ead
. 
Enda Broderick 
EI2II
 
President of the Irish Radio Transmitters S ociety`,
  `xxiv
 
A
CKNOWLEDGEMENTS
 
T
HE AUTHORS
 
would l ik e to thank the 
IRTS
 
for entrusting us with this project. 
We 
would l ik e to ack nowl edge the e orts of many other
s 
who have work ed on the 
previous versions of this guide, in particular Joe Ryan 
EIGY
, Paul  Martin 
EI CA
, 
l ate 
S ean Nol an 
EIC D
, and S éam
us McCague 
EI BP
.  
We 
woul d l ik e to 
thank 
Peter Zoll man 
G
DSE
 
for his diagrams, for 
suggestions 
rel ated to
 
el ectromagnetic ˇel d safety, and
 
for letting us re
-
use his work previously 
publ ished by the Radio S ociety of Great Britain
. 
We are grateful 
to  
Ian White 
GM SEK
 
for 
his very 
detail ed 
feedback
 
on 
radio 
safety
 
subjects, 
and
 
for contributing
 
a modern treatment of coaxial transmission 
lines
 
and antennas.
 
The autho rs 
woul d al so l ik e to thank the members of the 
ARRL
 
and
 
the
 
RSGB
 
for the
ir extensive feedback
, in particular Greg Lapin 
N	GL
, John Rogers 
M JAV
, 
Kai Siwiak 
K E
PT
, Matt B utcher 
KC  W D
, and Ric Tell  
K UJU
.  
We 
woul d l ik e to thank Adam Farson 
VAOJ
, Peter H art 
G SJX
, and Rob 
Sherwood 
NC  B
 
for providing a summary regarding the histor y of the transition 
from anal ogue to 
DSP
-
based signal  modul ation and demodul ation in commercially 
avail abl e 
transceivers
. 
Many 
radio amateurs
 
have provided helpful feedback on 
the 
dra 
s 
of this 
text
. 
The 
authors
 
would l ik e to 
thank 
Al bert White 
EIKO
, Chris Tran 
GM W OJ
, D ave 
Court 
EI IO
, D avid Sumner 
G PVH
, E nda B roderick 
EI II
, Fabian Kurz 
DJ CW
,  
John Ketch 
EI GN
,  
John Holl and 
EI ISB
, 
John Ronan 
EIIG
, Liam 
Mangan 
EI
GB
, Noel  Hammond 
ZRDX
, Roger Greengrass 
EI K N
, Reino 
Tal armo 
OH M A
, 
Simon Brown 
G
ELI
, 
and many others who have provided 
co mments, 
pu blicly, 
personall y
,  
or
 
anonymousl y.
 
We 
would al so l ik e to ack nowl edge John D evol dere 
ON
UN
 
and Mark 
D emeuleneere 
ON
W W
, authors of the 
IARU
 
Ethics a nd Operating Procedures for 
the Ra dio Amateur 
˚rd Ed. 
guide, 
on
 
which 
C
hapter
s
 
 
and 
˜ 
 
are
 
based.
 
We woul d l ik e to express our gratitude to all  the members of the National  Short 
Wave Listeners Club 
(
NSWLC
) 
who have review
ed
 
this guide
, with special thanks 
to Al an Har te, Bernard D ™S ouza 
E I LE
, 
Brendan O ™ D onovan, 
Brian McNall y 
EI LC
, 
Charl ie McCormack 
EI JJB
, 
D avid Norris 
EI JGB
, 
D avid O ™Fl ynn
, 
D iarmuid O™Briain 
EI
LF
, Eamonn Gannon 
EILC
, 
G err y Sweeny 
EIIFB
, 
Howie Freeman 
EI
JHB
, 
Joe Mo ll oy 
EI JVB
, 
John O ™ Neill
,  
ukasz Nal ask owsk i 
EI
JBB
, 
Marc Borri
, 
Megan Lorenz 
EI LA
, 
Mícheál  
Ó 
Raghall aigh 
EI LE
, 
Mik e 
Gri n 
EI LF
, 
Miguel Bernardez Curra
 
EI
J KB
, 
Paul  Lahert
, 
Paul  McL oughl in
, 
Paraic Nol an 
EI	IRB
,  
Ray Doyle 
EI JPB
,  
S andip S edhumadhavan
 
Nambiar
 
EIIJB
, 
S
é
bastien
 
Le Callonnec 
EI JZB
, Vl adimir Vavro 
EI
JC B
, 
S
tephen L ennon, 
and 
Steve
 
Kelly
 
EI JLB
 
for their 
detailed 
feedback while they were 
studying for their 
HAREC
. 
T
he 
IRTS
 
would al so l ik e to ack nowl edge and thank all its members and their 
a l iated cl ubs for their
 
continued 
support and 
assistance.`,
  `I
RTS 
HARE C
 
AM ATEUR 
RADIO 
STATION
 
LICENCE
 
S
tudy
 
Guid e`,
];


// === FROM ORIGINAL data.ts ===
// --- TYPE DEFINITIONS ---
export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

export interface FrequencyBand {
    band: string;
    freq: string;
    power: string;
    status: 'Primary' | 'Secondary';
    maritime: boolean;
    notes: string;
}

export interface FrequencyBandData {
  hf_primary: FrequencyBand[];
  hf_secondary: FrequencyBand[];
  vhf_uhf: FrequencyBand[];
}

export interface PageContent {
    page: number;
    text: string;
}

export interface Topic {
  title: string;
  content: string;
  quiz?: QuizQuestion[];
  extraData?: FrequencyBandData;
  studyGuideContent?: PageContent[];
}

export interface Module {
  title: string;
  icon: React.ElementType;
  topics: { [key: string]: Topic };
}

export const frequencyBands: FrequencyBandData = {
    hf_primary: [
      { band: "160m", freq: "1.810-1.850 MHz", power: "400W (26 dBW)", status: 'Primary', maritime: true, notes: "" },
      { band: "160m", freq: "1.850-2.000 MHz", power: "10W (10 dBW)", status: 'Primary', maritime: false, notes: "Land mobile also 10W" },
      { band: "80m", freq: "3.500-3.800 MHz", power: "400W (26 dBW)", status: 'Primary', maritime: true, notes: "" },
      { band: "40m", freq: "7.000-7.200 MHz", power: "400W (26 dBW)", status: 'Primary', maritime: true, notes: "" },
      { band: "20m", freq: "14.000-14.350 MHz", power: "400W (26 dBW)", status: 'Primary', maritime: true, notes: "" },
      { band: "17m", freq: "18.068-18.168 MHz", power: "400W (26 dBW)", status: 'Primary', maritime: true, notes: "No contests" },
      { band: "15m", freq: "21.000-21.450 MHz", power: "400W (26 dBW)", status: 'Primary', maritime: true, notes: "" },
      { band: "12m", freq: "24.890-24.990 MHz", power: "400W (26 dBW)", status: 'Primary', maritime: true, notes: "No contests" },
      { band: "10m", freq: "28.000-29.700 MHz", power: "400W (26 dBW)", status: 'Primary', maritime: true, notes: "" }
    ],
    hf_secondary: [
      { band: "2200m", freq: "135.7-137.8 kHz", power: "1W e.i.r.p.", status: 'Secondary', maritime: false, notes: "" },
      { band: "630m", freq: "472-479 kHz", power: "5W e.i.r.p.", status: 'Secondary', maritime: false, notes: "No interference to maritime/aero" },
      { band: "60m", freq: "5.3515-5.3665 MHz", power: "15W e.i.r.p.", status: 'Secondary', maritime: false, notes: "No contests. Plus spot frequencies." },
      { band: "30m", freq: "10.100-10.150 MHz", power: "400W (26 dBW)", status: 'Secondary', maritime: false, notes: "No contests. CW/Digi only." }
    ],
    vhf_uhf: [
      { band: "6m", freq: "50-52 MHz", power: "100W (20 dBW)", status: 'Secondary', maritime: false, notes: "" },
      { band: "4m", freq: "70.125-70.450 MHz", power: "50W / 25W Mobile", status: 'Secondary', maritime: false, notes: "" },
      { band: "2m", freq: "144-146 MHz", power: "400W (26 dBW)", status: 'Primary', maritime: true, notes: "" },
      { band: "70cm", freq: "430-440 MHz", power: "400W (26 dBW)", status: 'Primary', maritime: false, notes: "Lower power 430-432 MHz segment" }
    ],
};

const formatLicenceContent = (licence: LicenceType): string => {
  let content = `**Description**\n${licence.description}\n\n`;

  if (licence.requirements && licence.requirements.length > 0) {
    content += `**Requirements**\n`;
    content += licence.requirements.map(r => `- ${r}`).join('\n') + '\n\n';
  }

  if (licence.fee) {
    content += `**Fee**\n`;
    content += `- Standard: €${licence.fee.standard}\n`;
    if (licence.fee.reduced < licence.fee.standard) {
        content += `- Reduced: €${licence.fee.reduced} (${licence.fee.reducedConditions.join(', ')})\n\n`;
    } else {
        content += '\n';
    }
  }

  if (licence.steps && licence.steps.length > 0) {
    content += `**Application Steps**\n\n`;
    content += licence.steps.map((step, index) => {
      let stepContent = `**Step ${index + 1}: ${step.title}**\n${step.description}`;
      if (step.notes && step.notes.length > 0) {
        stepContent += '\n' + step.notes.map(n => `- *Note:* ${n}`).join('\n');
      }
      if (step.warnings && step.warnings.length > 0) {
        stepContent += '\n' + step.warnings.map(w => `- **Warning:** ${w}`).join('\n');
      }
      return stepContent;
    }).join('\n\n') + '\n\n';
  }

  if (licence.additionalInfo && licence.additionalInfo.length > 0) {
    content += `**Additional Info**\n`;
    content += licence.additionalInfo.map(info => `- ${info}`).join('\n');
  }

  return content;
};

const eLicensingTopics: { [key: string]: Topic } = {};

// Topic for General Process
eLicensingTopics['general-process'] = {
  title: 'General Application Process',
  content: 
    `**Overview**\n${eLicensingData.generalProcess.overview.map(s => `- ${s}`).join('\n')}\n\n` +
    `**Account Requirement**\n${eLicensingData.generalProcess.accountRequirement}\n\n` +
    `**Payment Methods**\n- ${eLicensingData.generalProcess.paymentMethods.join(', ')}\n\n` +
    `**Processing Note**\n${eLicensingData.generalProcess.processingNote}`
};

// Topic for Account Creation
eLicensingTopics['account-creation'] = {
    title: 'eLicensing Account Creation',
    content:
        `${eLicensingData.accountCreation.description}\n\n` +
        `**Account Types**\n${eLicensingData.accountCreation.accountTypes.map(s => `- ${s}`).join('\n')}\n\n` +
        `**Registration Steps**\n${eLicensingData.accountCreation.steps.map(s => `- ${s}`).join('\n')}`
};

// Topics for each Licence Type
eLicensingData.licenceTypes.forEach(licence => {
    eLicensingTopics[licence.name.toLowerCase().replace(/[\s/]+/g, '-')] = {
        title: licence.name,
        content: formatLicenceContent(licence),
    };
});

const eLicensingModule: Module = {
    title: 'eLicensing Guide',
    icon: Award,
    topics: eLicensingTopics,
};

const studyGuideModule: Module = {
    title: 'IRTS HAREC Study Guide',
    icon: BookMarked,
    topics: {
        'read': {
            title: 'Read the Full Study Guide',
            content: 'This is the complete IRTS HAREC Amateur Station Licence Study Guide, Fourth Edition. Use the pager below to navigate through the document.',
            studyGuideContent: studyGuideFullContent.map((text, index) => ({
                page: index + 1,
                text,
            })),
        }
    }
};

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
        ],
        extraData: frequencyBands
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
  },
  'eLicensing': eLicensingModule,
  'studyGuide': studyGuideModule,
};