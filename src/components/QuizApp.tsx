import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { QuizDefinition } from "@/data/quizzes";
import { allQuizzes } from "@/data/quizzes";
import type { AnswerLetter } from "@/lib/quizLogic";
import { resolveQuizWinner } from "@/lib/quizLogic";
import styles from "@/styles/quiz.module.css";

type Phase = "menu" | "quiz" | "result";

const ADVANCE_MS = 1050;
const MUSIC_FADE_MS = 5000;
const MUSIC_BASE_VOLUME = 0.28;
const VIDEO_SRC = "/ovnak-bckg.mp4";

export default function QuizApp() {
  const [phase, setPhase] = useState<Phase>("menu");
  const [quiz, setQuiz] = useState<QuizDefinition | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerLetter[]>([]);
  const [resultLetter, setResultLetter] = useState<AnswerLetter | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<AnswerLetter | null>(
    null,
  );
  const [questionLeaving, setQuestionLeaving] = useState(false);
  const advanceTimerRef = useRef<number | null>(null);
  const tapAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const glamAudioRef = useRef<HTMLAudioElement | null>(null);
  const musicFadeTimerRef = useRef<number | null>(null);
  const resultSfxPlayedRef = useRef(false);

  const playTap = useCallback(() => {
    const audio = tapAudioRef.current;
    if (!audio) {
      return;
    }
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Ignore blocked autoplay/audio errors.
    });
  }, []);

  const playResultSfx = useCallback(() => {
    const audio = glamAudioRef.current;
    if (!audio) {
      return;
    }
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Ignore blocked autoplay/audio errors.
    });
  }, []);

  const clearMusicFadeTimer = useCallback(() => {
    if (musicFadeTimerRef.current !== null) {
      window.clearInterval(musicFadeTimerRef.current);
      musicFadeTimerRef.current = null;
    }
  }, []);

  const stopMusicNow = useCallback(() => {
    const audio = musicAudioRef.current;
    if (!audio) {
      return;
    }
    clearMusicFadeTimer();
    audio.pause();
    audio.currentTime = 0;
    audio.volume = MUSIC_BASE_VOLUME;
  }, [clearMusicFadeTimer]);

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const total = quiz?.questions.length ?? 0;
  const currentQuestion = quiz?.questions[questionIndex];

  const resetToMenu = useCallback(() => {
    clearAdvanceTimer();
    setPhase("menu");
    setQuiz(null);
    setQuestionIndex(0);
    setAnswers([]);
    setResultLetter(null);
    setSelectedLetter(null);
    setQuestionLeaving(false);
  }, [clearAdvanceTimer]);

  const startQuiz = useCallback(
    (q: QuizDefinition) => {
      clearAdvanceTimer();
      setQuiz(q);
      setQuestionIndex(0);
      setAnswers([]);
      setResultLetter(null);
      setSelectedLetter(null);
      setQuestionLeaving(false);
      setPhase("quiz");
    },
    [clearAdvanceTimer],
  );

  const goToResult = useCallback((finalAnswers: AnswerLetter[]) => {
    const letter = resolveQuizWinner(finalAnswers);
    setResultLetter(letter);
    setPhase("result");
    setSelectedLetter(null);
    setQuestionLeaving(false);
  }, []);

  const pickAnswer = useCallback(
    (letter: AnswerLetter) => {
      if (!quiz || phase !== "quiz" || selectedLetter !== null) {
        return;
      }
      setSelectedLetter(letter);
      setQuestionLeaving(true);
      clearAdvanceTimer();
      advanceTimerRef.current = window.setTimeout(() => {
        advanceTimerRef.current = null;
        const next = [...answers, letter];
        setAnswers(next);
        setSelectedLetter(null);
        setQuestionLeaving(false);
        if (next.length >= quiz.questions.length) {
          goToResult(next);
        } else {
          setQuestionIndex((i) => i + 1);
        }
      }, ADVANCE_MS);
    },
    [answers, clearAdvanceTimer, goToResult, phase, quiz, selectedLetter],
  );

  const resultCopy = useMemo(() => {
    if (!quiz || !resultLetter) {
      return null;
    }
    return quiz.results[resultLetter];
  }, [quiz, resultLetter]);

  useEffect(() => {
    const audio = musicAudioRef.current;
    if (!audio) {
      return;
    }

    // Music plays only while in quiz phase.
    if (phase !== "quiz") {
      stopMusicNow();
      return;
    }

    // Questions are 0-based, so 6 === 7th question.
    if (questionIndex < 6) {
      clearMusicFadeTimer();
      audio.volume = MUSIC_BASE_VOLUME;
      if (audio.paused) {
        void audio.play().catch(() => {
          // Ignore blocked autoplay/audio errors.
        });
      }
      return;
    }

    // On 7th question: fade out for 3s, then stop playback.
    if (musicFadeTimerRef.current !== null) {
      return;
    }

    const stepMs = 100;
    const stepCount = MUSIC_FADE_MS / stepMs;
    const volumeStep = MUSIC_BASE_VOLUME / stepCount;

    musicFadeTimerRef.current = window.setInterval(() => {
      const current = Math.max(0, audio.volume - volumeStep);
      audio.volume = current;

      if (current <= 0.001) {
        clearMusicFadeTimer();
        audio.pause();
        audio.currentTime = 0;
        audio.volume = MUSIC_BASE_VOLUME;
      }
    }, stepMs);
  }, [clearMusicFadeTimer, phase, questionIndex, stopMusicNow]);

  useEffect(() => {
    return () => {
      clearMusicFadeTimer();
    };
  }, [clearMusicFadeTimer]);

  useEffect(() => {
    if (phase === "result" && !resultSfxPlayedRef.current) {
      playResultSfx();
      resultSfxPlayedRef.current = true;
      return;
    }

    if (phase !== "result") {
      resultSfxPlayedRef.current = false;
    }
  }, [phase, playResultSfx]);

  return (
    <div className={styles.shell}>
      <div className={styles.stage}>
        <audio ref={tapAudioRef} preload="auto" aria-hidden>
          <source src="/tap.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={musicAudioRef} preload="auto" loop aria-hidden>
          <source src="/quiz-music.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={glamAudioRef} preload="auto" aria-hidden>
          <source src="/glam.mp3" type="audio/mpeg" />
        </audio>
        <video
          className={styles.videoBg}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        <div className={styles.content}>
          {phase === "menu" && (
            <div className={`${styles.animFade} ${styles.menuHeader}`}>
              <h1 className={styles.menuTitle}>Kviz</h1>
            </div>
          )}

          {phase === "menu" && (
            <div className={`${styles.menuCards} ${styles.animEnter}`}>
              {allQuizzes.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  className={styles.quizCard}
                  onClick={() => {
                    playTap();
                    startQuiz(q);
                  }}
                >
                  <div className={styles.quizCardTitle}>{q.menuTitle}</div>
                  <div className={styles.quizCardSub}>{q.menuSubtitle}</div>
                </button>
              ))}
            </div>
          )}

          {phase === "quiz" && quiz && currentQuestion && (
            <>
              <div
                className={`${styles.questionBlock} ${styles.animEnter}`}
                key={currentQuestion.id}
              >
                <h2 className={styles.questionText}>{currentQuestion.text}</h2>
                <div className={styles.options}>
                  {currentQuestion.options.map((opt) => {
                    const isSel = selectedLetter === opt.letter;
                    const fadeOutOther =
                      questionLeaving && selectedLetter !== null && !isSel;
                    return (
                      <button
                        key={opt.letter}
                        type="button"
                        className={`${styles.answerBtn} ${styles.optionPop} ${
                          isSel ? styles.answerBtnSelected : ""
                        } ${
                          fadeOutOther ? styles.answerBtnFadeOut : ""
                        }`}
                        onClick={() => {
                          playTap();
                          pickAnswer(opt.letter);
                        }}
                        disabled={selectedLetter !== null}
                      >
                        <span className={styles.badge}>{opt.letter}</span>
                        <span className={styles.optionText}>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.topBar}>
                <div className={styles.progressWrap}>
                  {quiz.questions.map((_, i) => (
                    <div
                      key={quiz.questions[i].id}
                      className={`${styles.progressDot} ${
                        i < questionIndex ? styles.progressDotDone : ""
                      } ${i === questionIndex ? styles.progressDotActive : ""}`}
                    >
                      <div className={styles.progressDotFill} />
                    </div>
                  ))}
                </div>
                <span className={styles.stepLabel}>
                  {questionIndex + 1}/{total}
                </span>
              </div>
            </>
          )}

          {phase === "result" && quiz && resultCopy && resultLetter && (
            <div className={`${styles.resultBlock} ${styles.animEnter}`}>
              <p className={styles.brand}>Tvoj rezultat</p>
              <div className={styles.resultCopyBox}>
                <h2 className={styles.resultHeadline}>{resultCopy.headline}</h2>
                <div className={styles.resultLines}>
                  {resultCopy.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
              <div className={styles.resultActions}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => {
                    playTap();
                    startQuiz(quiz);
                  }}
                >
                  Ponovi kviz
                </button>
                <button
                  type="button"
                  className={styles.ghostBtn}
                  onClick={() => {
                    playTap();
                    resetToMenu();
                  }}
                >
                  Izaberi drugi kviz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
