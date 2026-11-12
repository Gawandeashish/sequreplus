
export type GuideMedia =
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; src: string; title: string }
  | { type: "download"; href: string; label: string; fileType?: string };

export type InstallationStep = {
  id: string;
  number?: number;
  title: string;
  description?: string;
  instructions: string[];
  checklist?: string[];
  tip?: string;
  note?: string;
  image?: string;
  video?: string;
  command?: string;
  commands?: string[];
  media?: GuideMedia[];
};

export type SmsCommand = {
  label: string;
  command: string;
  description?: string;
};

export type SmsCommandGroup = {
  id: string;
  title: string;
  description?: string;
  commands: SmsCommand[];
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type WirelessGuide = {
  gettingStarted: {
    requirements: string[];
    preparation: string[];
  };
  steps: InstallationStep[];
  deviceManagement: SmsCommandGroup[];
  sensorPlacement: {
    title: string;
    points: string[];
    image?: string;
    video?: string;
  }[];
  maintenance: {
    title: string;
    points: string[];
  }[];
  faqs: GuideFaq[];
  media: GuideMedia[];
};
