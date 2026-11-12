"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { wirelessGuide } from "@/src/data/installation-guides/wireless";
import type { GuideMedia, InstallationStep, SmsCommandGroup } from "@/src/data/installation-guides/types";

const tabs = [
  { id: "wireless", label: "Wireless" },
  { id: "wired", label: "Wired" },
  { id: "tuya-touch-screen", label: "Tuya WiFi / Touch Screen" },
] as const;
type TabId = (typeof tabs)[number]["id"];

function MediaBlock({ media }: { media: GuideMedia[] }) {
  if (!media.length) return null;
  return <div className="guide-media-grid">{media.map((item, index) => {
    if (item.type === "image") return <figure key={`${item.src}-${index}`}><Image src={item.src} alt={item.alt} width={960} height={640} sizes="(max-width: 760px) 100vw, 720px" />{item.caption && <figcaption>{item.caption}</figcaption>}</figure>;
    if (item.type === "video") return <div className="guide-video" key={`${item.src}-${index}`}><iframe src={item.src} title={item.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>;
    return <a className="guide-download" href={item.href} key={`${item.href}-${index}`} download><span aria-hidden="true">↓</span>{item.label}{item.fileType && <small>{item.fileType}</small>}</a>;
  })}</div>;
}

function Checklist({ items }: { items: string[] }) {
  if (!items.length) return null;
  return <ul className="guide-checklist">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

type StepTaskState = Record<string, Record<string, boolean>>;

function stepTaskKeys(step: InstallationStep) {
  return [
    ...step.instructions.map((_, index) => `instruction-${index}`),
    ...(step.checklist ?? []).map((_, index) => `checklist-${index}`),
  ];
}

function InstallationSteps({ steps, guideId }: { steps: InstallationStep[]; guideId: string }) {
  const storageKey = `sequreplus-install-progress:${guideId}`;
  const [tasksByStep, setTasksByStep] = useState<StepTaskState>({});
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as StepTaskState;
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) setTasksByStep(parsed);
      }
    } catch {
      // Keep the guide usable when storage is unavailable or contains invalid data.
    } finally {
      setStorageReady(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!storageReady) return;
    try { window.localStorage.setItem(storageKey, JSON.stringify(tasksByStep)); }
    catch { /* Progress remains available for the current page view. */ }
  }, [storageKey, storageReady, tasksByStep]);

  const updateTask = (stepId: string, taskId: string, checked: boolean) => {
    setTasksByStep((current) => ({
      ...current,
      [stepId]: { ...current[stepId], [taskId]: checked },
    }));
  };

  const resetProgress = () => {
    setTasksByStep({});
    try { window.localStorage.removeItem(storageKey); }
    catch { /* The visible checkboxes still reset for this page view. */ }
  };

  const completedCount = steps.reduce((total, step) => total + stepTaskKeys(step).filter((taskId) => tasksByStep[step.id]?.[taskId]).length, 0);
  const taskCount = steps.reduce((total, step) => total + step.instructions.length + (step.checklist?.length ?? 0), 0);

  return <>
    <div className="guide-progress-toolbar">
      <p>{completedCount} of {taskCount} tasks completed across {steps.length} steps</p>
      <button type="button" onClick={resetProgress} disabled={completedCount === 0}>Reset Progress</button>
    </div>
    <div className="guide-steps-list" aria-label={`${steps.length} installation steps`} aria-busy={!storageReady}>
      {steps.map((step, index) => <InstallationStepCard key={step.id} step={step} index={index} checkedTasks={tasksByStep[step.id] ?? {}} onTaskChange={(taskId, checked) => updateTask(step.id, taskId, checked)} storageReady={storageReady} />)}
    </div>
  </>;
}

function StepTask({ id, text, checked, disabled, onChange }: { id: string; text: string; checked: boolean; disabled: boolean; onChange: (checked: boolean) => void }) {
  return <label className={`guide-step-task${checked ? " is-complete" : ""}`} htmlFor={id}>
    <input id={id} type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.currentTarget.checked)} />
    <span className="guide-step-task-text">{text}</span>
  </label>;
}

function InstallationStepCard({ step, index, checkedTasks, onTaskChange, storageReady }: { step: InstallationStep; index: number; checkedTasks: Record<string, boolean>; onTaskChange: (taskId: string, checked: boolean) => void; storageReady: boolean }) {
  const totalTasks = step.instructions.length + (step.checklist?.length ?? 0);
  const completedTasks = stepTaskKeys(step).filter((taskId) => checkedTasks[taskId]).length;
  const isComplete = totalTasks > 0 && completedTasks === totalTasks;
  const stepNumber = step.number ?? index + 1;

  return (
    <article className="guide-step-card">
      <div className="guide-step-number" aria-label={`Step ${stepNumber}`}>{String(stepNumber).padStart(2, "0")}</div>
      <div className="guide-step-content">
        <div className="guide-step-title-row"><h4>{step.title}</h4><span className="guide-step-progress" aria-live="polite">{completedTasks}/{totalTasks} completed</span></div>
        <progress className="guide-step-progress-bar" max={totalTasks || 1} value={completedTasks} aria-label={`Step ${stepNumber} progress`} />
        <fieldset className="guide-step-tasks" disabled={!storageReady}>
          <legend className="sr-only">Tasks for step {stepNumber}: {step.title}</legend>
          {step.instructions.map((instruction, itemIndex) => {
            const taskId = `instruction-${itemIndex}`;
            return <StepTask key={taskId} id={`${step.id}-${taskId}`} text={instruction} checked={Boolean(checkedTasks[taskId])} disabled={!storageReady} onChange={(checked) => onTaskChange(taskId, checked)} />;
          })}
          {(step.checklist ?? []).map((item, itemIndex) => {
            const taskId = `checklist-${itemIndex}`;
            return <StepTask key={taskId} id={`${step.id}-${taskId}`} text={item} checked={Boolean(checkedTasks[taskId])} disabled={!storageReady} onChange={(checked) => onTaskChange(taskId, checked)} />;
          })}
        </fieldset>
        {isComplete && <p className="guide-step-complete" role="status"><span aria-hidden="true">✓</span> Step Completed</p>}
        <MediaBlock media={step.media ?? []} />
      </div>
    </article>
  );
}

function SmsCommandGroup({ group }: { group: SmsCommandGroup }) {
  return <details className="sms-command-group"><summary>{group.title}<span aria-hidden="true">⌄</span></summary>{group.description && <p>{group.description}</p>}<div className="sms-command-list">{group.commands.map((item) => <SmsCommandRow key={item.label} label={item.label} command={item.command} description={item.description} />)}</div></details>;
}

function SmsCommandRow({ label, command, description }: { label: string; command: string; description?: string }) {
  const [status, setStatus] = useState("");
  const copyCommand = async () => {
    try { await navigator.clipboard.writeText(command); setStatus("Copied"); }
    catch { setStatus("Copy unavailable"); }
  };
  return <div className="sms-command-row"><div><b>{label}</b>{description && <p>{description}</p>}<code>{command}</code></div><button type="button" onClick={copyCommand} aria-label={`Copy command for ${label}`}>Copy</button><span className="sr-only" aria-live="polite">{status}</span></div>;
}

function ComingSoon({ title }: { title: string }) {
  return <div className="guide-coming-soon"><span className="guide-coming-icon" aria-hidden="true">＋</span><p className="guide-coming-kicker">SequrePlus Installation Guide</p><h3>{title}</h3><p>This guide is being prepared. Verified installation instructions will be added here soon.</p></div>;
}

function WirelessContent() {
  const guide = wirelessGuide;
  const hasSourceContent = guide.steps.length > 0 || guide.gettingStarted.requirements.length > 0 || guide.deviceManagement.length > 0;
  if (!hasSourceContent) return <div className="guide-content-pending"><p className="guide-pending-label">Ace-5 Wireless Guide</p><h3>Installation instructions needed</h3><p>The Ace-5 installation instructions are not in the project yet. Add the verified guide to <code>src/data/installation-guides/wireless.ts</code> to show the six installation steps, exact SMS commands, sensor placement, maintenance and troubleshooting here.</p></div>;

  return <div className="wireless-guide-content">
    <section className="guide-section guide-getting-started"><div className="guide-section-heading"><span>01</span><div><p>Before you begin</p><h3>Getting Started</h3></div></div><div className="guide-start-grid"><GuideList title="Requirements" items={guide.gettingStarted.requirements} /><GuideList title="Preparation" items={guide.gettingStarted.preparation} /></div></section>
    <section className="guide-section"><div className="guide-section-heading"><span>02</span><div><p>Follow the sequence</p><h3>Installation Guide</h3></div></div><InstallationSteps steps={guide.steps} guideId="ace-5-wireless" /></section>
    <section className="guide-section"><div className="guide-section-heading"><span>03</span><div><p>Configure the system</p><h3>Device Management</h3></div></div>{guide.deviceManagement.map((group) => <SmsCommandGroup key={group.id} group={group} />)}</section>
    <section className="guide-section"><div className="guide-section-heading"><span>04</span><div><p>Plan sensor coverage</p><h3>Sensor Placement</h3></div></div><InfoCards items={guide.sensorPlacement} /></section>
    <section className="guide-section"><div className="guide-section-heading"><span>05</span><div><p>Keep your system ready</p><h3>Maintenance &amp; Care</h3></div></div><InfoCards items={guide.maintenance} /></section>
    <section className="guide-section"><div className="guide-section-heading"><span>06</span><div><p>Find an answer</p><h3>Troubleshooting &amp; FAQs</h3></div></div>{guide.faqs.map((faq) => <details className="guide-faq" key={faq.question}><summary>{faq.question}<span aria-hidden="true">＋</span></summary><p>{faq.answer}</p></details>)}</section>
    <MediaBlock media={guide.media} />
  </div>;
}

function GuideList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return <div className="guide-list-card"><h4>{title}</h4><Checklist items={items} /></div>;
}

function InfoCards({ items }: { items: { title: string; points: string[] }[] }) {
  return <div className="guide-info-grid">{items.map((item) => <article className="guide-info-card" key={item.title}><h4>{item.title}</h4><Checklist items={item.points} /></article>)}</div>;
}

export default function InstallationGuide() {
  const [activeTab, setActiveTab] = useState<TabId>("wireless");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectTab = (tabId: TabId, focus = false) => {
    setActiveTab(tabId);
    if (focus) tabRefs.current[tabs.findIndex((tab) => tab.id === tabId)]?.focus();
  };
  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((tab) => tab.id === activeTab);
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    selectTab(tabs[nextIndex].id, true);
  };

  return <section className="installation-guide-page" aria-labelledby="installation-guide-title">
    <header className="installation-guide-intro"><div className="eyebrow"><span className="eyebrow-line" /> Setup with confidence</div><h1 id="installation-guide-title">Installation &amp; Setup Guide</h1><p>Follow our step-by-step guides to install and configure your SequrePlus security system.</p></header>
    <div className="installation-guide-wrap">
      <div className="guide-tabs" role="tablist" aria-label="Installation guide product types" onKeyDown={onTabKeyDown}>
        {tabs.map((tab, index) => <button ref={(element) => { tabRefs.current[index] = element; }} className={`guide-tab${activeTab === tab.id ? " is-active" : ""}`} type="button" role="tab" id={`tab-${tab.id}`} aria-selected={activeTab === tab.id} aria-controls={`panel-${tab.id}`} tabIndex={activeTab === tab.id ? 0 : -1} key={tab.id} onClick={() => selectTab(tab.id)}>{tab.label}</button>)}
      </div>
      {tabs.map((tab) => <div className="guide-tab-panel" role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`} tabIndex={0} hidden={activeTab !== tab.id} key={tab.id}>
        {tab.id === "wireless" ? <WirelessContent /> : <ComingSoon title={tab.label} />}
      </div>)}
    </div>
  </section>;
}
