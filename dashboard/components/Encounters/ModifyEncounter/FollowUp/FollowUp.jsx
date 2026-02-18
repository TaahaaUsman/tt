import { useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import FollowUpForm from './FollowUpSubSections/FollowUpForm';

const headerItems = [
  'Disease*',
  'Activity*',
  'Nutrition*',
  'Tobacco*',
  'Alcohol*',
  'Accident Injury*',
  'Family History',
  'Screenings',
];

const DataForFollowUpForm = {
  "Disease*": [
    {
      id: 1,
      question:
        "Do you frequently experience symptoms that interfere with daily functioning, and have these concerns persisted long enough to affect your overall physical or emotional well-being regularly?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    },
    {
      id: 2,
      question:
        "Have you recently noticed any recurring health issues that require medical attention or disrupt your normal routine over an extended period of time?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    },
    {
      id: 3,
      question:
        "Do you currently manage any chronic medical conditions that require medications, monitoring, or regular consultations with a healthcare professional?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    }
  ],

"Activity*": [
  {
    id: 1,
    question:
      "Do you engage in any type of physical activity that helps improve strength, flexibility, or stamina at least a few times during the week?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 2,
    question:
      "Do you feel your current activity level is enough to support healthy weight management, energy levels, and overall long-term physical wellness?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 3,
    question:
      "Do you experience barriers such as time constraints, stress, or physical discomfort that regularly prevent you from being physically active?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 4,
    question:
      "Do you take regular breaks from sitting, especially during work or long screen hours, to maintain healthy movement throughout the day?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 5,
    question:
      "Do you participate in moderate activities like brisk walking, cycling, or swimming that elevate your heart rate for at least 30 minutes most days?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 6,
    question:
      "Do you include strength-based exercises such as lifting weights, resistance training, or bodyweight workouts in your weekly routine for muscle health?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 7,
    question:
      "Do you feel motivated to remain physically active, or do you struggle with consistency due to lack of interest, energy, or planning?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 8,
    question:
      "Do you engage in any flexibility or mobility exercises such as stretching, yoga, or warm-up routines to support overall body movement and recovery?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 9,
    question:
      "Do you feel that your work environment or daily tasks contribute to physical inactivity, and does this affect your health or energy levels?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 10,
    question:
      "Do you track your physical activity through devices, apps, or manual logs to stay aware of your daily movement and progress?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 11,
    question:
      "Do you feel confident performing physical exercises safely, or do you avoid them due to lack of knowledge or fear of injury?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 12,
    question:
      "Do you participate in any outdoor activities such as hiking, jogging, or sports that contribute to your overall fitness and lifestyle?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 13,
    question:
      "Do you experience physical discomfort such as joint pain, fatigue, or stiffness that limits your ability to stay active regularly?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 14,
    question:
      "Do you follow any structured exercise routine, program, or class designed to improve your overall health, fitness, or athletic performance?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 15,
    question:
      "Do you set physical activity goals for yourself, such as step targets, workout frequency, or endurance improvement, and track progress over time?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  }
],

  "Nutrition*": [
    {
      id: 1,
      question:
        "Do you believe that your daily eating habits provide balanced nutrition, including adequate intake of proteins, fruits, vegetables, and whole grains?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    },
    {
      id: 2,
      question:
        "Do you frequently consume meals high in fats, sugars, or processed ingredients that may negatively affect your long-term health?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    },
    {
      id: 3,
      question:
        "Do you follow any specific dietary preferences or restrictions that influence your daily food choices and overall nutrition?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    },
    {
      id: 4,
      question:
        "Do you regularly track your calorie intake or monitor your portion sizes to maintain a healthy diet and lifestyle?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    }
  ],

  "Tobacco*": [
    {
      id: 1,
      question:
        "Do you currently use any tobacco products that may increase your risk of developing long-term respiratory or cardiovascular health conditions?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    },
    {
      id: 2,
      question:
        "If you smoke, do you feel that the frequency or quantity has increased or decreased significantly over recent months?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    },
    {
      id: 3,
      question:
        "Have you attempted to reduce or quit smoking in the past, and did you receive any support or guidance during that process?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    }
  ],

"Alcohol*": [
  {
    id: 1,
    question:
      "Do you consume alcoholic beverages regularly, and do you feel your drinking habits affect your overall health or interfere with your daily responsibilities or routines?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 2,
    question:
      "Do you often drink more alcohol than you originally planned, or experience difficulty controlling the amount you consume during social events or gatherings?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 3,
    question:
      "Have you experienced situations where alcohol consumption negatively impacted your mood, productivity, physical health, or personal relationships over short or long periods?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 4,
    question:
      "Do you ever use alcohol as a way to cope with stress, anxiety, pressure, or emotional challenges in your personal or professional life?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 5,
    question:
      "Have you noticed any physical symptoms such as headaches, fatigue, or sleep disturbances that seem to worsen when you consume alcohol frequently?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 6,
    question:
      "Do you ever feel guilty, concerned, or unsure about your drinking habits, or have others expressed worry regarding the amount you consume?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 7,
    question:
      "Do you continue drinking alcohol even when you feel it may be affecting your physical health, emotional well-being, or performance at work or home?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 8,
    question:
      "Have you ever attempted to reduce or stop drinking alcohol but found it difficult to maintain consistency or control over your habits long-term?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 9,
    question:
      "Do you sometimes experience memory lapses, blackouts, or difficulty recalling events after periods of drinking, even when consumption seemed moderate?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 10,
    question:
      "Do you frequently consume alcohol during meals, evenings, or weekends as part of your routine, or do you find yourself drinking more than intended?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 11,
    question:
      "Do you believe alcohol plays a significant role in your social life, and do you feel pressured to drink when around friends or colleagues?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  },
  {
    id: 12,
    question:
      "Have you ever experienced financial strain, health concerns, or conflicts due to alcohol use but continued drinking despite the negative consequences?",
    options: ["yes", "no", "U/A", "Un-Answer HRA"],
    history: ["120 - 9/2/2025", "118 - 8/2/2025"],
  }
],

  "Accident Injury*": [
    {
      id: 1,
      question:
        "Have you experienced any injuries or accidents recently that required medical attention or impacted your daily ability to function normally?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    },
    {
      id: 2,
      question:
        "Are you currently dealing with pain, discomfort, or physical limitations that have resulted from a previous accident or injury?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    },
    {
      id: 3,
      question:
        "Do you feel safe and comfortable in your daily environment, or have you noticed any factors that increase your risk of injury?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    }
  ],

  "Family History": [
    {
      id: 1,
      question:
        "Does anyone in your family have a history of chronic conditions such as heart disease, diabetes, or high blood pressure that may affect your health risk?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    },
    {
      id: 2,
      question:
        "Are you aware of any hereditary conditions in your family that might require regular monitoring or early preventive screenings?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    },
    {
      id: 3,
      question:
        "Has any close family member experienced serious medical conditions at an early age that could influence your own long-term health risks?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025", "118 - 8/2/2025"],
    }
  ],

  "Screenings": [
    {
      id: 1,
      question:
        "Have you completed any routine health screenings in the past year, such as blood tests or preventive examinations recommended for your age group?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["120 - 9/2/2025"],
    },
    {
      id: 2,
      question:
        "Do you regularly schedule medical checkups to monitor your health even when you do not experience noticeable symptoms or concerns?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["118 - 8/2/2025"],
    },
    {
      id: 3,
      question:
        "Have you ever delayed recommended screenings due to fear, lack of time, or uncertainty about their importance for long-term health?",
      options: ["yes", "no", "U/A", "Un-Answer HRA"],
      history: ["118 - 8/2/2025"],
    }
  ]
};




function SegmentedHeader() {
  const [data, setData] = useState([]);
  const [activeKey, setActiveKey] = useState(headerItems[0]);

  // Handler function for when a tab is clicked
  const handleSelect = (key) => {
    setActiveKey(key);
    // In a real app, you would use 'key' here to render the corresponding component
    // Example: setContent(<YourComponent key={key} />)
  };

  // Calculate current index and position flags
  const currentIndex = headerItems.indexOf(activeKey);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === headerItems.length - 1;

  return (
    <>
      <div className="segmented-header-container">
        <Tab.Container activeKey={activeKey} onSelect={handleSelect}>
          <Nav variant="pills" className="segmented-nav">
            {headerItems.map((item, index) => (
              <Nav.Item key={index} className="segmented-nav-item">
                <Nav.Link eventKey={item}>
                  {item}
                  {/* Conditionally render the blue underline */}
                  {activeKey === item && <div className="active-underline"></div>}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Tab.Container>
      </div>
      <FollowUpForm
        data={DataForFollowUpForm[activeKey] || []}
        isFirst={isFirst}
        isLast={isLast}
      />
    </>
  );
}

export default SegmentedHeader;
