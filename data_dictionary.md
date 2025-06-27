**Study Guide Data Dictionary**

This dictionary outlines each field in the `IRTS_HAREC_Amateur_Station_Licence_Study_Guide_data.ts` dataset, standardizing the terminology for developers and contributors.

| Field Name           | Type     | Description                                                           |
|----------------------|----------|-----------------------------------------------------------------------|
| `modules`            | array    | Collection of study modules.                                          |
| `modules[].id`       | `string` | Unique identifier for each module.                                    |
| `modules[].title`    | `string` | Title of the study module.                                            |
| `modules[].description` | `string` | Brief overview of module content.                                     |
| `modules[].content`  | `string` | Main text or HTML content for the module.                             |
| `modules[].quizQuestions` | array    | List of quiz questions associated with the module.                     |
| `modules[].quizQuestions[].id` | `string` | Unique identifier for a quiz question.                                |
| `modules[].quizQuestions[].question` | `string` | Quiz question text.                                                     |
| `modules[].quizQuestions[].options` | `string[]` | Available answer choices.                                             |
| `modules[].quizQuestions[].correctAnswerIndex` | `number` | Index of the correct option (0-based).                                |
| `frequencyBands`     | array    | Frequency band ranges for chart visualization.                       |
| `frequencyBands[].band` | `string` | Label for the frequency band (e.g., "3.5 MHz").                       |
| `frequencyBands[].lowerMHz` | `number` | Lower bound of the band in MHz.                                        |
| `frequencyBands[].upperMHz` | `number` | Upper bound of the band in MHz.                                        |

This dictionary ensures consistent use across the codebase and documentation. Feel free to suggest additions or modifications as needed.

