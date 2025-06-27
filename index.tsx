import { createRoot } from 'react-dom/client';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  ChevronRight, ChevronDown, BookOpen, Radio, Zap, LifeBuoy, FileText, 
  CheckCircle2, Circle, ArrowRight, Target, X, RotateCw, Search, Bookmark,
  Menu, Settings, Award, Download, Moon, Sun, Maximize2, Minimize2, Sparkles, Send, Bot, LoaderCircle
} from 'lucide-react';
import { learningModules, frequencyBands, type Topic, type QuizQuestion, type Module, type FrequencyBand } from './data';
import { eLicensingData, type LicenceType, type LicenceStep } from './elicensing_data';


// Enhanced UI Components
const ModuleOverview: React.FC<{
  moduleKey: string; 
  module: Module; 
  onTopicSelect: (key: string) => void;
  completedTopics: Set<string>;
  searchTerm: string;
}> = ({ moduleKey, module, onTopicSelect, completedTopics, searchTerm }) => {
  const filteredTopics = useMemo(() => {
    if (!searchTerm) return Object.entries(module.topics);
    return Object.entries(module.topics).filter(([, topic]) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [module.topics, searchTerm]);

  const completedCount = Object.keys(module.topics).filter(topicKey => 
    completedTopics.has(`${moduleKey}-${topicKey}`)
  ).length;

  return (
    <div className="card animate-fade-in">
      <div className="card-body">
        <div className="flex items-center space-x-4 mb-6">
          <module.icon className="w-10 h-10 text-blue-500" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-balance">{module.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">
              {completedCount}/{Object.keys(module.topics).length} topics completed
            </p>
          </div>
          <div className="text-right">
            <div className="progress-bar w-24">
              <div 
                className="progress-fill"
                style={{ width: `${(completedCount / Object.keys(module.topics).length) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredTopics.map(([topicKey, topic]) => {
            const isCompleted = completedTopics.has(`${moduleKey}-${topicKey}`);
            return (
              <button 
                key={topicKey} 
                onClick={() => onTopicSelect(`${moduleKey}-${topicKey}`)}
                className="w-full text-left flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:focus"
                aria-label={`Start topic: ${topic.title}`}
              >
                <div className="flex items-center space-x-4">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{topic.title}</span>
                    {topic.quiz && (
                      <div className="text-xs text-purple-600 dark:text-purple-400">
                        {topic.quiz.length} quiz questions
                      </div>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </div>
        
        {filteredTopics.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500">
            No topics found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

const renderContent = (content: string) => {
  return content.split('\n\n').map((paragraph, i) => {
    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
      return <h4 key={i} className="font-bold text-lg mt-4 mb-2 text-gray-900 dark:text-gray-100">{paragraph.slice(2, -2)}</h4>;
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
        <table className="frequency-table w-full text-sm">
          <thead>
            <tr>
              <th>Band</th>
              <th>Frequency</th>
              <th>Max Power</th>
              <th>Status</th>
              <th>Maritime</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {bands.map((band, index) => (
              <tr key={index}>
                <td className="font-medium">{band.band}</td>
                <td>{band.freq}</td>
                <td>{band.power}</td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    band.status === 'Primary' ? 'status-primary' : 'status-secondary'
                  }`}>
                    {band.status}
                  </span>
                </td>
                <td className="text-center">
                  {band.maritime ? '✓' : '✗'}
                </td>
                <td className="text-xs">{band.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TopicContent: React.FC<{ 
  moduleKey: string; 
  topicKey: string; 
  topic: Topic; 
  onComplete: () => void; 
  onStartQuiz: (quizKey: string) => void;
  isCompleted: boolean;
  onBookmark: (topicId: string) => void;
  isBookmarked: boolean;
}> = ({ moduleKey, topicKey, topic, onComplete, onStartQuiz, isCompleted, onBookmark, isBookmarked }) => {
  const isFreqTopic = topicKey === 'frequency-bands';
  const topicId = `${moduleKey}-${topicKey}`;

  return (
    <div className="card animate-fade-in">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-balance">{topic.title}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onBookmark(topicId)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-400' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this topic'}
            >
              <Bookmark className="w-4 h-4" />
            </button>
            {isCompleted && (
              <div className="flex items-center space-x-1 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="prose-enhanced mb-6">
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
              onClick={() => onStartQuiz(topicId)}
              className="btn-purple flex items-center space-x-2"
            >
              <Target className="w-4 h-4" />
              <span>Topic Quiz ({topic.quiz.length} questions)</span>
            </button>
          )}
          
          <button 
            onClick={onComplete}
            className={`btn-success flex items-center space-x-2 ml-auto ${
              isCompleted ? 'opacity-75' : ''
            }`}
          >
            <span>{isCompleted ? 'Mark Complete Again' : 'Mark Complete & Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const QuizView: React.FC<{ 
  quizKey: string; 
  onExit: () => void;
  onComplete: (score: number, total: number) => void;
}> = ({ quizKey, onExit, onComplete }) => {
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
    const score = getScore();
    onComplete(score, questions.length);
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

  const score = showResults ? getScore() : 0;
  const percentage = showResults ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="card animate-fade-in">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">{topic.title} - Quiz</h3>
          <button 
            onClick={onExit} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded focus-visible:focus"
            aria-label="Close quiz"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="border-b dark:border-gray-700 pb-4 last:border-b-0">
              <p className="font-semibold mb-3">{qIndex + 1}. {q.q}</p>
              <div className="space-y-2">
                {q.options.map((option, oIndex) => {
                  const isSelected = quizAnswers[qIndex] === oIndex;
                  const isCorrect = q.correct === oIndex;
                  let classes = 'p-3 border rounded-lg cursor-pointer transition-colors w-full text-left ';
                  
                  if (showResults) {
                    if (isCorrect) {
                      classes += 'quiz-correct';
                    } else if (isSelected && !isCorrect) {
                      classes += 'quiz-incorrect';
                    } else {
                      classes += 'quiz-neutral';
                    }
                  } else {
                    if (isSelected) {
                      classes += 'quiz-selected';
                    } else {
                      classes += 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700';
                    }
                  }
                  
                  return (
                    <button 
                      key={oIndex} 
                      onClick={() => handleAnswer(qIndex, oIndex)} 
                      className={`${classes} focus-visible:focus`}
                      disabled={showResults}
                      aria-label={`Option ${oIndex + 1}: ${option}`}
                    >
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
              <div className="flex items-center space-x-4">
                <div className="text-xl font-bold">
                  Score: {score}/{questions.length} ({percentage}%)
                </div>
                <div className={`text-sm px-2 py-1 rounded ${
                  percentage >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                  percentage >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                }`}>
                  {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good' : 'Study more'}
                </div>
              </div>
              <button 
                onClick={handleRetry} 
                className="btn-primary flex items-center space-x-2"
              >
                <RotateCw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
            </>
          ) : (
            <button 
              onClick={handleSubmit} 
              disabled={Object.keys(quizAnswers).length !== questions.length} 
              className="btn-success flex items-center space-x-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Submit Answers</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// eLicensing Guide Components
const AccordionItem: React.FC<{
    title: string;
    isOpen: boolean;
    onClick: () => void;
    children: React.ReactNode;
}> = ({ title, isOpen, onClick, children }) => (
    <div className="border-b dark:border-gray-700">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center p-4 text-left font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700/50"
            aria-expanded={isOpen}
        >
            <span>{title}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 animate-fade-in-fast">
                {children}
            </div>
        )}
    </div>
);

const ELicensingGuide: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);

    const toggleAccordion = (name: string) => {
        setOpenAccordion(openAccordion === name ? null : name);
    };

    const renderStep = (step: LicenceStep, index: number) => (
        <div key={index} className="mb-3 pl-6 relative">
            <div className="absolute left-0 top-1 w-4 h-4 bg-blue-500 rounded-full text-white flex items-center justify-center text-xs font-bold">{index + 1}</div>
            <h5 className="font-semibold">{step.title}</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
            {step.notes && (
                <ul className="list-disc pl-5 mt-1 text-xs text-gray-500">
                    {step.notes.map((note, i) => <li key={i}>{note}</li>)}
                </ul>
            )}
            {step.warnings && (
                 <div className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-300 text-sm">
                    {step.warnings.map((warning, i) => <p key={i}>{warning}</p>)}
                </div>
            )}
        </div>
    );

    return (
        <div className="card animate-fade-in">
            <div className="card-body">
                <div className="text-center mb-6">
                     <Award className="w-12 h-12 mx-auto text-purple-500 mb-2" />
                    <h3 className="text-3xl font-bold text-balance">{eLicensingData.systemInfo.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400">An official guide from {eLicensingData.systemInfo.authority}</p>
                </div>

                <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <h4 className="font-bold text-xl mb-2 text-blue-800 dark:text-blue-300">General Process</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        {eLicensingData.generalProcess.overview.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    <p className="mt-3 text-sm italic">{eLicensingData.generalProcess.accountRequirement}</p>
                </div>

                <h4 className="font-bold text-2xl mb-4 text-center">Licence Application Guides</h4>
                <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
                    {eLicensingData.licenceTypes.map((licence) => (
                        <AccordionItem
                            key={licence.name}
                            title={licence.name}
                            isOpen={openAccordion === licence.name}
                            onClick={() => toggleAccordion(licence.name)}
                        >
                            <p className="mb-4 italic">{licence.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h5 className="font-semibold text-md mb-2">Requirements</h5>
                                    <ul className="list-disc pl-5 space-y-1 text-sm">
                                        {licence.requirements.map((req, i) => <li key={i}>{req}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-md mb-2">Fees</h5>
                                    <p className="text-sm">Standard: <span className="font-bold">€{licence.fee.standard}</span></p>
                                    {licence.fee.reduced < licence.fee.standard && (
                                        <>
                                            <p className="text-sm">Reduced: <span className="font-bold">€{licence.fee.reduced}</span></p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">({licence.fee.reducedConditions.join(' or ')})</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            
                            <h5 className="font-semibold text-md mt-6 mb-3">Application Steps</h5>
                            <div className="space-y-4">
                                {licence.steps.map(renderStep)}
                            </div>
                            {licence.additionalInfo && (
                                 <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-900/40 rounded-md text-sm">
                                    <h6 className="font-semibold mb-1">Additional Information</h6>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {licence.additionalInfo.map((info, i) => <li key={i}>{info}</li>)}
                                    </ul>
                                </div>
                            )}
                        </AccordionItem>
                    ))}
                </div>
            </div>
        </div>
    );
};

// AI Chat Component
const AIChatView: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  messages: { role: 'user' | 'model'; text: string }[];
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  currentTopicTitle: string | null;
}> = ({ isOpen, onClose, messages, onSendMessage, isLoading, currentTopicTitle }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };
  
  const renderAiMessage = (text: string) => {
    const html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-900 rounded px-1 py-0.5 text-sm">$1</code>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/(\<li.*\<\/li\>)+/gs, '<ul>$&</ul>');

    return <div dangerouslySetInnerHTML={{ __html: html.replace(/\n/g, '<br />') }} />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in-fast" onClick={onClose}>
      <div className="chat-container" onClick={e => e.stopPropagation()}>
        <div className="chat-header">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="font-bold text-lg">HAREC AI Study Buddy</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentTopicTitle ? `Context: ${currentTopicTitle}` : 'General Questions'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close chat">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.role}`}>
              {msg.role === 'model' && <Bot className="w-6 h-6 flex-shrink-0 text-blue-500" />}
              <div className={`chat-bubble ${msg.role}`}>
                {renderAiMessage(msg.text)}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="chat-message model">
                <Bot className="w-6 h-6 flex-shrink-0 text-blue-500" />
                <div className="chat-bubble model">
                   <LoaderCircle className="w-5 h-5 animate-spin" />
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="chat-input"
            disabled={isLoading}
          />
          <button onClick={handleSend} className="chat-send-btn" disabled={isLoading || !input.trim()}>
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};


// Main App Component
const IrishAmateurRadioHARECApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(
    () => new Set(JSON.parse(localStorage.getItem('completedTopics') || '[]'))
  );
  const [bookmarkedTopics, setBookmarkedTopics] = useState<Set<string>>(
    () => new Set(JSON.parse(localStorage.getItem('bookmarkedTopics') || '[]'))
  );
  const [currentQuiz, setCurrentQuiz] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [quizScores, setQuizScores] = useState<{ [key: string]: { score: number; total: number; date: Date } }>(
    () => JSON.parse(localStorage.getItem('quizScores') || '{}')
  );

  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const ai = useMemo(() => new GoogleGenAI({apiKey: process.env.API_KEY}), []);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('completedTopics', JSON.stringify([...completedTopics]));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('bookmarkedTopics', JSON.stringify([...bookmarkedTopics]));
  }, [bookmarkedTopics]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('quizScores', JSON.stringify(quizScores));
  }, [quizScores]);

  const handleTopicComplete = useCallback((moduleKey: string, topicKey: string) => {
    const newCompleted = new Set(completedTopics);
    newCompleted.add(`${moduleKey}-${topicKey}`);
    setCompletedTopics(newCompleted);
    
    const nextTopic = getNextTopic(moduleKey, topicKey);
    if (nextTopic) {
      setActiveSection(`${nextTopic.moduleKey}-${nextTopic.topicKey}`);
    } else {
      setActiveSection('overview');
    }
  }, [completedTopics]);

  const handleBookmark = useCallback((topicId: string) => {
    const newBookmarks = new Set(bookmarkedTopics);
    if (newBookmarks.has(topicId)) {
      newBookmarks.delete(topicId);
    } else {
      newBookmarks.add(topicId);
    }
    setBookmarkedTopics(newBookmarks);
  }, [bookmarkedTopics]);

  const handleQuizComplete = useCallback((quizKey: string, score: number, total: number) => {
    setQuizScores(prev => ({
      ...prev,
      [quizKey]: { score, total, date: new Date() }
    }));
  }, []);

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
  
  const handleOpenChat = useCallback(async () => {
    let systemInstruction = "You are a friendly and expert tutor for the Irish HAREC amateur radio exam. Your name is 'EI-AI'. Explain concepts clearly, concisely, and accurately based on the provided study material. If a question is outside the scope of amateur radio, politely decline to answer.";
    
    let topicTitle: string | null = null;

    if (activeSection.includes('-')) {
        const [moduleKey, topicKey] = activeSection.split('-');
        const topic = learningModules[moduleKey]?.topics?.[topicKey];
        if (topic) {
            topicTitle = topic.title;
            systemInstruction += `\n\nThe user is currently studying the topic "${topic.title}". Use the following content as primary context for your answers:\n\n${topic.content}`;
        }
    }
    
    const newChat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash-preview-04-17',
        config: { systemInstruction },
    });
    setChatSession(newChat);

    const welcomeMessage = `Hello! I'm your AI Study Buddy. Ask me anything about ${topicTitle ? `"${topicTitle}" or other HAREC topics!` : 'the HAREC syllabus!'}`;
    setChatMessages([{ role: 'model', text: welcomeMessage }]);
    setIsChatOpen(true);
  }, [ai, activeSection]);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!chatSession) return;

    setChatMessages(prev => [...prev, { role: 'user', text: message }]);
    setIsAiLoading(true);

    try {
        const response: GenerateContentResponse = await chatSession.sendMessage({ message });
        const aiResponseText = response.text;
        
        if (aiResponseText) {
            setChatMessages(prev => [...prev, { role: 'model', text: aiResponseText }]);
        } else {
            setChatMessages(prev => [...prev, { role: 'model', text: "Sorry, I couldn't generate a response. Please try again." }]);
        }
    } catch (error) {
        console.error("Gemini API error:", error);
        setChatMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
        setIsAiLoading(false);
    }
  }, [chatSession]);

  const getCurrentTopicTitle = () => {
    if (activeSection.includes('-')) {
        const [moduleKey, topicKey] = activeSection.split('-');
        return learningModules[moduleKey]?.topics?.[topicKey]?.title || null;
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
      return (
        <QuizView 
          quizKey={currentQuiz} 
          onExit={() => setCurrentQuiz(null)} 
          onComplete={(score, total) => handleQuizComplete(currentQuiz, score, total)}
        />
      );
    }
    
    if (activeSection.includes('-')) {
      const [moduleKey, topicKey] = activeSection.split('-');
      const topic = learningModules[moduleKey]?.topics?.[topicKey];
      if (topic) {
        if (topic.elicensingGuide) {
            return <ELicensingGuide />;
        }
        const topicId = `${moduleKey}-${topicKey}`;
        return (
          <TopicContent 
            moduleKey={moduleKey} 
            topicKey={topicKey} 
            topic={topic} 
            onComplete={() => handleTopicComplete(moduleKey, topicKey)} 
            onStartQuiz={setCurrentQuiz}
            isCompleted={completedTopics.has(topicId)}
            onBookmark={handleBookmark}
            isBookmarked={bookmarkedTopics.has(topicId)}
          />
        );
      }
    }

    const module = learningModules[activeSection];
    if (module) {
      return (
        <ModuleOverview 
          moduleKey={activeSection} 
          module={module} 
          onTopicSelect={setActiveSection}
          completedTopics={completedTopics}
          searchTerm={searchTerm}
        />
      );
    }
    
    return (
      <div className="card text-center animate-fade-in">
        <div className="card-body p-8">
          <BookOpen className="w-16 h-16 mx-auto text-blue-400 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Welcome to Your HAREC Study Hub</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Complete preparation for the Irish Amateur Radio Licence examination.</p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(learningModules).map(([moduleKey, module]) => {
              const ModuleIcon = module.icon;
              const topicCount = Object.keys(module.topics).length;
              const completedCount = Object.keys(module.topics).filter(topicKey => 
                completedTopics.has(`${moduleKey}-${topicKey}`)
              ).length;
              
              return (
                <div key={moduleKey} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <ModuleIcon className="w-6 h-6 text-blue-600" />
                    <h3 className="font-bold text-sm">{module.title}</h3>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {completedCount}/{topicCount} topics completed
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(completedCount/topicCount)*100}%` }}
                    />
                  </div>
                  <button
                    onClick={() => setActiveSection(moduleKey)}
                    className="w-full mt-3 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Start Learning
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 font-sans text-gray-900 dark:text-gray-100">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-3 focus:m-3 bg-blue-600 text-white rounded-lg">Skip to main content</a>
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Radio className="w-8 h-8 text-blue-500"/>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Irish Amateur Radio HAREC Learning System</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">Complete study guide for ComReg amateur radio licensing</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 text-sm border rounded-lg bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Progress</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">{calculateOverallProgress()}%</div>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className={`lg:col-span-1 ${sidebarCollapsed ? 'hidden' : 'block'} lg:block`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-4 sticky top-24">
              <h2 className="font-bold text-gray-800 dark:text-gray-200 text-lg mb-4 px-2">Learning Modules</h2>
              
              {/* Mobile search */}
              <div className="sm:hidden mb-4">
                <div className="flex items-center space-x-2 px-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
              
              <nav className="space-y-1" role="navigation">
                {Object.entries(learningModules).map(([moduleKey, module]) => {
                  const ModuleIcon = module.icon;
                  const isModuleActive = activeSection === moduleKey;
                  const isTopicActive = activeSection.startsWith(`${moduleKey}-`);
                  const isExpanded = isModuleActive || isTopicActive;

                  const moduleCompleted = Object.keys(module.topics).every(topicKey => 
                    completedTopics.has(`${moduleKey}-${topicKey}`)
                  );

                  return (
                    <div key={moduleKey}>
                      <button 
                        onClick={() => setActiveSection(moduleKey)} 
                        className={`nav-item w-full justify-between ${
                          isModuleActive ? 'nav-item-active' : 'nav-item-hover'
                        }`}
                        aria-expanded={isExpanded}
                      >
                        <div className="flex items-center space-x-3">
                          <ModuleIcon className="w-5 h-5 text-blue-500"/>
                          <span className="font-semibold">{module.title}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {moduleCompleted && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                          <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="pl-6 pt-2 pb-2 border-l-2 border-gray-200 dark:border-gray-700 ml-5 my-1 space-y-1 animate-fade-in-fast">
                          {Object.entries(module.topics).map(([topicKey, topic]) => {
                            const topicId = `${moduleKey}-${topicKey}`;
                            const isCompleted = completedTopics.has(topicId);
                            const isBookmarked = bookmarkedTopics.has(topicId);
                            const isActive = activeSection === topicId;
                            
                            return (
                              <button 
                                key={topicKey} 
                                onClick={() => setActiveSection(topicId)} 
                                className={`w-full text-left flex items-center space-x-3 p-2 text-sm rounded-md transition-colors ${
                                  isActive 
                                    ? 'bg-blue-50 text-blue-800 font-medium dark:bg-blue-900/50 dark:text-blue-300' 
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                }`}
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600"/>
                                )}
                                <span className="flex-1">{topic.title}</span>
                                {isBookmarked && <Bookmark className="w-3 h-3 text-yellow-500" />}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderMainContent()}
          </div>
        </div>
      </main>

      <button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-transform hover:scale-110 focus-visible:focus z-20"
        aria-label="Open AI Study Buddy"
        >
        <Sparkles className="w-6 h-6" />
      </button>

      <AIChatView
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
        isLoading={isAiLoading}
        currentTopicTitle={getCurrentTopicTitle()}
      />

    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <IrishAmateurRadioHARECApp />
    </React.StrictMode>
  );
}