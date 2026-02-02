"use client";

import { useState, useEffect, useCallback } from "react";

interface Step {
  target: string;
  title: string;
  content: string;
  position: "top" | "bottom" | "left" | "right" | "center";
}

const steps: Step[] = [
  {
    target: "welcome",
    title: "Welcome to WHB Project Tracker! 👋",
    content: "This dashboard helps you manage all your companies and their requirements in one place. Let's take a quick tour!",
    position: "center",
  },
  {
    target: "sidebar",
    title: "Project Sidebar",
    content: "All your companies are listed here. Click any project to view its details. Use the search bar to find projects quickly, or filter by Active/Pipeline status.",
    position: "right",
  },
  {
    target: "add-project",
    title: "Add New Projects",
    content: "Click here to add a new company or project. You can set the name, category, priority, and choose an icon.",
    position: "right",
  },
  {
    target: "requirements",
    title: "Requirements & Tasks",
    content: "Each project has requirements you need to complete. Click the checkbox to mark items as done. Drag the ⋮⋮ handle to reorder them.",
    position: "left",
  },
  {
    target: "bulk-actions",
    title: "Bulk Actions",
    content: "Click 'Select' to enter bulk mode. You can then select multiple requirements and mark them all as done or delete them at once.",
    position: "left",
  },
  {
    target: "tabs",
    title: "Comments & Files",
    content: "Switch between tabs to view Requirements, Comments (for team discussions), and Files (upload documents, images, etc.).",
    position: "left",
  },
  {
    target: "theme-toggle",
    title: "Light/Dark Mode",
    content: "Click the sun/moon icon to switch between light and dark themes. Your preference is saved automatically.",
    position: "bottom",
  },
  {
    target: "export",
    title: "Export Reports",
    content: "Generate PDF or CSV reports of all projects, or export individual project details using the Export button.",
    position: "bottom",
  },
  {
    target: "done",
    title: "You're All Set! 🎉",
    content: "That's everything! Start by exploring your projects or adding new ones. You can restart this tour anytime by clicking the ❓ button.",
    position: "center",
  },
];

const targetMap: Record<string, string> = {
  sidebar: "[data-tour='sidebar']",
  "add-project": "[data-tour='add-project']",
  requirements: "[data-tour='requirements']",
  "bulk-actions": "[data-tour='bulk-actions']",
  tabs: "[data-tour='tabs']",
  "theme-toggle": "[data-tour='theme-toggle']",
  export: "[data-tour='export']",
};

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const removeHighlights = useCallback(() => {
    document.querySelectorAll(".onboarding-highlight").forEach((el) => {
      el.classList.remove("onboarding-highlight");
    });
  }, []);

  const handleNext = useCallback(() => {
    if (isLast) {
      removeHighlights();
      setIsVisible(false);
      localStorage.setItem("onboarding-completed", "true");
      onComplete();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  }, [isLast, onComplete, removeHighlights]);

  const handlePrev = useCallback(() => {
    if (!isFirst) {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    }
  }, [isFirst]);

  const handleClose = useCallback(() => {
    removeHighlights();
    setIsVisible(false);
    localStorage.setItem("onboarding-completed", "true");
    onComplete();
  }, [onComplete, removeHighlights]);

  const handleStepClick = useCallback((idx: number) => {
    setCurrentStep(idx);
  }, []);

  useEffect(() => {
    removeHighlights();

    // Add highlight to current target
    if (step.target !== "welcome" && step.target !== "done") {
      const selector = targetMap[step.target];
      if (selector) {
        const el = document.querySelector(selector);
        if (el) {
          el.classList.add("onboarding-highlight");
          try {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          } catch (e) {
            // Ignore scroll errors
          }
        }
      }
    }

    return () => removeHighlights();
  }, [currentStep, step.target, removeHighlights]);

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[100]"
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(2px)",
        }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Modal */}
      <div
        className={`fixed z-[200] ${
          step.position === "center"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : step.position === "right"
            ? "top-1/2 left-[320px] -translate-y-1/2"
            : step.position === "left"
            ? "top-1/2 right-[40px] -translate-y-1/2"
            : step.position === "bottom"
            ? "top-[100px] right-[20px]"
            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="rounded-xl p-6 max-w-md shadow-2xl border"
          style={{
            background: "var(--bg-secondary)",
            borderColor: "var(--gold)",
          }}
        >
          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mb-4">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleStepClick(idx)}
                className="w-2 h-2 rounded-full transition-all hover:scale-125"
                style={{
                  background: idx === currentStep ? "var(--gold)" : "var(--border-light)",
                  transform: idx === currentStep ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          {/* Step counter */}
          <div
            className="text-[10px] font-sans uppercase tracking-[2px] text-center mb-2"
            style={{ color: "var(--text-muted)" }}
          >
            Step {currentStep + 1} of {steps.length}
          </div>

          {/* Title */}
          <h2
            className="text-xl font-light text-center mb-3"
            style={{ color: "var(--gold)" }}
          >
            {step.title}
          </h2>

          {/* Content */}
          <p
            className="text-sm font-sans leading-relaxed text-center mb-6"
            style={{ color: "var(--text-secondary)" }}
          >
            {step.content}
          </p>

          {/* Buttons */}
          <div className="flex gap-3 justify-center">
            {!isFirst && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 text-sm font-sans font-medium rounded-lg border transition-all hover:bg-white/5"
                style={{
                  borderColor: "var(--border-light)",
                  color: "var(--text-muted)",
                }}
              >
                ← Back
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 text-sm font-sans font-medium rounded-lg border transition-all hover:bg-[var(--gold)]/25"
              style={{
                borderColor: "var(--gold)",
                background: "rgba(212, 175, 55, 0.15)",
                color: "var(--gold)",
              }}
            >
              {isLast ? "Get Started!" : "Next →"}
            </button>

            {!isLast && (
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-sans font-medium rounded-lg transition-all hover:bg-white/5"
                style={{ color: "var(--text-muted)" }}
              >
                Skip
              </button>
            )}
          </div>
        </div>

        {/* Arrow pointer for non-center positions */}
        {step.position !== "center" && (
          <div
            className={`absolute w-4 h-4 rotate-45 ${
              step.position === "right"
                ? "-left-2 top-1/2 -translate-y-1/2"
                : step.position === "left"
                ? "-right-2 top-1/2 -translate-y-1/2"
                : step.position === "bottom"
                ? "-top-2 right-[60px]"
                : ""
            }`}
            style={{
              background: "var(--bg-secondary)",
              borderLeft: step.position === "right" ? "1px solid var(--gold)" : "none",
              borderBottom: step.position === "right" ? "1px solid var(--gold)" : "none",
              borderRight: step.position === "left" ? "1px solid var(--gold)" : "none",
              borderTop: step.position === "left" || step.position === "bottom" ? "1px solid var(--gold)" : "none",
            }}
          />
        )}
      </div>

      {/* Highlight styles */}
      <style jsx global>{`
        .onboarding-highlight {
          position: relative;
          z-index: 102 !important;
          box-shadow: 0 0 0 4px var(--gold), 0 0 20px rgba(212, 175, 55, 0.5) !important;
          border-radius: 8px;
        }
      `}</style>
    </>
  );
}

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem("onboarding-completed");
    if (!completed) {
      setShowOnboarding(true);
    }
    setChecked(true);
  }, []);

  const restartOnboarding = useCallback(() => {
    localStorage.removeItem("onboarding-completed");
    setShowOnboarding(true);
  }, []);

  const completeOnboarding = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  return { showOnboarding, restartOnboarding, completeOnboarding, checked };
}
