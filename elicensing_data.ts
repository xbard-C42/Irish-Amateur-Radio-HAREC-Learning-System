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

export default eLicensingData;