
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Radio, Zap, LifeBuoy, FileText, CheckCircle2, Circle, ArrowRight, Target, X, RotateCw, Cog, Save, Award, BookMarked, Sparkles } from 'lucide-react';
import { learningModules, Module, Topic, FrequencyBand, PageContent } from './data';
import { AccessibilityProvider, useAccessibility } from './src/AccessibilityContext';
import { useAutoSave } from './src/useAutoSave';

// --- C42 SDK Integration ---
interface C42_SDK {
    version: string;
    subscribe: (event: 'theme_change' | 'language_change', callback: (payload: any) => void) => void;
    request: (action: 'generate_response', payload: { topic: string }) => Promise<{ text: string }>;
}
declare global {
    interface Window {
        C42_SDK?: C42_SDK;
    }
}


// --- UI Components ---

const MotivatingProgress: React.FC<{current: number, total: number}> = ({ current, total }) => {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    const isNearCompletion = percentage > 85;
    const isStarted = percentage > 0;

    let message = `Progress: ${Math.round(percentage)}%`;
    if (isStarted && percentage < 100) {
        if (isNearCompletion) {
            message = `Almost there! Keep going!`;
        } else {
            message = `Great progress! Keep it up!`;
        }
    } else if (percentage >= 100) {
        message = `Congratulations! All complete!`;
    }

    return (
        <div className="w-48">
            <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
                <span aria-live="polite">{message}</span>
                <span>{Math.round(percentage)}%</span>
            </div>
            <div className="w-full bg-[var(--color-input)] rounded-full h-2.5 mt-1" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
                <div className="bg-[var(--color-primary)] h-2.5 rounded-full transition-all" style={{width: `${percentage}%`}}></div>
            </div>
        </div>
    );
};


const ModuleOverview: React.FC<{moduleKey: string, module: Module, onTopicSelect: (key: string) => void}> = ({moduleKey, module, onTopicSelect}) => {
    const { state } = useAccessibility();
    return (
    <div className="bg-[var(--color-foreground)] rounded-lg border border-[var(--color-border)] p-6 animate-fade-in">
      <div className="flex items-center space-x-4 mb-6">
        {!state.simplifiedUI && <module.icon className="w-10 h-10 text-[var(--color-primary)] decorative-icon" />}
        <div>
          <h2 className="text-2xl font-bold">{module.title}</h2>
          <p className="text-[var(--color-text-muted)]">Select a topic to begin your study.</p>
        </div>
      </div>
      <div className="space-y-3">
        {Object.entries(module.topics).map(([topicKey, topic]) => (
          <button 
            key={topicKey} 
            onClick={() => onTopicSelect(`${moduleKey}-${topicKey}`)}
            className="w-full text-left flex items-center justify-between p-4 rounded-lg bg-[var(--color-input)] hover:bg-[var(--color-input-hover)] transition-colors"
          >
            <div className="flex items-center space-x-4">
              <span className="font-medium text-[var(--color-text)]">{topic.title}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)]" />
          </button>
        ))}
      </div>
    </div>
)};

const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, i) => {
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
            return <h4 key={i} className="font-bold text-lg mt-4 mb-2">{paragraph.slice(2, -2)}</h4>;
        }
        if (paragraph.startsWith('- ')) {
            return (
              <ul key={i} className="list-disc pl-5 my-4 space-y-1">
                {paragraph.split('\n').map((item, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: item.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
                ))}
              </ul>
            );
        }
        return (
            <p key={i} className="mb-4" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
        );
    });
};

const renderFrequencyTable = (bands: FrequencyBand[], title: string) => {
    return (
      <div className="my-6">
        <h4 className="font-bold text-lg mb-3">{title}</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[var(--color-border)] text-sm">
            <thead>
              <tr className="bg-[var(--color-input)]">
                <th className="border border-[var(--color-border)] px-3 py-2 text-left">Band</th>
                <th className="border border-[var(--color-border)] px-3 py-2 text-left">Frequency</th>
                <th className="border border-[var(--color-border)] px-3 py-2 text-left">Max Power</th>
                <th className="border border-[var(--color-border)] px-3 py-2 text-left">Status</th>
                <th className="border border-[var(--color-border)] px-3 py-2 text-left">Maritime</th>
                <th className="border border-[var(--color-border)] px-3 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {bands.map((band, index) => (
                <tr key={index} className="hover:bg-[var(--color-input-hover)]">
                  <td className="border border-[var(--color-border)] px-3 py-2 font-medium">{band.band}</td>
                  <td className="border border-[var(--color-border)] px-3 py-2">{band.freq}</td>
                  <td className="border border-[var(--color-border)] px-3 py-2">{band.power}</td>
                  <td className="border border-[var(--color-border)] px-3 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      band.status === 'Primary' 
                        ? 'bg-[var(--color-success-bg-light)] text-[var(--color-success-text)]' 
                        : 'bg-[var(--color-warning-bg-light)] text-[var(--color-warning-text)]'
                    }`}>
                      {band.status}
                    </span>
                  </td>
                  <td className="border border-[var(--color-border)] px-3 py-2 text-center">
                    {band.maritime ? '✓' : '✗'}
                  </td>
                  <td className="border border-[var(--color-border)] px-3 py-2 text-xs">{band.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};


const TopicContent: React.FC<{ moduleKey: string, topicKey: string, topic: Topic, onComplete: () => void, onStartQuiz: (quizKey: string) => void, onExplain: (title: string, content: string) => void, isSdkAvailable: boolean }> = ({ moduleKey, topicKey, topic, onComplete, onStartQuiz, onExplain, isSdkAvailable }) => {
    const isFreqTopic = topicKey === 'frequency-bands';
    const { state } = useAccessibility();
    const readingStyle = {
      fontSize: state.readingSettings.fontSize === 'large' ? '1.125rem' : '1rem',
      lineHeight: state.readingSettings.lineHeight === 'relaxed' ? '1.8' : '1.6',
      letterSpacing: state.readingSettings.letterSpacing === 'wide' ? '0.05em' : 'normal',
    };

    return (
        <div className="bg-[var(--color-foreground)] rounded-lg border border-[var(--color-border)] p-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">{topic.title}</h3>
            <div className="prose prose-blue dark:prose-invert max-w-none mb-6 text-[var(--color-text)]" style={readingStyle}>
                {renderContent(topic.content)}
                {isFreqTopic && topic.extraData && (
                    <div className="mt-8 not-prose">
                        {renderFrequencyTable(topic.extraData.hf_primary, "HF Bands - Primary Allocation")}
                        {renderFrequencyTable(topic.extraData.hf_secondary, "HF Bands - Secondary Allocation")}
                        {renderFrequencyTable(topic.extraData.vhf_uhf, "VHF/UHF Bands")}
                    </div>
                )}
            </div>
            <div className="border-t border-[var(--color-border)] pt-4 flex justify-between items-center flex-wrap gap-2">
                 <div className="flex items-center gap-2">
                    {isSdkAvailable && topic.content && (
                        <button
                            onClick={() => onExplain(topic.title, topic.content)}
                            className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-80 transition-opacity"
                            aria-label={`Explain ${topic.title} with AI`}
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Explain with AI</span>
                        </button>
                    )}
                    {topic.quiz && (
                        <button
                            onClick={() => onStartQuiz(`${moduleKey}-${topicKey}`)}
                            className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-purple)] text-white rounded-lg hover:bg-[var(--color-purple-hover)] transition-colors"
                        >
                            <Target className="w-4 h-4" />
                            <span>Topic Quiz</span>
                        </button>
                    )}
                </div>
                <button 
                    onClick={onComplete}
                    className="flex items-center space-x-2 px-5 py-2 bg-[var(--color-success)] text-white rounded-lg hover:opacity-80 transition-opacity ml-auto">
                    <span>Mark Complete & Next Topic</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

const QuizView: React.FC<{ quizKey: string, onExit: () => void }> = ({ quizKey, onExit }) => {
    const [moduleKey, ...topicKeyParts] = quizKey.split('-');
    const topicKey = topicKeyParts.join('-');
    const topic = learningModules[moduleKey]?.topics[topicKey];
    const questions = topic?.quiz || [];

    const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>(() => {
        try {
            const savedAnswers = localStorage.getItem(`quiz-${quizKey}`);
            return savedAnswers ? JSON.parse(savedAnswers) : {};
        } catch {
            return {};
        }
    });
    const [showResults, setShowResults] = useState(false);
    const { state } = useAccessibility();

    const saveAnswers = useCallback(async (answers: typeof quizAnswers) => {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                try {
                    localStorage.setItem(`quiz-${quizKey}`, JSON.stringify(answers));
                } catch (error) {
                    console.error("Failed to save quiz answers:", error);
                }
                resolve();
            }, 500); // Simulate network delay
        });
    }, [quizKey]);

    const { isSaving, lastSaved } = useAutoSave(quizAnswers, saveAnswers, state.autoSaveFrequency);

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
        localStorage.removeItem(`quiz-${quizKey}`);
    };

    const getScore = () => {
        return questions.reduce((score, question, index) => {
            return score + (quizAnswers[index] === question.correct ? 1 : 0);
        }, 0);
    };

    if (!topic) return <div>Quiz not found.</div>;

    return (
        <div className="bg-[var(--color-foreground)] rounded-lg border border-[var(--color-border)] p-6 animate-fade-in">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-2xl font-bold">{topic.title} - Quiz</h3>
                    <div className="text-sm text-[var(--color-text-muted)] h-5 mt-1">
                        {isSaving && <span className="flex items-center animate-pulse"><Save className="w-4 h-4 mr-1"/>Saving...</span>}
                        {!isSaving && lastSaved && <span>Last saved: {lastSaved.toLocaleTimeString()}</span>}
                    </div>
                </div>
                <button onClick={onExit} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"><X className="w-6 h-6" /></button>
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
                                    if (isCorrect) classes += 'bg-[var(--color-success-bg-light)] border-[var(--color-success)] text-[var(--color-success-text)]';
                                    else if (isSelected && !isCorrect) classes += 'bg-[var(--color-warning-bg-light)] border-[var(--color-warning)] text-[var(--color-warning-text)]';
                                    else classes += 'border-[var(--color-border)]';
                                } else {
                                    if (isSelected) classes += 'bg-[var(--color-primary)]/20 border-[var(--color-primary)]';
                                    else classes += 'hover:bg-[var(--color-input-hover)] border-[var(--color-border)]';
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
            <div className="mt-8 pt-4 border-t border-[var(--color-border)] flex justify-between items-center">
                {showResults ? (
                    <>
                        <div className="text-xl font-bold">Score: {getScore()} / {questions.length}</div>
                        <button onClick={handleRetry} className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors">
                            <RotateCw className="w-4 h-4" />
                            <span>Retry Quiz</span>
                        </button>
                    </>
                ) : (
                    <button onClick={handleSubmit} disabled={Object.keys(quizAnswers).length !== questions.length} className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-success)] text-white rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ml-auto">
                        <span>Submit Answers</span>
                    </button>
                )}
            </div>
        </div>
    );
};

const Settings: React.FC<{onClose: () => void}> = ({onClose}) => {
    const { state, dispatch } = useAccessibility();

    return (
        <div className="fixed inset-0 bg-black/50 z-20 flex justify-center items-center animate-fade-in-fast" onClick={onClose}>
            <div className="bg-[var(--color-foreground)] rounded-lg p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Accessibility Settings</h2>
                    <button onClick={onClose}><X className="w-6 h-6"/></button>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[var(--color-input)] rounded-lg">
                        <label htmlFor="highContrast">High Contrast Mode</label>
                        <input type="checkbox" id="highContrast" checked={state.highContrast} onChange={e => dispatch({type: 'SET_HIGH_CONTRAST', payload: e.target.checked})} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[var(--color-input)] rounded-lg">
                        <label htmlFor="calmTheme">Calm Theme</label>
                        <input type="checkbox" id="calmTheme" checked={state.theme === 'calm'} onChange={e => dispatch({type: 'SET_THEME', payload: e.target.checked ? 'calm' : 'default'})} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[var(--color-input)] rounded-lg">
                        <label htmlFor="reduceMotion">Reduce Motion</label>
                        <input type="checkbox" id="reduceMotion" checked={state.reduceMotion} onChange={e => dispatch({type: 'SET_REDUCED_MOTION', payload: e.target.checked})} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[var(--color-input)] rounded-lg">
                        <label htmlFor="enhancedFocus">Enhanced Focus Ring</label>
                        <input type="checkbox" id="enhancedFocus" checked={state.enhancedFocus} onChange={e => dispatch({type: 'SET_ENHANCED_FOCUS', payload: e.target.checked})} />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[var(--color-input)] rounded-lg">
                        <label htmlFor="simplifiedUI">Simplified UI</label>
                        <input type="checkbox" id="simplifiedUI" checked={state.simplifiedUI} onChange={e => dispatch({type: 'SET_SIMPLIFIED_UI', payload: e.target.checked})} />
                    </div>
                    <div className="p-3 bg-[var(--color-input)] rounded-lg space-y-2">
                        <label>Font Size</label>
                        <div className="flex gap-2">
                           <button className={`px-3 py-1 rounded ${state.readingSettings.fontSize === 'medium' ? 'bg-[var(--color-primary)] text-white' : ''}`} onClick={() => dispatch({type: 'SET_READING_SETTINGS', payload: {fontSize: 'medium'}})}>Medium</button>
                           <button className={`px-3 py-1 rounded ${state.readingSettings.fontSize === 'large' ? 'bg-[var(--color-primary)] text-white' : ''}`} onClick={() => dispatch({type: 'SET_READING_SETTINGS', payload: {fontSize: 'large'}})}>Large</button>
                        </div>
                    </div>
                     <div className="p-3 bg-[var(--color-input)] rounded-lg space-y-2">
                        <label>Line Spacing</label>
                        <div className="flex gap-2">
                           <button className={`px-3 py-1 rounded ${state.readingSettings.lineHeight === 'normal' ? 'bg-[var(--color-primary)] text-white' : ''}`} onClick={() => dispatch({type: 'SET_READING_SETTINGS', payload: {lineHeight: 'normal'}})}>Normal</button>
                           <button className={`px-3 py-1 rounded ${state.readingSettings.lineHeight === 'relaxed' ? 'bg-[var(--color-primary)] text-white' : ''}`} onClick={() => dispatch({type: 'SET_READING_SETTINGS', payload: {lineHeight: 'relaxed'}})}>Relaxed</button>
                        </div>
                    </div>
                    <div className="p-3 bg-[var(--color-input)] rounded-lg space-y-2">
                        <label>Letter Spacing</label>
                        <div className="flex gap-2">
                           <button className={`px-3 py-1 rounded ${state.readingSettings.letterSpacing === 'normal' ? 'bg-[var(--color-primary)] text-white' : ''}`} onClick={() => dispatch({type: 'SET_READING_SETTINGS', payload: {letterSpacing: 'normal'}})}>Normal</button>
                           <button className={`px-3 py-1 rounded ${state.readingSettings.letterSpacing === 'wide' ? 'bg-[var(--color-primary)] text-white' : ''}`} onClick={() => dispatch({type: 'SET_READING_SETTINGS', payload: {letterSpacing: 'wide'}})}>Wide</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AiExplanationModal: React.FC<{ 
    title: string;
    content: string;
    isLoading: boolean;
    error: string | null;
    onClose: () => void;
}> = ({ title, content, isLoading, error, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/60 z-30 flex justify-center items-center animate-fade-in-fast" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-[var(--color-foreground)] rounded-lg p-6 w-full max-w-2xl shadow-2xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-xl font-bold text-[var(--color-primary)] flex items-center"><Sparkles className="w-5 h-5 mr-2"/> {title}</h2>
                    <button onClick={onClose} aria-label="Close AI explanation"><X className="w-6 h-6"/></button>
                </div>
                <div className="overflow-y-auto pr-2">
                    {isLoading && (
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
                            <span className="sr-only">Loading explanation...</span>
                        </div>
                    )}
                    {error && (
                        <div className="bg-[var(--color-warning-bg-light)] text-[var(--color-warning-text)] p-4 rounded-md" role="alert">
                            <h3 className="font-bold">Error</h3>
                            <p>{error}</p>
                        </div>
                    )}
                    {!isLoading && content && (
                        <div className="prose prose-blue dark:prose-invert max-w-none text-[var(--color-text)] space-y-4">
                            {content.split('\n\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                        </div>
                    )}
                </div>
                 <div className="border-t border-[var(--color-border)] pt-4 mt-4 text-xs text-center text-[var(--color-text-muted)] flex-shrink-0">
                    AI-generated content. May contain inaccuracies. Verify important information.
                </div>
            </div>
        </div>
    );
};

const StudyGuideViewer: React.FC<{ pages: PageContent[], onExit: () => void }> = ({ pages, onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pageContent = pages[currentPage];

    // Reset to first page when component is shown
    useEffect(() => {
        setCurrentPage(0);
    }, [pages]);

    return (
        <div className="bg-[var(--color-foreground)] rounded-lg border border-[var(--color-border)] p-6 animate-fade-in flex flex-col h-[80vh]">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h3 className="text-2xl font-bold">IRTS HAREC Study Guide</h3>
                <button onClick={onExit} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="bg-[var(--color-input)] rounded-md flex-grow overflow-y-auto">
                <div className="p-4">
                    <h4 className="font-bold text-lg mb-2 sticky top-0 bg-[var(--color-input)] py-2">Page {pageContent.page}</h4>
                    <pre className="text-sm whitespace-pre-wrap font-sans">{pageContent.text}</pre>
                </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 flex-shrink-0">
                <button 
                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span>Page {currentPage + 1} of {pages.length}</span>
                <button 
                    onClick={() => setCurrentPage(p => Math.min(pages.length - 1, p + 1))}
                    disabled={currentPage === pages.length - 1}
                    className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};


// --- MAIN COMPONENT ---
const AppContent: React.FC = () => {
    const { state } = useAccessibility();
    const [activeSection, setActiveSection] = useState<string>('overview');
    const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
    const [currentQuiz, setCurrentQuiz] = useState<string | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    
    // C42 SDK State
    const [c42SDK, setC42SDK] = useState<C42_SDK | null>(null);
    const [aiExplanation, setAiExplanation] = useState<{title: string, content: string} | null>(null);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    useEffect(() => {
        // A short delay helps prevent race conditions on slower systems.
        setTimeout(() => {
            const sdk = window.C42_SDK;
            if (sdk) {
                console.log('C42 SDK Detected. Version:', sdk.version);
                setC42SDK(sdk);
                
                // Sync with host theme. Called immediately with current theme.
                sdk.subscribe('theme_change', (newTheme) => {
                    console.log('Host theme changed to:', newTheme);
                    document.documentElement.classList.toggle('dark', newTheme === 'dark');
                });
                
                // Placeholder for language sync
                sdk.subscribe('language_change', (newLang) => {
                    console.log('Host language changed to:', newLang);
                    // Future i18n logic can be implemented here.
                });

            } else {
                console.warn('C42 SDK not found. Running in standalone mode.');
            }
        }, 50);
    }, []);

    const handleAiExplain = async (title: string, promptContent: string) => {
        if (!c42SDK) return;

        setAiError(null);
        setIsAiLoading(true);
        setAiExplanation({ title: `AI Explains: ${title}`, content: '' }); // Open modal immediately

        try {
            const fullPrompt = `Please explain the following content from an Irish Amateur Radio (HAREC) study guide in a simple, clear, and encouraging way for a beginner. Use analogies if helpful and keep it concise.\n\nContent to explain:\n---\n${promptContent}`;
            const response = await c42SDK.request('generate_response', { topic: fullPrompt });
            setAiExplanation(prev => ({ ...prev!, content: response.text }));
        } catch (error: any) {
            console.error('Kernel failed to generate response:', error);
            setAiError(error.message || 'An unknown error occurred while contacting the AI.');
             setAiExplanation(prev => ({ ...prev!, content: '' }));
        } finally {
            setIsAiLoading(false);
        }
    };
    
    const closeAiModal = () => {
        setAiExplanation(null);
        setAiError(null);
    };

    const handleTopicComplete = (moduleKey: string, topicKey: string) => {
        const newCompleted = new Set(completedTopics);
        newCompleted.add(`${moduleKey}-${topicKey}`);
        setCompletedTopics(newCompleted);
        
        const moduleKeys = Object.keys(learningModules);
        const currentModuleIndex = moduleKeys.indexOf(moduleKey);
        const topicKeys = Object.keys(learningModules[moduleKey].topics);
        const currentTopicIndex = topicKeys.indexOf(topicKey);
        
        if (currentTopicIndex < topicKeys.length - 1) {
            setActiveSection(`${moduleKey}-${topicKeys[currentTopicIndex + 1]}`);
        } else if (currentModuleIndex < moduleKeys.length - 1) {
            const nextModuleKey = moduleKeys[currentModuleIndex + 1];
            setActiveSection(nextModuleKey);
        } else {
            setActiveSection('overview');
        }
    };
    
    const totalTopics = Object.values(learningModules).reduce((sum, module) => sum + Object.keys(module.topics).length, 0);

    const renderMainContent = () => {
        if (currentQuiz) {
            return <QuizView quizKey={currentQuiz} onExit={() => setCurrentQuiz(null)} />;
        }
        
        if (activeSection.includes('-')) {
            const [moduleKey, ...topicKeyParts] = activeSection.split('-');
            const topicKey = topicKeyParts.join('-');
            const topic = learningModules[moduleKey]?.topics?.[topicKey];

            if (topic?.studyGuideContent) {
                return <StudyGuideViewer pages={topic.studyGuideContent} onExit={() => setActiveSection(moduleKey)} />;
            }

            if (topic) return <TopicContent moduleKey={moduleKey} topicKey={topicKey} topic={topic} onComplete={() => handleTopicComplete(moduleKey, topicKey)} onStartQuiz={setCurrentQuiz} onExplain={handleAiExplain} isSdkAvailable={!!c42SDK} />;
        }

        const module = learningModules[activeSection];
        if (module) {
            return <ModuleOverview moduleKey={activeSection} module={module} onTopicSelect={setActiveSection} />;
        }
        
        return (
            <div className="bg-[var(--color-foreground)] rounded-lg border border-[var(--color-border)] p-8 text-center animate-fade-in">
                <BookOpen className="w-16 h-16 mx-auto text-[var(--color-primary)] mb-4" />
                <h2 className="text-3xl font-bold text-[var(--color-text)] mb-2">Welcome to Your HAREC Study Hub</h2>
                <p className="text-[var(--color-text-muted)] text-lg">Select a module from the left to begin your learning journey.</p>
            </div>
        );
    };

    return (
        <div 
          className="min-h-screen bg-[var(--color-background)] font-sans text-[var(--color-text)]"
          data-contrast={state.highContrast ? 'high' : 'default'}
          data-sensory={state.theme}
          data-motion={state.reduceMotion ? 'reduced' : 'default'}
          data-simplified={state.simplifiedUI}
          data-enhanced-focus={state.enhancedFocus}
        >
            {showSettings && <Settings onClose={() => setShowSettings(false)} />}
            {aiExplanation && <AiExplanationModal title={aiExplanation.title} content={aiExplanation.content} isLoading={isAiLoading} error={aiError} onClose={closeAiModal} />}

            <header className="bg-[var(--color-foreground)] border-b border-[var(--color-border)] sticky top-0 z-10">
                <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Radio className="w-8 h-8 text-[var(--color-primary)]"/>
                        <h1 className="text-xl font-bold text-[var(--color-text)]">Irish Amateur Radio HAREC Learning System</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <MotivatingProgress current={completedTopics.size} total={totalTopics} />
                        <button onClick={() => setShowSettings(true)} className="p-2 rounded-full hover:bg-[var(--color-input)]">
                            <Cog className="w-6 h-6 text-[var(--color-text-muted)]" />
                            <span className="sr-only">Open Settings</span>
                        </button>
                    </div>
                </div>
            </header>
            <main className="max-w-screen-xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <div className="bg-[var(--color-foreground)] rounded-lg border border-[var(--color-border)] p-4 sticky top-24">
                            <h2 className="font-bold text-[var(--color-text)] text-lg mb-4 px-2">Learning Modules</h2>
                            <nav className="space-y-1">
                                {Object.entries(learningModules).map(([moduleKey, module]) => {
                                    const ModuleIcon = module.icon;
                                    const isModuleActive = activeSection === moduleKey;
                                    const isTopicActive = activeSection.startsWith(`${moduleKey}-`);
                                    const isExpanded = isModuleActive || isTopicActive;

                                    return (
                                        <div key={moduleKey}>
                                            <button onClick={() => setActiveSection(moduleKey)} className={`w-full flex items-center justify-between p-3 rounded-lg text-[var(--color-text)] transition-colors ${isModuleActive ? 'bg-[var(--color-primary)]/20' : 'hover:bg-[var(--color-input-hover)]'}`}>
                                                <div className="flex items-center space-x-3">
                                                  {!state.simplifiedUI && <ModuleIcon className="w-5 h-5 text-[var(--color-primary)] decorative-icon"/>}
                                                  <span className="font-semibold">{module.title}</span>
                                                </div>
                                                <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`} />
                                            </button>
                                            {isExpanded && <div className="pl-6 pt-2 pb-2 border-l-2 border-[var(--color-border)] ml-5 my-1 space-y-1 animate-fade-in-fast">
                                                {Object.entries(module.topics).map(([topicKey, topic]) => (
                                                    <button key={topicKey} onClick={() => setActiveSection(`${moduleKey}-${topicKey}`)} className={`w-full text-left flex items-center space-x-3 p-2 text-sm rounded-md transition-colors ${activeSection === `${moduleKey}-${topicKey}` ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-medium' : 'text-[var(--color-text-muted)] hover:bg-[var(--color-input-hover)]'}`}>
                                                        {completedTopics.has(`${moduleKey}-${topicKey}`) ? <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" /> : <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600"/>}<span>{topic.title}</span></button>
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

const App: React.FC = () => (
    <AccessibilityProvider>
        <AppContent />
    </AccessibilityProvider>
);

export default App;
